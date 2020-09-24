import React, { useState, useEffect, useRef } from "react";
import "./Songs.scss";
import Search from "../components/Search";
import List from "../components/List";
import Filter from "../components/Filter";
import Loader from "../components/Loader";

import heroMobile from "../assets/yousician-hero-mobile.png";
import heroMobile2x from "../assets/yousician-hero-mobile@2x.png";
import heroMobile3x from "../assets/yousician-hero-mobile@3x.png";
import heroDesktop from "../assets/yousician-hero.png";
import heroDesktop2x from "../assets/yousician-hero@2x.png";
import heroDesktop3x from "../assets/yousician-hero@3x.png";

function Songs() {
  const searchLikeKey = "search_like=";
  const heroImageUrl = useWindowWidth();
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null);
  const [filterArray, setFilterArray] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
    { id: 8, active: false },
    { id: 9, active: false },
    { id: 10, active: false },
    { id: 11, active: false },
    { id: 12, active: false },
    { id: 13, active: false },
    { id: 14, active: false },
    { id: 15, active: false },
  ]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //Fetch song  data
  const getSongs = async (query) => {
    const result = await fetch(`/songs?${query}`, {
      headers: { accept: "application/json" },
    });
    return await result.json();
  };

  const checkForFilters = (level) => {
    const filterToggle = !level.active;
    const newFilterArray = filterArray.map((item) => {
      if (item.id === level.id) {
        return { ...item, active: filterToggle };
      } else {
        return item;
      }
    });
    setFilterArray(newFilterArray);
  };

  useEffect(() => {
    let levelString = null;
    let currentQuery = true;
    const controller = new AbortController();

    const generateSearchString = () => {
      let tempLevelString = "";
      let level = "level=";

      const filteredArray = filterArray.filter((filter) => filter.active);
      filteredArray.forEach((item) => {
        tempLevelString = tempLevelString + level + item.id + "&";
      });
      return tempLevelString;
    };

    if (filterArray) {
      levelString = generateSearchString();
    }

    const loadSongs = async (levelString) => {
      setLoading(true);
      const query = levelString + searchQuery;
      console.log(query);
      if (!searchQuery && !levelString) {
        const songs = await getSongs(query, controller);
        setLoading(false);
        return setSongs(songs);
      }

      await sleep(350);

      if (currentQuery) {
        const songs = await getSongs(query, controller);
        setSongs(songs);
        setLoading(false);
        if (songs && songs.length > 0) {
          setNotFound(null);
        } else {
          setNotFound("Nothing was found");
        }
      }
    };
    loadSongs(levelString);

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [searchQuery, filterArray]);

  return (
    <div className="songs-page">
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
              onSearch={(searchTerm) =>
                setSearchQuery(searchLikeKey + searchTerm)
              }
            />
          </div>
        </div>
      </section>
      <section className="main">
        <Filter
          filterArray={filterArray}
          onLevelClick={(level) => checkForFilters(level)}
        />
        <div className="song-list__container">
          {loading ? (
            <Loader />
          ) : songs && songs.length > 0 ? (
            <List songs={songs} />
          ) : (
            <div>{notFound}</div>
          )}
        </div>
      </section>
    </div>
  );
}

// {songs && songs.length > 0 ? (
//   <List songs={songs}/>
// ) : (
//   <div>{notFound}</div>
// )}
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

export default Songs;
