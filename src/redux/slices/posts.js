import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "news/fetchPosts",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("server error");
      }

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const posts = createSlice({
  name: "posts",
  initialState: {
    status: null,
    error: null,
    posts: [],
    workInPosts: [],
    pageId: 1,
  },
  reducers: {
    searchPost(state, action) {
      const searchValue = action.payload.toLowerCase();
      state.workInPosts = state.posts.filter(
        (item) =>
          item.title.toLowerCase().includes(searchValue) ||
          item.body.toLowerCase().includes(searchValue)
      );
    },
    setPageId(state, action) {
      state.pageId = action.payload;
    },
    sortPosts(state, action) {
      const posts = state.workInPosts.length ? state.workInPosts : state.posts;
      switch (action.payload.query) {
        case "ID":
          if (action.payload.type === "ASC") {
            state.workInPosts = posts.sort((a, b) => a.id - b.id);
          } else {
            state.workInPosts = posts.sort((a, b) => b.id - a.id);
          }
          break;
        case "TITLE":
          if (action.payload.type === "ASC") {
            state.workInPosts = posts.sort(
              (a, b) => a.title.length - b.title.length
            );
          } else if (action.payload.type === "DESC") {
            state.workInPosts = posts.sort(
              (a, b) => b.title.length - a.title.length
            );
          } else {
            state.workInPosts = posts.sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          }
          break;
        case "BODY":
          if (action.payload.type === "ASC") {
            state.workInPosts = posts.sort(
              (a, b) => a.body.length - b.body.length
            );
          } else if (action.payload.type === "DESC") {
            state.workInPosts = posts.sort(
              (a, b) => b.body.length - a.body.length
            );
          } else {
            state.workInPosts = posts.sort((a, b) =>
              a.body.localeCompare(b.body)
            );
          }
          break;
        default:
          return state;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.posts = action.payload;
      state.workInPosts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { searchPost, sortPosts, setPageId } = posts.actions;
export default posts.reducer;
