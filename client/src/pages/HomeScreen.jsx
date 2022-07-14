import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Corousel from "../components/Corousel";
import Thumbnail from "../components/Thumbnail";
import doctor from "../static/img/diagnosis.png";
import prescription from "../static/img/prescription.png";
import flask from "../static/img/flask.png";
import discount from "../static/img/discount.png";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Box } from "@mui/material";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PreviousBtn = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIos style={{ color: "black", fontSize: "30px" }} />
      </div>
    );
  };

  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIos style={{ color: "black", fontSize: "30px" }} />
      </div>
    );
  };

  return (
    <div>
      <Corousel />
      <Thumbnail />
      <h1 className="text-2xl text-center font-semibold text-gray-800">
        Which offers you should try!
      </h1>
      <p className="text-l text-center">
        Here order your favorite things from different categories
      </p>
      <div className="product-container">
        <div className="p-box">
          <img alt="1" src={doctor} />
          <h5>Doctor Consultation</h5>
          <a className="ex-btn" href="/">
            Get in Touch
          </a>
        </div>
        <div className="p-box">
          <img alt="2" src={prescription} />
          <h5>Home Medicine Delivery</h5>
          <a className="ex-btn" href="order.html">
            Order Medicine
          </a>
        </div>
        <div className="p-box">
          <img alt="3" src={flask} />
          <h5>Diagnostic Tests</h5>
          <a className="ex-btn" href="tests.html">
            Apply For Tests
          </a>
        </div>
        <div className="p-box">
          <img alt="4" src={discount} />
          <h5>Grab Offer & Discounts</h5>
          <a className="ex-btn" href="/">
            Use Services
          </a>
        </div>
      </div>
      <Box sx={{ mt: 6 }}>
        <h1 className="text-2xl text-center font-semibold text-gray-800">
          Latest offers for you only!
        </h1>
        <p className="text-l text-center">
          Me made some special offers only for you
        </p>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger"> {error} </MessageBox>
        ) : (
          <div
            className="Multi"
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
          >
            <div style={{ width: "90%" }}>
              <Slider
                prevArrow={<PreviousBtn />}
                nextArrow={<NextBtn />}
                slidesToShow={4}
                slidesToScroll={3}
                dots
              >
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

export default HomeScreen;
