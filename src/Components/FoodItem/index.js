import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../Actions/product.actions";
import { useParams } from "react-router-dom";
import { IMG_URL } from "../../urlConfig";
import { addToCart } from "../../Actions/cart.actions";

const FoodItem = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, []);
  
  return (
    <Layout>
      {product.products.map((product) => (
        <div className="container mx-auto lg:px-24">
          <div className="border-2 mt-2 mx-4 rounded h-44 flex justify-between text-center text-gray-600 border border-0 p-2 mb-3 shadow-lg bg-white">
            <div className="flex w-80 justify-center">
              <img
                className="rounded-lg w-full object-fill"
                src={IMG_URL + product.productPictures[0].img}
                alt="img"
              />
            </div>
            <div className="flex flex-col pl-6 w-full">
              <h2 className="text-left font-bold mb-2">{product.name}</h2>
              <p className="w-11/12 text-justify text-sm leading-tight">
                {product.description}
              </p>
            </div>
            <div className="p-2 text-black h-full w-60 mt-6 flex items-end flex-col justify-start">
              <div className="flex w-full">
                <span className="text-left text-xl font-bold pl-2">
                  $ {product.price}
                </span>
              </div>
              <div className="w-full p-2 mt-4">
                <button 
                  className="text-green-700 flex font-bold border border-2 px-4 py-1.5 rounded-md"
                  onClick={() => {
                    const { _id, name, price } = product;
                    const img = product.productPictures[0].img;
                    dispatch(addToCart({ _id, name, price, img }));
                  }}  
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default FoodItem;
