export default (state = { cart: [] }, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        cart: action.cart,
        totalAmount: totals(action.cart).amount,
        totalQuantity: totals(action.cart).totalQuantity
      };
    case "ADD_TO_CART":
      return {
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).totalQuantity
      };
    case "DELETE_CART_ITEM":
      return {
        cart: action.deletedCart,
        totalAmount: totals(action.deletedCart).amount
      };
    case "UPDATE_CART_ITEM":
  
      return {
        cart: action.updatedCart,
        totalAmount: totals(action.updatedCart).amount,
        totalQuantity: totals(action.updatedCart).totalQuantity
      };
    default:
      return state;
  }
};
export const totals = payload => {

  const totalAmount = payload
    .map(cart => {
      return cart.price * cart.qty;
    })
    .reduce((sum, value) => {
      return sum + value;
    }, 0);
  const totalQty = payload.reduce((sum, { qty }) => {
    return sum + qty;
  }, 0);
  return { amount: totalAmount.toFixed(2), totalQuantity: totalQty };
};
