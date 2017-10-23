//step 3: define reducers
export default (state = { books: [] }, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return { books: [...state, ...action.books] };
    case "POST_BOOK":
      return {
        ...state,
        books: [...state.books, action.payload],
        msg: "Saved! click to continue",
        style: "success",
        validation: "success"
      };
    case "DELETE_BOOK":
      return {
        books: state.books.filter(({ _id }) => _id !== action._id)
      };
    case "UPDATE_BOOK":
      return {
        books: state.books.map(book => {
          if (book._id === action.payload._id) {
            return {
              ...book,
              ...action.payload
            };
          }
          return book;
        })
      };
    case "POST_BOOK_REJECTED":
      return {
        ...state,
        msg: "Please try again",
        style: "danger",
        validation: "error"
      };
    case "RESET_FORM":
      return {
        ...state,
        msg: null,
        style: "primary",
        validation: null
      };
    default:
      return state;
  }
};
