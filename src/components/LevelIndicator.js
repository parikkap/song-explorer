import React from "react";
import "./LevelIndicator.scss";

const LevelIndicator = ({ id, active }) => {
  let progress = Math.floor((id / 15) * 100);
  //   console.log(level)
  let stroke = (2 * 3.14 * 80) / progress;
  return (
    <div
      
    >
      <div  className={active ? "level-indicator level--active" : "level-indicator level-notactive"}>
        <svg
          viewBox="0 0 36 36"
          className="level-indicator__progress"
          aria-hidden="true"
        >
          <path
            className="level-indicator__progress-bg"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="level-indicator__progress-circle"
            strokeDasharray="1,15"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="level-indicator__dash"
            strokeDasharray="6 ,10"
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="level-indicator__day">
          {id}
          {/* <span className="level-indicator__label--vishidden">{level}</span> */}
        </span>
      </div>
      {/* <span className="time-indicator__label" aria-hidden="true">
        {level}
      </span> */}
    </div>
  );
};

export default LevelIndicator;
