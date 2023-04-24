import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Actions";
import Header from "../../Components/Header";
import { IMG_URL } from "../../urlConfig";

const OrderPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  //   console.log("order : " + order.);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <div>
      <Header />
      <div>
        <h2 className="mx-24 p-4 text-2xl font-bold text-left">My Orders</h2>
      </div>
      {order.orders.map((order) => {
        return order.items.map((item) => (
          <div className="container mx-auto lg:px-24">
            <div className="border-2 flex justify-between mt-2 mx-4 rounded h-36 text-center text-gray-600 border border-0 p-2 mb-3 shadow-lg bg-white">
              <div className="flex w-56 justify-left">
                <img
                  className="rounded-lg w-full object-fill"
                  src={IMG_URL + item.productId.productPictures[0].img}
                  alt="img"
                />
              </div>
              <div className="flex flex-col pl-10 mt-6 w-fit">
                <h2 className="text-left font-bold mb-2">
                  {item.productId.name}
                </h2>
                {/* <p className="w-11/12 text-justify text-sm leading-tight">
                            {product.description}
                        </p> */}
              </div>
              <div className="p-2 w-full text-black h-full w-60 mt-6 flex items-end flex-col justify-start">
                <span className="text-left text-xl font-bold pl-2">
                  $ {item.payablePrice}
                </span>
              </div>
              <div className="p-2 text-black w-full h-full w-60 mt-6 flex items-end flex-col justify-start">
                <span className="text-left text-xl pl-2">
                  Qty: {item.purchasedQty}
                </span>
              </div>
              <div className="p-2 text-black w-full h-full w-60 mt-6 mr-6 flex items-end flex-col justify-start">
                <span className="text-left text-xl">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
          // </div>
        ));
      })}
    </div>
  );
};

export default OrderPage;
