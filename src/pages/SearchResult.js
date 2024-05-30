import React, { useEffect, useState } from "react";
import styles from "./SearchResult.module.css";
import NormalResult from "../components/NormalResult/NormalResult";
import ImageResult from "../components/ImageResult/ImageResult";
import NewsResult from "../components/NewsResult/NewsResult";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { generateBaseURL } from "../constants";

const SearchResult = () => {
  let baseUrl;
  let headers;
  let params = {};

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const cat = searchParams.get("cat");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(q);
  const [selectedOptions, setSelectedOptions] = useState(cat);
  const [results, setResults] = useState([]);
  // const [count] = useState(50);
  // const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // const loadmoreHandler = () => {
  //   console.log("click");
  //   setOffset(offset + 10);
  //   if (selectedOptions === "normal") {
  //     setOffset(offset + 10);
  //   }
  // };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (process.env.NODE_ENV === "development") {
        const resp = await axios.get(generateBaseURL(selectedOptions));
        setResults(resp.data.data);
      } else {
        const resp = await axios.post(generateBaseURL(selectedOptions), {
          query: q,
        });
        setResults(resp.data.data);
      }
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}&cat=${selectedOptions}`);
  };

  const bookmarkHandler = (news) => {
    const dataBookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    const findNews = dataBookmarks.find(
      (bookmark) => bookmark.name === news.name
    );

    if (findNews) {
      toast.error("You have already bookmarked this news!");
      return;
    }
    const newArr = [...dataBookmarks, news];
    localStorage.setItem("bookmarks", JSON.stringify(newArr));
    toast.success("News has been bookmarked!");
  };

  const clearBookmarkHandler = (e) => {
    e.preventDefault();
    toast.success("All bookmarks has been cleared!");
    localStorage.setItem("bookmarks", JSON.stringify([]));
  };

  useEffect(() => {
    fetchData();
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify([]));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, q, cat]);

  return (
    <>
      <ToastContainer />
      <section className={styles.top_search}>
        <div className={styles.select_options}>
          <div>
            <label
              htmlFor="search"
              style={{ fontSize: "0.775rem", fontFamily: "Open Sans" }}
            >
              Search by:{" "}
            </label>
            <select
              name="selected_options"
              id="category"
              className={styles.category}
              defaultValue={cat}
              onChange={(e) => setSelectedOptions(e.target.value)}
            >
              <option value="web">Web search</option>
              <option value="image">Image search</option>
              <option value="news">News search</option>
            </select>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <Link to="/">
              <h3>PN Search Engine</h3>
            </Link>
          </div>
          <div className={styles.form_wrapper}>
            <div className={styles.form_search}>
              <span
                className="material-symbols-outlined"
                style={{ color: "#a5a5a5", marginRight: "0.575rem" }}
              >
                search
              </span>
              <form onSubmit={searchHandler}>
                <input
                  type="text"
                  name="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className={styles.bookmark}>
            <Link to="/mybookmarks" className={styles.btn_bookmark}>
              My Bookmarks
            </Link>
            <button
              onClick={clearBookmarkHandler}
              className={styles.btn_clear_bookmark}
            >
              Clear All Bookmarks
            </button>
          </div>
        </div>
      </section>
      <main>
        {isLoading && (
          <p style={{ fontSize: "0.775rem", fontFamily: "Open Sans" }}>
            Getting the result...
          </p>
        )}
        {!isLoading && (
          <p style={{ fontSize: "0.775rem", fontFamily: "Open Sans" }}>
            Found : {results.length} items of{" "}
            <span style={{ textDecoration: "underline" }}>{q}</span> in{" "}
            <span style={{ textDecoration: "underline" }}>{cat}</span> result
          </p>
        )}
        {selectedOptions === "web" && (
          <NormalResult
            results={results}
            isLoading={isLoading}
            bookmarkHandler={bookmarkHandler}
          />
        )}
        {selectedOptions === "image" && (
          <ImageResult
            results={results}
            isLoading={isLoading}
            searchInput={searchInput}
          />
        )}
        {cat === "news" && (
          <NewsResult
            results={results}
            isLoading={isLoading}
            searchInput={searchInput}
          />
        )}
      </main>
    </>
  );
};

export default SearchResult;
