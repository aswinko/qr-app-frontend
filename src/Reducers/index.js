import { combineReducers } from "redux";
import categoryReducers from "./category.reducers";
import authReducers from "./auth.reducers";
import productReducers from "./product.reducers";
import cartReducers from "./cart.reducers";
import orderReducers from "./order.reducers";

const rootReducer = combineReducers({
    auth: authReducers,
    category: categoryReducers,
    product: productReducers,
    cart: cartReducers,
    order: orderReducers
})

export default rootReducer