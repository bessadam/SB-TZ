import React from 'react';
import styles from "./Main.module.scss";
// components
import { Search, Chart, Pagination} from "../../components";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Search />
        <Chart />
        <Pagination />
      </div>
    </div>
  )
}

export default Main;