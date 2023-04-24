import axiosInstance from "../Helpers/axios";
import { cartConstant, userConstant } from "./constants";

export const addOrder = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post(`/add-orders`, payload);
        dispatch({ type: userConstant.ADD_USER_ORDER_REQUEST });
        if (res.status === 201) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: cartConstant.RESET_CART,
          });
        //   dispatch({
        //     type: userConstant.ADD_USER_ORDER_SUCCESS,
        //     payload: { order },
        //   });
          // const {
          //   address: { address },
          // } = res.data;
          // dispatch({
          //   type: userConstant.ADD_USER_ADDRESS_SUCCESS,
          //   payload: { address },
          // });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstant.ADD_USER_ORDER_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const getOrders = () => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.get(`/get-orders`);
        dispatch({ type: userConstant.GET_USER_ORDER_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { orders } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDER_SUCCESS,
            payload: { orders },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstant.GET_USER_ORDER_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };