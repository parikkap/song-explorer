import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

const ListContainer = ({ query }) => {
  const [songs, setSongs] = useState([]);
  const [favoriteId, setFavoriteId] = useState(null);
  const [favorites, setFavorites] = useState([]);
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

  useEffect(() => {
    const postFavorite = async () => {
      if (favoriteId) {
        await axios
          .post("/favorites", { songId: favoriteId })
          .then((response) => fetchFavorites())
          .catch((error) => setErrors(error));
      }
    };
    postFavorite();

    const fetchFavorites = async () => {
      const results = await fetch("/favorites", {
        headers: { accept: "application/json" },
      });
      const data = await results.json();
      setFavorites(data);
    };
  }, [favoriteId]);

  return (
    <div>
      <List songs={songs} favorites={favorites} onFavoriteClick={(id) => setFavoriteId(id)} />
    </div>
  );
};

export default ListContainer;
