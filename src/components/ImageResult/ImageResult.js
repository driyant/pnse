import React from "react";
import styles from "./ImageResult.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatDate } from "../../helper";
import ButtonLoadMore from "../ButtonLoadMore/ButtonLoadMore";

const ImageResult = ({ results, isLoading, loadmoreHandler }) => {
  return (
    <>
      <div className={styles.wrapper}>
        {results.map((result, index) => {
          return (
            <div className={styles.content} key={index}>
              <a href={result.hostPageDisplayUrl}>
                {isLoading ? (
                  <Skeleton height={200} />
                ) : (
                  <img src={result.contentUrl} alt={result.name} />
                )}
                <p style={{ fontSize: "0.875rem" }}>{result.name}</p>
                <p style={{ fontSize: "0.675rem" }}>{formatDate(result.datePublished)}</p>
              </a>
            </div>
          );
        })}
      </div>
      {results.length !== 0 && <ButtonLoadMore loadmoreHandler={loadmoreHandler} />}
    </>
  );
};

export default ImageResult;
