import axiosInstance from "../Helpers/axios";
import { categoryConstant } from "./constants";

export const getAllCategory = () => {
    return async (dispatch) => {
        const res = await axiosInstance.get(`category/getCategory`);
        console.log(res);

        dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST });

        const { categories } = res.data;

        if(res.status === 200) {
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categories }
            })
        }else{ 
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
}
