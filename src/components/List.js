import React from "react";
import "./List.scss";
import { ReactComponent as FavoriteLogo } from "../assets/icons/favorite.svg";

const List = ({ songs, favorites , onFavoriteClick }) => {
  let items;
 const checkForFav = (id) => {
     console.log(id)
    return favorites.some(fav => fav.songId === id);
}
  if (songs) {
    items = songs.map((item) => {
      return (
        <li key={item.id}>
          {item.title}
          <button onClick={(e) => onFavoriteClick(item.id)}>
            <FavoriteLogo className={ checkForFav(item.id) ? 'favorite' : null} />
          </button>
        </li>
      );
    });
  }
  return <ul className="list">{items} </ul>;
};

export default List;
