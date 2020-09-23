import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as FavoriteLogo } from "../assets/icons/favorite.svg";
import "./List.scss";

const List = ({ songs }) => {
  const [favorites, setFavorites] = useState([]);
  const [favorite, setFavorite] = useState({
    id: "",
    songId: "",
    favorite: false,
  });
  const [errors, setErrors] = useState();

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

  const checkForFav = (id) => {
    const fav = favorites.find((fav) => fav.songId === id);
    return {
      favoriteId: fav && fav.id ? fav.id : null,
      favorite: !!fav ? true : false,
      songId: id,
    };
  };
  const addFavoritesToSongs = songs.map((song) => {
    return { ...song, ...checkForFav(song.id) };
  });

  return (
    <ul className="list">
      {addFavoritesToSongs.map((item) => {
        return (
          <li key={item.id}>
            {item.title}
            <button
              onClick={(e) =>
                setFavorite({
                  id: item.favoriteId,
                  songId: item.songId,
                  favorite: item.favorite,
                })
              }
            >
              <FavoriteLogo
                className={
                  item.favorite ? "favorite--active" : "favorite--notactive"
                }
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
