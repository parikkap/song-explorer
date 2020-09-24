import React from "react";
import "./LevelIndicator.scss";

const LevelIndicator = ({ id, active }) => {
  let progress = Math.floor((id / 15) * 100);
  
  progress = progress + ', 100';
  console.log(progress)
  //   console.log(level)
//   let stroke = (2 * 3.14 * 80) / progress;
  return (
    <div>
      <div
        className={
          active
            ? "level-indicator level--active"
            : "level-indicator level-notactive"
        }
      >
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
            strokeDasharray={progress}
            d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="level-indicator__level">
          {id}
          <span className="level-indicator__label--vishidden">{id}</span>
        </span>
      </div>
      {/* <span className="time-indicator__label" aria-hidden="true">
        {level}
      </span> */}
    </div>
  );
};

export default LevelIndicator;
