import React from "react";
import "./Search.scss";
import {ReactComponent as SearchLogo} from "../assets/icons/search.svg";

const Search = ({ onSearch }) => {
  return (
    <div className="search">
      <div className="search__container">
        <input
          placeholder="Search for songs by artist or title"
          type="search"
          name="search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchLogo className="search__logo"/>
      </div>
    </div>
  );
};

export default Search;
