import React from "react";
import "./Search.scss";
import search from "../assets/icons/search.svg";
import filter from "../assets/icons/filter.svg";

const Search = ({ onSearch }) => {
  return (
    <div className="input-wrapper">
        <input
          placeholder="Search for songs by artist or title"
          type="text"
          name="search"
          onChange={(e) => onSearch(e.target.value)}
        />
    </div>
  );
};

export default Search;
