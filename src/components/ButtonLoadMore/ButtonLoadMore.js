import React from "react";
import styles from "./ButtonLoadMore.module.css";

const ButtonLoadMore = ({ loadmoreHandler }) => {
  return <button className={styles.btn_loadmore} onClick={loadmoreHandler}>Load more</button>;
};

export default ButtonLoadMore;
