import React, { useState, useEffect } from "react";
import "./Songs.scss";
import HeroContainer from "../components/HeroContainer";
import List from "../components/List";
import Filter from "../components/Filter";
import Loader from "../components/Loader";

function Songs() {
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

  //Fetch song data
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
          setNotFound("Sorry! Nothing was found.");
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
      <HeroContainer onSearchQuery={(searchQuery) => setSearchQuery(searchQuery)}/>
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
            <div className="not-found"><span>{notFound}</span></div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Songs;
