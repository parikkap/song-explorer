import React from "react";
import search from "../assets/icons/search.svg";
import filter from "../assets/icons/filter.svg";


const Search = (props) => {
  return (
    <div>
        <span>{props.search}</span>
      {/* <img src={favBorder} alt="g"/> */}
      <input type="text" name="search"/>
    </div>
  );
}

export default Search;
