import axios from "axios";

export const getCart = () => {
  return dispatch => {
    axios
      .get("/api/cart")
      .then(res => {
        const cart = res.data;
        dispatch({ type: "GET_CART", cart });
      })
      .catch(error => {
        console.log("get cart error");
      });
  };
};
export const addToCart = book => {
  return {
    type: "ADD_TO_CART",
    payload: book
  };
};

export const startAddToCart = book => {
  return dispatch => {
    axios
      .post("/api/cart", book)
      .then(res => {
        dispatch(addToCart(res.data));
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: "ADD_TO_CART_ERROR", payload: "ERROR adding cart" });
      });
  };
};
export const deleteCart = (_id, cart) => {
  const afterDeletedCart = cart.filter(cart => cart._id !== _id);
  return dispatch => {
    axios
      .post("/api/cart", afterDeletedCart)
      .then(res => {
        const deletedCart = res.data;
        dispatch({
          type: "DELETE_CART_ITEM",
          deletedCart
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_CART_ITEM_ERROR",
          payload: "ERROR DELETING CART ITEM"
        });
      });
  };
};
export const startDeleteCart = cart => {
  return dispatch => {
    axios.post("/api/cart", cart).then(res => {
      const cart = res.data;
      dispatch(deleteCart(cart));
    });
  };
};
export const updateCart = (_id, unit, cart) => {
  let updatedCart = cart.map(cart => {
    if (cart._id === _id) {
      cart.qty += unit;
      return cart;
    }
    return cart;
  });

  return dispatch => {
    axios
      .post("/api/cart", updatedCart)
      .then(res => {
        updatedCart = res.data;
        dispatch({
          type: "UPDATE_CART_ITEM",
          updatedCart
        });
      })
      .catch(error => {
        console.log("ERROR posting updating cart");
        dispatch({ type: "ERR_UPDATE_CART_ITEM", payload: "ERROR" });
      });
  };
};
