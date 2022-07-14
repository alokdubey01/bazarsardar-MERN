import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

function Product(props) {
  const { product } = props;

  return (
    // <div className='card'>
    //     <Link to={`/product/${product._id}`}>
    //         <img className='medium' src={product.image} alt='product' />
    //     </Link>
    //     <div className='card-body'>
    //         <Link to={`/product/${product._id}`}>
    //             <h2>{product.name}</h2>
    //         </Link>
    //         <Rating rating={product.rating} numReviews={product.numReviews} />
    //         <div className='price'>${product.price}</div>
    //     </div>
    // </div>

    <div className="bg-white shadow-md rounded-lg w-64 dark:bg-gray-800 dark:border-gray-700 ml-4 mt-4">
        <Link to={`/product/${product._id}`}>
        <img
          className="rounded-t-lg ml:auto items-center justify-center"
        //   style={{height:'200px',width:'200px'}}
          src={product.image}
          alt="product"
        />
        </Link>
      <div className="px-2 pb-3">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-gray-900 mt-1 font-semibold text-l tracking-tight dark:text-white">
          {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-m font-bold text-gray-900 dark:text-white">
          {product.price}₹
          </span>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </div>
  );
}

export default Product;
