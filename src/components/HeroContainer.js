import React, { useState, useEffect } from "react";
import "./HeroContainer.scss";
import Search from "../components/Search";

import heroMobile from "../assets/yousician-hero-mobile.png";
import heroMobile2x from "../assets/yousician-hero-mobile@2x.png";
import heroMobile3x from "../assets/yousician-hero-mobile@3x.png";
import heroDesktop from "../assets/yousician-hero.png";
import heroDesktop2x from "../assets/yousician-hero@2x.png";
import heroDesktop3x from "../assets/yousician-hero@3x.png";

const HeroContainer = ({ onSearchQuery }) => {
  const searchLikeKey = "search_like=";
  const heroImageUrl = useWindowWidth();
  return (
    <section className="hero">
      <div
        className="hero__image"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="hero__inner-container">
          <h1>New song delivered every week</h1>
          <p className="hero__intro">
            Here are the most resent additions to the Yousician App. Start
            playing today!
          </p>
          <Search
            onSearch={(searchQuery) =>
              onSearchQuery(searchLikeKey + searchQuery)
            }
          />
        </div>
      </div>
    </section>
  );
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  if (windowWidth <= 320) {
    return heroMobile;
  } else if (windowWidth <= 640) {
    return heroMobile2x;
  } else if (windowWidth <= 960) {
    return heroMobile3x;
  } else if (windowWidth <= 1440) {
    return heroDesktop;
  } else if (windowWidth <= 2800) {
    return heroDesktop2x;
  } else {
    return heroDesktop3x;
  }
};

export default HeroContainer;
