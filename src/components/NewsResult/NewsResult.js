import styles from "./NewsResult.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDate } from "../../helper";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";

const NewsResult = ({ results, isLoading, loadmoreHandler }) => {
  return (
    <>
      <div className={styles.top_wrapper}>
        {results.map((result, index) => {
          const [data] = result.provider;
          return (
            <div className={styles.wrapper} key={index}>
              <div className={styles.left_content}>
                <div className={styles.source}>
                  <p>{data.name}</p>
                </div>
                <h4>
                  <a href={result.url}>
                    {isLoading ? <Skeleton /> : result.name}
                  </a>
                </h4>
                <p>{result.description.substring(0, 100)}...</p>
                <p>
                  {result.datePublished === undefined || isLoading ? (
                    <Skeleton />
                  ) : (
                    formatDate(result.datePublished)
                  )}
                </p>
              </div>
              <div className={styles.right_content}>
                {result.image === undefined ? (
                  <Skeleton />
                ) : (
                  <img
                    src={result.image.thumbnail.contentUrl}
                    alt={result.title}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {results.length !== 0 && <ButtonLoadMore loadmoreHandler={loadmoreHandler} />}
    </>
  );
};

export default NewsResult;
