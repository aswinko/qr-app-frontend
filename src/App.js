import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./Container/Home";
import AboutPage from "./Container/About";
import FoodItem from "./Components/FoodItem";
import Login from "./Container/Login";
import PageNotFound from "./Container/PageNotFound";
import PrivateRoute from "./Components/HOC/PrivateRoute";
import { getCartItems, isUserLoggedIn, updateCart } from "./Actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "./Container/CartPage";
import CheckOutPage from "./Container/CheckOutPage";
import OrderPage from "./Container/OrderPage";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log('App.js - updateCart');
    dispatch(updateCart());
  }, [])

  useEffect(() => {
    //   if (auth.authenticate){
    dispatch(getCartItems());
    //   }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route to="/" element={<PrivateRoute />}>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:slug" element={<FoodItem />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
