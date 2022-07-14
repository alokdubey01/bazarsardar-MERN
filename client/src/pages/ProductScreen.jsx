import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { detailsProduct } from "../actions/productActions";
import { Box } from "@mui/material";
// import data from '../data/products';

function ProductScreen(props) {
  // console.log(props);

  const dispatch = useDispatch();
  //props.match.params is the url path /product/:id
  //props.match.params.id = id (1, 2 , 3 etc... )
  // only return the product info of the one being clicked
  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);

  // use store productDetails to replace product from seed data
  const productDetails = useSelector((state) => state.productDetails);
  // decontruct product, loading, error from productDetails
  const { product, loading, error } = productDetails;

  // console.log(productDetails);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  // direct to cart page when add to cart btn is clicked
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <div className="animate-pulse bg-white border border-gray-600 rounded-lg dark:bg-gray-800 dark:border-gray-700 ml-4 mt-4">
          <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full px-4 md:w-1/2 ">
                <div
                  class="sticky top-0 z-50 overflow-hidden"
                  style={{ height: "100%" }}
                >
                  <div
                    className="bg-slate-200 rounded-t-lg ml:auto p-8 items-center justify-center w-full h-20"
                    style={{ height: "100%" }}
                  ></div>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 ">
                <div class="lg:pl-20">
                  <div class="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                      <div className="h-2 bg-slate-200 w-1/4 rounded col-span-2"></div>
                      <div className="bg-slate-200 mt-4 rounded-t-lg ml:auto p-2 items-center justify-center w-full"></div>
                    </span>
                    <div className="h-2 bg-slate-200 mt-4 rounded col-span-2"></div>
                    <div class="flex flex-wrap items-center mb-6">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>

                    <div className="h-2 bg-slate-200 mt-6 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 mt-4 rounded col-span-2"></div>
                  </div>
                  <div class="flex flex-wrap items-center ">
                    <div class="mb-4 mr-4 lg:mb-0">
                      <div class="w-28">
                        <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                          <Box>
                            <button
                              className="text-base leading-none disabled:bg-gray-300 py-3 px-4 bg-gray-500 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                              style={{ width: "10rem" }}
                            >
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            </button>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <section class="overflow-hidden bg-white font-poppins dark:bg-gray-800">
          <Link to="/"> Back To Result</Link>
          <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div class="flex flex-wrap -mx-4">
              <div class="w-full px-4 md:w-1/2 ">
                <div class="sticky top-0 z-50 overflow-hidden ">
                  <div
                    class="relative mb-6 lg:mb-10"
                    style={{ height: "450px" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      class="object-contain w-full h-full "
                    />
                  </div>
                </div>
              </div>
              <div class="w-full px-4 md:w-1/2 ">
                <div class="lg:pl-20">
                  <div class="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                    <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                      New
                    </span>
                    <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                      {product.name}
                    </h2>
                    <div class="flex flex-wrap items-center mb-6">
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      />
                      {product.countInStock > 0 ? (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded dark:bg-green-200 dark:text-green-800 ml-1">
                          {" "}
                          In Stock
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-1 rounded dark:bg-red-200 dark:text-red-800 ml-1">
                          {" "}
                          Out Of Stocks
                        </span>
                      )}
                    </div>
                    <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                      {product.description}
                    </p>
                    <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>{product.price}</span>
                      <span className="inline-block text-sm font-normal text-gray-700 dark:text-gray-400 ">
                        .00
                      </span>
                      ₹
                      <span class="text-base ml-2 font-normal text-gray-500 line-through dark:text-gray-400">
                        {product.price + 43 + ".00"}₹
                      </span>
                    </p>
                  </div>
                  <div class="flex flex-wrap items-center ">
                    <div class="mb-4 mr-4 lg:mb-0">
                      <div class="w-28">
                        <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                          {product.countInStock > 0 && (
                            <Box>
                              <div className="flex">
                                <div>Qty</div>
                                <select
                                  className="flex items-center mb-2.5 border ml-3 font-semibold text-center text-gray-700  outline-none focus:outline-none text-md"
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock)].map(
                                    (x, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>

                              <button
                                onClick={addToCartHandler}
                                className="text-base leading-none disabled:bg-gray-300 py-3 px-4 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                                style={{ width: "10rem" }}
                              >
                                Add to Cart
                              </button>
                            </Box>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductScreen;
