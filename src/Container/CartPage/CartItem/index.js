import React, { useState } from "react";
import { IMG_URL } from "../../../urlConfig";

const CartItem = (props) => {

    const [qty, setQty] = useState(props.cartItems.qty);
    
    const { _id, name, price, img } = props.cartItems;

    // console.log(props.cartItems);

//   const minusCart = () => {
//     if (minus <= 1) setMinus(minus);
//     else {
//       setMinus(minus - 1);
//     }
//   };
//   const plusCart = () => {
//     setMinus(minus + 1);
//   };

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1)
  }

  const onQuantityDecrement = () => {
    if(qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1)
  }

  return (
    <div
      className="justify-between mb-6 rounded-lg bg-white p-1 shadow-md sm:flex sm:justify-start"
    >
      <img
        src={IMG_URL + img}
        alt="product-image"
        className="w-full rounded-lg h-full sm:h-32 sm:w-72"
      />
      <div className="sm:ml-4 sm:flex p-4 sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          {/* <p className="mt-1 text-md text-left text-gray-700">QTY : {cartItems[key].qty}</p> */}
        </div>
        <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <p className="mt-1 text-md text-left text-gray-700 pr-2">QTY :</p>
            <span
              onClick={onQuantityDecrement}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              onChange={(e) => setQty(parseInt(e.target.value))}
              value={qty}
              disabled
              min="1"
            />
            <span
              onClick={onQuantityIncrement }
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm font-semibold">{price} ₹</p>
            <button onClick={() => props.removeCartItem(_id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
