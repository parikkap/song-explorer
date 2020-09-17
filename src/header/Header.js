import React, { useState, useEffect } from "react";
import './Header.scss';
import Search from './Search.js';
import heroMobile from "../assets/yousician-hero-mobile.png";
import heroMobile2x from "../assets/yousician-hero-mobile@2x.png";
import heroMobile3x from "../assets/yousician-hero-mobile@3x.png";
import heroDesktop from "../assets/yousician-hero.png";
import heroDesktop2x from "../assets/yousician-hero@2x.png";
import heroDesktop3x from "../assets/yousician-hero@3x.png";

function Header() {
  const heroImageUrl = useWindowWidth();
  const [searchValue, setSearchTerm] = useState('');


  return (
    <header>
      <div className="hero-image" style={{ backgroundImage: `url(${heroImageUrl})` }}>
      </div>
        <Search search={searchValue}/>
    </header>
  );
}

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

export default Header;
