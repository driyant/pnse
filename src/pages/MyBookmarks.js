import React, { useEffect, useState } from "react";
import styles from "./MyBookmark.module.css";
import { formatDate } from "../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBookmarks = () => {
  const [myBookmarks, setMyBookmarks] = useState([]);
  const removeHandler = (news) => {
    const items = JSON.parse(localStorage.getItem("bookmarks"));
    const newData = items.filter((item) => item.name !== news.name);
    localStorage.setItem("bookmarks", JSON.stringify(newData));
    setMyBookmarks(newData);
    toast.success(`${news.name} has been removed!`);
  };

  useEffect(() => {
    const getBookmark = localStorage.getItem("bookmarks");
    if (!getBookmark) {
      localStorage.setItem("bookmarks", JSON.stringify([]));
    }
    setMyBookmarks(JSON.parse(getBookmark));
  }, []);

  const bookmarkIsEmpty = myBookmarks.length === 0;
  return (
    <>
      <ToastContainer />
      <section className={styles.header}>
        <div className={styles.wrapper}>
          <h1>My Reading List</h1>
        </div>
      </section>
      <main>
        {bookmarkIsEmpty && (
          <p style={{ fontFamily: "Open Sans" }}>
            You have not bookmarked any news yet.
          </p>
        )}
        {!bookmarkIsEmpty &&
          myBookmarks.map((myBookmark, index) => {
            return (
              <div className={styles.content_wrapper} key={index}>
                <p>{myBookmark.displayUrl}</p>
                <a href={myBookmark.url}>
                  <h3>{myBookmark.name}</h3>
                </a>
                <p>{myBookmark.snippet}</p>
                <p style={{ fontSize: "0.75rem" }}>
                  {formatDate(myBookmark.dateLastCrawled)}
                </p>
                <div
                  className={styles.bookmark_wrapper}
                  onClick={() => removeHandler(myBookmark)}
                >
                  <span className="material-symbols-outlined NormalResult_bookmark__pGo9r">
                    bookmark_remove
                  </span>
                  <p style={{ fontSize: "0.875rem", fontFamily: "Open Sans" }}>
                    Remove Bookmark
                  </p>
                </div>
              </div>
            );
          })}
      </main>
    </>
  );
};

export default MyBookmarks;
