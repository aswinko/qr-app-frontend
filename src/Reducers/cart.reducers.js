import { cartConstant } from "../Actions/constants"

const initState = {
    cartItems: {
        // 123: {
        //     _id: "",
        //     name: "",
        //     img: '',
        //     price: null,
        //     qty: null
        // }
    },
    updatingCart: false,
    error: null
}

export default (state = initState, action) => {
    switch(action.type){
        case cartConstant.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstant.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstant.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstant.RESET_CART:
            state = {
                ...initState
            }
    }
    return state;
}