import { productConstant } from "../Actions/constants"

const initState = {
    products: [],
}

export default (state = initState, action) => {
    switch(action.type) {
        case productConstant.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state;
}