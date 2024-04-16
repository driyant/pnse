import styles from "./NormalResult.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { formatDate } from "../../helper";
import "react-toastify/dist/ReactToastify.css";
// import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";

const NormalResult = ({
  results,
  isLoading,
  bookmarkHandler,
  loadmoreHandler,
}) => {
  return (
    <>
      <div>
        {results.map((result, index) => {
          return (
            <div className={styles.wrapper} key={index}>
              {/* <ToastContainer /> */}
              {isLoading ? (
                <Skeleton />
              ) : (
                <p className={styles.url_links}>{result.url}</p>
              )}
              <h3>
                <a href={result.url}>
                  {isLoading ? <Skeleton /> : result.title}
                </a>
              </h3>
              <p className={styles.description}>
                {isLoading ? <Skeleton /> : result.snippet}
              </p>
              {/* <p style={{ fontSize: "0.675rem" }}>
                {formatDate(result.dateLastCrawled)}
              </p> */}
              <div
                className={styles.bookmarks}
                onClick={() => bookmarkHandler(result)}
                style={{ fontSize: "0.875rem" }}
              >
                <span
                  className={`material-symbols-outlined ${styles.bookmark}`}
                >
                  bookmark_add
                </span>
                <p style={{ fontSize: "0.75rem", fontFamily: "Open Sans" }}>
                  Add Bookmark
                </p>
              </div>
            </div>
          );
        })}
        {/* {results.length !== 0 && (
          <ButtonLoadMore loadmoreHandler={loadmoreHandler} />
        )} */}
      </div>
    </>
  );
};

export default NormalResult;
