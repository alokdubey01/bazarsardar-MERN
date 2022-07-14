import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import {
  Box,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function CartScreen(props) {
  // check if user has already signed in, if not, redirect user to signin
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const productId = props.match.params.id;
  ///cart/${productId}?qty={qty}
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  //get cart and cartItem from redux store using useSelector
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // on page load, check if productId, if so, dispatch addToCart action
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  //delete cartItem action
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  //After checkout btn is clicked, go to signin page and then shipping page
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <Box sx={{ m: 4 }}>
      <div className="row flex">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col mb-3">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
            </div>
          </div>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/"> Go Shopping</Link>
            </MessageBox>
          ) : (
            cartItems.map((item) => (
              <div className="row border-top border-bottom" key={item.product}>
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="img-fluid"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="col">
                    <Link
                      to={`/product/${item.product}`}
                      className="font-semibold text-xl"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="col">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col font-semibold text-l">
                    {item.price} ₹
                    <span
                      className="close font-normal"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <Chip
                        sx={{ mb: 1, ml: 4, cursor: "pointer", color: "red" }}
                        label="remove"
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length === 0 ? (
          <Box sx={{ display: "none" }}></Box>
        ) : (
            <div className="col-md-4 summary">
              <div class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
                <div class="flex flex-col lg:h-screen h-auto px-4 py-4 justify-between overflow-y-auto">
                  <div>
                    <p class="text-2xl font-black leading-9 text-gray-800 dark:text-white">
                      Summary
                    </p>
                    <div class="flex items-center justify-between pt-5">
                      <p class="text-base font-bold leading-none text-gray-800 dark:text-white">
                        Total Item
                      </p>
                      <p class="text-base font-semibold leading-none text-gray-800 dark:text-white">
                        {cartItems.reduce((a, c) => a + c.qty, 0)} itmes
                      </p>
                    </div>
                    <div class="flex items-center justify-between pt-3">
                      <p class="text-base font-bold leading-none text-gray-800 dark:text-white">
                        Subtotal
                      </p>
                      <p class="text-base font-semibold leading-none text-gray-800 dark:text-white">
                        {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}₹
                      </p>
                    </div>
                    <div class="flex items-center justify-between pt-3">
                      <p class="text-base leading-none font-bold text-gray-800 dark:text-white">
                        Shipping
                      </p>
                      <p class="text-base leading-none font-semibold text-gray-800 dark:text-white">
                        +50₹
                      </p>
                    </div>
                    <div class="flex items-center justify-between pt-3">
                      <p class="text-base leading-none font-bold text-gray-800 dark:text-white">
                        GST
                      </p>
                      <p class="text-base leading-none font-semibold text-gray-800 dark:text-white">
                        +35₹
                      </p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p class="text-2xl leading-normal text-gray-800 dark:text-white">
                        Total
                      </p>
                      <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">
                        {cartItems.reduce(
                          (a, c) => a + c.price * c.qty + 50,
                          0
                        )}
                        ₹
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-base leading-none w-full disabled:bg-gray-300 py-3 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
    </Box>
  );
}

export default CartScreen;
