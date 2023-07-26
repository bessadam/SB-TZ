import React from "react";
import styles from "./Search.module.scss";
// redux
import { searchPost } from "../../redux/slices/posts";
import { useDispatch } from "react-redux";
// mock db
import { searchIcon } from "../../utils/db";

const Search = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const dispatch = useDispatch();

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchPost(e.target.value));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={onSearchValueChange}
      />
      {searchIcon}
    </div>
  );
};

export default Search;
