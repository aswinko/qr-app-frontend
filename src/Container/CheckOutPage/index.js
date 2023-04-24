import React from "react";
import CheckOutStep from "./CheckOutStep/CheckOutStep";
import Header from "../../Components/Header";
import PriceDetails from "../../Components/PriceDetails";
import { useDispatch, useSelector } from "react-redux";
import CartPage from "../CartPage";
import { Button } from "flowbite-react";
import { addOrder } from "../../Actions/order.actions";

const CheckOutPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const [cartItems, setCartItems] = useState(cart.cartItems);

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      }, 0);

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty
    }))
    const payload = {
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "pay at counter",
    };
    dispatch(addOrder(payload))
    console.log(payload);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 mb-6">
        <h1 className="text-center text-2xl font-bold my-4">Checkout</h1>
        <div className="mx-auto max-w-7xl justify-center px-2 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            <div
              id="accordion-color"
              className="shadow-md"
              data-accordion="collapse"
              data-active-classes="text-blue-600"
            >
              <CheckOutStep
                title={"Order Summary"}
                heading_id="order_heading"
                id={"order"}
                body={<CartPage onlyCartPage={true} />}
              />
              <CheckOutStep
                title={"Payment Option"}
                heading_id="payment_heading"
                id={"payment"}
                body={
                  <div>
                    <div class="flex items-center mb-4">
                      <input
                        checked
                        id="default-radio-1"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-1"
                        class="ml-2 text-sm font-medium text-gray-500"
                      >
                        Pay at Cash Counter
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="default-radio"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-2"
                        class="ml-2 text-sm font-medium text-gray-500"
                      >
                        UPI
                      </label>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button onClick={onConfirmOrder} className="w-full md:w-80 md:px-24">
                        Confirm Order
                      </Button>
                    </div>
                  </div>
                }
              />
            </div>
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
            // buttonClick={""}
            // buttonName={"Pay Now"}
          />
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
