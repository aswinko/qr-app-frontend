import React from "react";

const PriceDetails = ({ buttonName, buttonClick, totalItem, totalPrice }) => {
  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Price <span>({totalItem} items)</span></p>
        <p className="text-gray-700">₹ {totalPrice}</p>
      </div>
      {/* <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div> */}
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">₹ {totalPrice}</p>
          <p className="text-sm text-gray-700">including GST</p>
        </div>
      </div>
      {buttonName && <button onClick={buttonClick} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
        {buttonName}
      </button>}
      
    </div>
  );
};

export default PriceDetails;
