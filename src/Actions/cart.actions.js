import { cartConstant } from "./constants";
import store from "../Store";
import axiosInstance from "../Helpers/axios";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.post(`/customer/get-cart-items`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstant.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    // console.log('action::products', products);

    // const product = action.payload.product;
    // const products = state.products;

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty) : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };
    console.log("qty : " + cartItems[product._id]);

    if (auth.authenticate) {
      dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
          },
        ],
      };
      console.log("Payload " + payload.cartItems[0].quantity);
      const res = await axiosInstance.post(
        `/customer/cart/add-to-cart`,
        payload
      );
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    console.log("addToCart::", cartItems);

    dispatch({
      type: cartConstant.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

// export const addToCart = (product, newQty = 1) => {
//   return async (dispatch) => {
//     const {
//       cart: { cartItems },
//       auth,
//     } = store.getState();
//     //console.log('action::products', products);
//     //const product = action.payload.product;
//     //const products = state.products;
//     // const qty = cartItems[product._id]
//     //   ? parseInt(cartItems[product._id].qty + newQty)
//     //   : 1;
//     console.log('cartItems:', cartItems);
    
//     const qty = cartItems[product._id] && cartItems[product._id].quantity
//     ? parseInt(cartItems[product._id].qty + newQty)
//     : 1;
//     // console.log("qty : " + qty);

//     const updatedProduct = {
//       ...product,
//       quantity: qty,
//     };
//     cartItems[product._id] = updatedProduct;
//     console.log("dfdf : " , cartItems[product._id].quantity);
//     // console.log("qty : " + Object.keys(cartItems[product._id]).length);
//     if (auth.authenticate) {
//       dispatch({ type: cartConstant.ADD_TO_CART_REQUEST });
//       const payload = {
//         // cartItems: Object.keys(cartItems).map((key, index) => {
//         //     return {
//         //         quantity: cartItems[key].quantity,
//         //         product: cartItems[key]._id
//         //     }
//         // })
//         cartItems: [
//           {
//             product: product._id,
//             quantity: qty,
//           },
//         ],
//       };
//       console.log("dfdf : " , cartItems[product._id].quantity);
//       // console.log(payload);
//       const res = await axiosInstance.post(
//         `/customer/cart/add-to-cart`,
//         payload
//       );
//       console.log(res);
//       if (res.status === 201) {
//         dispatch(getCartItems());
//       }
//     } else {
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }

//     console.log("addToCart::", cartItems);

//     dispatch({
//       type: cartConstant.ADD_TO_CART_SUCCESS,
//       payload: { cartItems },
//     });
//   };
// };

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    console.log("upppppppppp");

    if (auth.authenticate) {
      localStorage.removeItem("cart");
      //dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].quantity,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosInstance.post(
            `/customer/cart/add-to-cart`,
            payload
          );
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstant.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};


export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstant.REMOVE_CART_ITEM_REQUEST });
      const res = await axiosInstance.post(`/user/cart/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstant.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstant.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// export const updateCart = () => {
//   return async (dispatch) => {
//     const { auth } = store.getState();
//     let cartItems = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : null;

//     console.log("upppppppp");

//     if (auth.authenticate) {
//       localStorage.removeItem("cart");

//       if (cartItems) {
//         const payload = {
//           cartItems: Object.keys(cartItems).map((key, index) => {
//             return {
//               quantity: cartItems[key].qty,
//               product: cartItems[key]._id,
//             };
//           }),
//         };

//         if (Object.keys(cartItems).length > 0) {
//           const res = await axiosInstance.post(
//             `/customer/cart/add-to-cart`,
//             payload
//           );
//           if (res.status === 201) {
//             dispatch(getCartItems());
//           }
//         }
//       }
//     } else {
//       if (cartItems) {
//         dispatch({
//           type: cartConstant.ADD_TO_CART_SUCCESS,
//           payload: { cartItems },
//         });
//       }
//     }
//   };
// };

export { getCartItems };
