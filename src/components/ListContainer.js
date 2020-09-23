import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

const ListContainer = ({ query }) => {
  const [songs, setSongs] = useState([]);
  const [favorite, setFavorite] = useState({
    id: "",
    songId: '',
    favorite: false,
  });
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
        return setSongs(songs, favorites);
      }

      await sleep(350);

      if (currentQuery) {
        const songs = await getSongs(query, controller);
        setSongs(songs, favorites);
      }
    };
    loadSongs();

    return () => {
      currentQuery = false;
      controller.abort();
    };
  }, [favorites, query]);

  useEffect(() => {
    const removeFavorite = async () => {
      await axios
        .delete(`/favorites/${favorite.id}`)
        .then((response) => fetchFavorites())
        .catch((error) => setErrors(error));
    };
    const addFavorite = async () => {
      await axios
        .post(`/favorites`, { songId: favorite.songId })
        .then((response) => fetchFavorites())
        .catch((error) => setErrors(error));
    };
    console.log(favorite)
    if (favorite.songId && !favorite.favorite) {
      addFavorite();
    } else if (favorite.id && favorite.favorite) {
      removeFavorite();
    }

    const fetchFavorites = async () => {
      const results = await fetch("/favorites", {
        headers: { accept: "application/json" },
      });
      const data = await results.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, [favorite]);

  return (
    <div>
      <List
        songs={songs}
        favorites={favorites}
        onFavoriteClick={(id, favorite, songId) => setFavorite({ id, songId, favorite })}
      />
    </div>
  );
};

export default ListContainer;
