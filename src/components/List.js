import React from "react";
import "./List.scss";
import { ReactComponent as FavoriteLogo } from "../assets/icons/favorite.svg";

const List = ({ songs, onFavoriteClick }) => {
  let items;
  if (songs) {
    items = songs.map((item) => {
      return (
        <li key={item.id}>
          {item.title}
          <button onClick={(e) => onFavoriteClick(item.id)}>
            <FavoriteLogo />
          </button>
        </li>
      );
    });
  }
  return <ul className="list">{items} </ul>;
};

export default List;
