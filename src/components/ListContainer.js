import React, { useState, useEffect } from "react";
import List from "./List";

function ListContainer() {
  const [songList, setSongList] = useState();
  const [errors, setErrors] = useState();

  async function fetchData() {
    const res = await fetch("/songs");
    res
      .json()
      .then((res) => setSongList(res))
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <List songs={songList} />
    </div>
  );
}

export default ListContainer;
