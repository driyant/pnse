import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOptions] = useState("web");
  const [searchInput, setSearchInput] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}&cat=${selectedOption}`);
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify([]));
  }, []);

  return (
    <>
      <section className={styles.top_option_wrapper}>
        <div className={styles.option_content}>
          <label
            htmlFor="search_options"
            style={{ fontSize: "0.875rem", fontFamily: "Open Sans" }}
          >
            Search by:{" "}
          </label>
          <select
            name=""
            id="search_category"
            className={styles.search_category}
            onChange={(e) => setSelectedOptions(e.target.value)}
            defaultValue={selectedOption}
          >
            <option value="web">Web Search</option>
            <option value="image">Image Search</option>
            <option value="news">News Search</option>
          </select>
        </div>
      </section>
      <section className={styles.main_wrapper}>
        <div className={styles.search}>
          <h1 className={styles.search_title}>PN Search Engine</h1>
          {/* <FormSearch /> */}
          <div className={styles.form_search}>
            <span
              className="material-symbols-outlined"
              style={{ color: "#a5a5a5", marginRight: "0.575rem" }}
            >
              search
            </span>
            <form onSubmit={searchHandler}>
              <input
                id="search"
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
