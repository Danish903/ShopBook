import axios from "axios";
export const getBooks = books => ({
  type: "GET_BOOKS",
  books
});

export const startGetBooks = () => {
  return dispatch => {
    axios
      .get("/api/books")
      .then(res => {
        dispatch(getBooks(res.data));
      })
      .catch(error => {
        dispatch({
          type: "GET_BOOKS_ERROR",
          payload: "There was an error getting books."
        });
        console.log(error);
      });
  };
};
export const postBooks = book => {
  return {
    type: "POST_BOOK",
    payload: book
  };
};

export const StartPostBooks = book => {
  return dispatch => {
    axios
      .post("/api/books", book)
      .then(res => {
        dispatch(postBooks(res.data));
      })
      .catch(err => {
        console.log("error");
      });
  };
};
export const deleteBooks = _id => {
  return {
    type: "DELETE_BOOK",
    _id
  };
};

export const startDeleteBooks = _id => {
  return dispatch => {
    axios
      .delete(`/api/books/${_id}`)
      .then(res => {
        console.log(res.data);
        dispatch(deleteBooks(_id));
      })
      .catch(error => {
        dispatch({
          type: "DELTE_BOOK_ERROR",
          payload: "ERROR DELETING BOOKS"
        });
      });
  };
};

export const updateBooks = book => {
  return {
    type: "UPDATE_BOOK",
    payload: book
  };
};
export const resetForm = () => {
  return {
    type: "RESET_FORM",
  };
};
