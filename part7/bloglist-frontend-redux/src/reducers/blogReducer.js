import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    like: (state, action) => {
      const id = action.payload.id;
      const blogToChange = state.find((b) => b.id === id);

      if (blogToChange) {
        const changedBlog = {
          ...blogToChange,
          likes: blogToChange.likes + 1,
        };

        return state.map((blog) => (blog.id !== id ? blog : changedBlog));
      }
      return state;
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
    addComment(state, action) {
      const { blogId, comment } = action.payload;
      return state.map((blog) =>
        blog.id === blogId
          ? { ...blog, comments: [...blog.comments, { text: comment }] }
          : blog
      );
    },
  },
});

export const { like, appendBlog, setBlogs, removeBlog, addComment } =
  blogSlice.actions;

// Thunks con manejo de errores
export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error("Error fetching blogs:", error);
      const errorMessage =
        error.response?.data?.error || "Error fetching blogs";
      dispatch(setNotification(errorMessage, "error", 5));
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(`A new blog "${content.title}" added!`, "success", 5)
      );
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch(setNotification("Error creating blog", "error", 5));
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const blogToLike = state.blogs.find((b) => b.id === id);

      if (blogToLike) {
        const updatedBlog = {
          ...blogToLike,
          likes: blogToLike.likes + 1,
        };

        await blogService.update(updatedBlog);
        dispatch(like({ id }));
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      dispatch(setNotification("Error liking blog", "error", 5));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const blogToDelete = state.blogs.find((b) => b.id === id);

      if (blogToDelete) {
        await blogService.remove(id);
        dispatch(removeBlog(id));
        dispatch(
          setNotification(`Blog "${blogToDelete.title}" deleted`, "success", 5)
        );
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      dispatch(setNotification("Error deleting blog", "error", 5));
    }
  };
};

export const addCommentToBlog = (id, commentText) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.addComment(id, commentText);
      dispatch(addComment({ id, comment: newComment }));
      dispatch(setNotification("Comment added successfully!", "success", 5));
    } catch (error) {
      console.error("Error adding comment:", error);
      dispatch(setNotification("Error adding comment", "error", 5));
    }
  };
};

export default blogSlice.reducer;
