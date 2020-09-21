import React from "react";
import "./List.scss";

const List = ({ songs }) => {
  console.log(songs);
  let items;
  if (songs) {
    items = songs.map((song) => {
      return <li key={song.id}>{song.title}</li>;
    });
  }
  return <ul className="list">{items}</ul>;
};

export default List;
