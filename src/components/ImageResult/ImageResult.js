import React from "react";
import styles from "./ImageResult.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDate } from "../../helper";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";

const ImageResult = ({ results, isLoading, loadmoreHandler }) => {
  // console.log(results);
  return (
    <>
      <div className={styles.wrapper}>
        {results.map((result, index) => {
          return (
            <div className={styles.content} key={index}>
              <a href={result.source_url}>
                {isLoading ? (
                  <Skeleton height={200} />
                ) : (
                  <img src={result.thumbnail_url} alt={result.title} />
                )}
                <p style={{ fontSize: "0.875rem" }}>{result.title}</p>
                {/* <p style={{ fontSize: "0.675rem" }}>
                  {formatDate(result.datePublished)}
                </p> */}
              </a>
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

export default ImageResult;
