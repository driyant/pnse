import React, { useEffect, useState } from "react";
import styles from "./SearchResult.module.css";
import NormalResult from "../components/NormalResult/NormalResult";
import ImageResult from "../components/ImageResult/ImageResult";
import NewsResult from "../components/NewsResult/NewsResult";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [count] = useState(50);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loadmoreHandler = () => {
    console.log("click");
    setOffset(offset + 10);
    if (selectedOptions === "normal") {
      setOffset(offset + 10);
    }
  };
  const fetchData = async () => {
    if (selectedOptions === "normal") {
      baseUrl = `https://bing-web-search1.p.rapidapi.com/search?q=${searchInput}&offset=${offset}&count=${count}`;
      params.q = `${searchInput}`;
      params.offset = `${offset}`;
      params.count = `${count}`;
      params.mkt = "en-us";
      params.safeSearch = "Off";
      params.textFormat = "Raw";
      params.freshness = "Day";
      headers = {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "46e4b65e04msheb644f0a571b5dbp1575ddjsndaeefb3c27ce",
        "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
      };
    }
    if (selectedOptions === "image") {
      baseUrl = `https://bing-image-search1.p.rapidapi.com/images/search?q=${searchInput}}&offset=${offset}&count=${count}`;
      params = {
        q: `${searchInput}`,
      };
      headers = {
        "X-RapidAPI-Key": "46e4b65e04msheb644f0a571b5dbp1575ddjsndaeefb3c27ce",
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      };
    }
    if (selectedOptions === "news") {
      baseUrl = `https://bing-news-search1.p.rapidapi.com/news/search?q=${searchInput}}&offset=${offset}&count=${count}`;
      params = {
        q: `${searchInput}`,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      };
      headers = {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "46e4b65e04msheb644f0a571b5dbp1575ddjsndaeefb3c27ce",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      };
    }
    setIsLoading(true);
    try {
      const req = await fetch(baseUrl, {
        method: "GET",
        params: params,
        headers: headers,
      });
      const resp = await req.json();
      if (selectedOptions === "normal") {
        setResults(resp.webPages.value);
      }
      if (selectedOptions === "image") {
        setResults(resp.value);
      }
      if (selectedOptions === "news") {
        setResults(resp.value);
      }
    } catch (error) {
      toast.error("Something error when fetching data");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();
    fetchData();
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
    navigate(`/search?q=${searchInput}&cat=${selectedOptions}`);
    if (!localStorage.getItem("bookmarks")) {
      localStorage.setItem("bookmarks", JSON.stringify([]));
    }
  }, [selectedOptions, offset]);
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
              <option value="normal">Normal search</option>
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
            <span style={{ textDecoration: "underline" }}>{q}</span> in <span style={{ textDecoration: "underline" }}>{cat}</span> result
          </p>
        )}
        {selectedOptions === "normal" && (
          <NormalResult
            results={results}
            isLoading={isLoading}
            bookmarkHandler={bookmarkHandler}
            loadmoreHandler={loadmoreHandler}
          />
        )}
        {selectedOptions === "image" && (
          <ImageResult
            results={results}
            isLoading={isLoading}
            searchInput={searchInput}
            loadmoreHandler={loadmoreHandler}
          />
        )}
        {cat === "news" && isLoading === false && (
          <NewsResult
            results={results}
            isLoading={isLoading}
            loadmoreHandler={loadmoreHandler}
          />
        )}
      </main>
    </>
  );
};

export default SearchResult;
