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
          return (
            <div className={styles.wrapper} key={index}>
              <div className={styles.left_content}>
                <div className={styles.source}>
                  {/* <p>{result.title}</p> */}
                </div>
                <h4>
                  <a href={result.link}>
                    {/* {isLoading ? <Skeleton /> : result.name} */}
                    {result.title}
                  </a>
                </h4>
                {/* <p>{result?.description.substring(0, 100)}...</p> */}
                <p>
                  {isLoading ? (
                    <Skeleton />
                  ) : result?.published_datetime_utc ? (
                    formatDate(result.published_datetime_utc)
                  ) : (
                    ""
                  )}
                </p>
              </div>
              <div className={styles.right_content}>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <img src={result.source_favicon_url} alt={result.title} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* {results.length !== 0 && (
        <ButtonLoadMore loadmoreHandler={loadmoreHandler} />
      )} */}
    </>
  );
};

export default NewsResult;
