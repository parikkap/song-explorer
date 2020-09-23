import React from "react";
import { ReactComponent as FavoriteLogo } from "../assets/icons/favorite.svg";
import "./List.scss";

const List = ({ songs, favorites, onFavoriteClick }) => {
  const checkForFav = (id) => {
    const fav = favorites.find((fav) => fav.songId === id);
    return {
      favoriteId: fav && fav.id ? fav.id : null,
      favorite: !!fav ? true : false,
      songId: id
    };
  };
  const addFavoritesToSongs = songs.map(song => {
    return {...song, ...checkForFav(song.id)}
  })

  return (
    <ul className="list">
      {addFavoritesToSongs.map((item) => {
        return (
          <li key={item.id}>
            {item.title}
            <button onClick={(e) => onFavoriteClick(item.favoriteId, item.favorite, item.songId)}>
              <FavoriteLogo
                className={
                  item.favorite
                    ? "favorite--active"
                    : "favorite--notactive"
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
