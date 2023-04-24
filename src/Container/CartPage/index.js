import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addToCart, getCartItems } from "../../Actions";
import { useNavigate } from "react-router-dom";
import PriceDetails from "../../Components/PriceDetails";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.CartItems]);

  useEffect(() => {
    //   if (auth.authenticate){
    dispatch(getCartItems());
    //   }
  }, []);

  const onQuantityIncrement = (_id, qty) => {
    console.log(_id, qty);
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log(_id, qty);
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  if (props.onlyCartPage) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItems={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100">
        <h1 className="text-center text-2xl font-bold my-4">Cart Items</h1>
        <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {
              //   JSON.stringify(cartItems)
              Object.keys(cartItems).map((key, index) => (
                <CartItem
                  key={index}
                  cartItems={cartItems[key]}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                />
              ))
            }
          </div>
          {/* <!-- Sub total --> */}
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              },
              0
            )}
            buttonClick={() => navigate("/checkout")}
            buttonName={"Checkout"}
          />
        </div>
      </div>
    </>
  );
};

export default CartPage;
