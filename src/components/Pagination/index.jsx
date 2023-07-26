import React from "react";
import styles from "./Pagination.module.scss";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setPageId } from "../../redux/slices/posts";

const Pagination = () => {
  const { workInPosts, pageId } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const length = Math.ceil(workInPosts.length / 10);
  const changePageId = (id) => {
    if (id >= 1 && id <= length) {
      window.history.pushState(pageId, "", id);
      dispatch(setPageId(id));
    }
  };

  return (
    <>
      {length ? (
        <div className={styles.pagination}>
          <span onClick={() => changePageId(pageId - 1)}>Назад</span>
          <div className={styles.pages}>
            {Array.from({ length }, (_, i) => i + 1).map((item) => {
              return (
                <span
                  onClick={() => changePageId(item)}
                  key={item}
                  style={{ color: pageId === item ? "#7EBC3C" : "" }}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <span onClick={() => changePageId(pageId + 1)}>Далее</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Pagination;
