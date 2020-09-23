import React, { useState, useEffect } from "react";
import List from "./List";

const ListContainer = ({ query }) => {
  const [songs, setSongs] = useState([]);

  const [errors, setErrors] = useState();
  // console.log(songs);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  //Fetch song  data
  const getSongs = async (query) => {
    const result = await fetch(`/songs?search_like=${query}`, {
      headers: { accept: "application/json" },
    });

    return await result.json();
  };

  useEffect(() => {
    let currentQuery = true;
    const controller = new AbortController();

    const loadSongs = async () => {
      if (!query) {
        const songs = await getSongs(query, controller);
        return setSongs(songs);
      }

      await sleep(350);

      if (currentQuery) {
        const songs = await getSongs(query, controller);
        setSongs(songs);
      }
    };
    loadSongs();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [query]);



  return (
    <div>
      <List
        songs={songs}
        // favorites={favorites}
        // onFavoriteClick={(id, favorite, songId) => setFavorite({ id, songId, favorite })}
      />
    </div>
  );
};

export default ListContainer;
