import axiosInstance from "../Helpers/axios"
import { productConstant } from "./constants";

export const getProductBySlug = (slug) => {
    return async (dispatch) => {
        const res = await axiosInstance.get(`/products/${slug}`);

        if (res.status === 200){
            dispatch({
                type: productConstant.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            })
        }else{
            // dispatch({

            // })
        }

        console.log(res);
    }
}