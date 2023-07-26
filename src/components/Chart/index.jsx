import React from "react";
import styles from "./Chart.module.scss";
// bootstrap
import Table from "react-bootstrap/Table";
// redux
import { useSelector } from "react-redux";
// components
import DropDown from "../DropDown";
// mock db
import { headerTitles } from "../../utils/db";

const Chart = () => {
  const { workInPosts, pageId } = useSelector((state) => state.posts);
  // const arr = workInPosts.length ? workInPosts : posts;
  const arr = workInPosts;
  return (
    <Table bordered className={styles.chart}>
      <thead className={styles.header}>
        <tr>
          {headerTitles.map((item) => {
            return (
              <th key={item.id}>
                <DropDown {...item} />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {arr.length ? arr.slice(pageId * 10 - 10, pageId * 10).map((post) => {
          return (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          );
        }) : <tr className={styles.warningTitle}>
          <td colSpan={3}>Sorry, there are no posts</td></tr>}
      </tbody>
    </Table>
  );
};

export default Chart;
