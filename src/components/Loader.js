import React from "react";
import "./Loader.scss"

const Loader = () => {
  return (
    <div className="loader">
      <svg className="loader__svg" viewBox="25 25 50 50">
        <circle
          className="loader__svg-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
