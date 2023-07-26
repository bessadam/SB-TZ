import React from "react";
import styles from "./DropDown.module.scss";
// bootstrap
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
// redux
import { sortPosts } from "../../redux/slices/posts";
import { useDispatch } from "react-redux";

const DropDown = ({ id, name, query }) => {
  const dispatch = useDispatch();

  const sortBy = (query, type) => {
    dispatch(sortPosts({ query, type }));
  };

  return (
    <Dropdown as={ButtonGroup} className={styles.dropBtn}>
      <Button>{name}</Button>
      <Dropdown.Toggle />
      <Dropdown.Menu>
        {id !== 1 && (
          <Dropdown.Item onClick={() => sortBy(query, "ALPHA")}>
            В алф. порядке
          </Dropdown.Item>
        )}
        <Dropdown.Item onClick={() => sortBy(query, "ASC")}>
          По возрастанию
        </Dropdown.Item>
        <Dropdown.Item onClick={() => sortBy(query, "DESC")}>
          По Убыванию
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
