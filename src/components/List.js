import React, { useState, useEffect } from "react";
import axios from "axios";
import LevelIndicator from "./LevelIndicator";
import { ReactComponent as FavoriteLogoFilled } from "../assets/icons/favorite.svg";
import { ReactComponent as FavoriteLogoBorder } from "../assets/icons/favorite_border.svg";

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

  const checkIfFavorite = (id) => {
    const fav = favorites.find((fav) => fav.songId === id);
    return {
      favoriteId: fav && fav.id ? fav.id : null,
      favorite: !!fav ? true : false,
      songId: id,
    };
  };
  const addFavoritesToSongs = songs.map((song) => {
    return { ...song, ...checkIfFavorite(song.id) };
  });

  return (
    <ul className="list">
      {addFavoritesToSongs.map((item) => {
        return (
          <li className="list-item" key={item.id}>
            <div className="list-item__left-wrapper">
              <div className="list-item__image-wrapper">
                <img
                  className="list-item__image"
                  src={item.images}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className="list-item__text-wrapper">
                <h2 className="list-item__title">{item.title}</h2>
                <span className="list-item__artist">{item.artist}</span>
              </div>
            </div>
            <div className="list-item__right-wrapper">
              <LevelIndicator id={item.level} />
              <button
                className="favorite__button"
                onClick={(e) =>
                  setFavorite({
                    id: item.favoriteId,
                    songId: item.songId,
                    favorite: item.favorite,
                  })
                }
              >
                {item.favorite ? (
                  <FavoriteLogoFilled className="favorite--active" />
                ) : (
                  <FavoriteLogoBorder className="favorite--notactive" />
                )}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
