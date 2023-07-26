import React from "react";
// components
import Main from "./pages/Main";
// redux
import { useDispatch } from "react-redux";
import { fetchPosts } from "./redux/slices/posts";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => { // fake delay loading
      dispatch(fetchPosts());
    }, 500);
  }, []);

  return (
    <>
      <Main />
    </>
  );
};

export default App;
