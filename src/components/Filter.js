import React, { useState, useEffect } from "react";
import "./Filter.scss";
import LevelIndicator from "./LevelIndicator";
import { ReactComponent as FilterLogo } from "../assets/icons/filter.svg";

const Filter = ({ filterArray, onLevelClick }) => {
  const [filterToggle, setFilterToggle] = useState(true);
  const handleClick = () => {
    const toggle = !filterToggle;
    setFilterToggle(toggle);
  };
  return (
    <div>
      <button className="filter__button" onClick={(e) => handleClick()}>
        <FilterLogo className="filter" />
      </button>
      <div className={filterToggle ? "filter--open" : "filter--closed"}>
        {filterArray.map((item) => {
            
          return (
              
            <button
              key={item.id}
              className="filter__level-button"
              onClick={(e) => onLevelClick(item)}
            >
      
              <LevelIndicator id={item.id} active={item.active} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
