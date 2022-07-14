import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import SigninScreen from "./pages/SigninScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import OrderHisotyScreen from "./pages/OrderHisotyScreen";
import ProfileScreen from "./pages/ProfileScreen";
import Medicine from "./pages/Medicine";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHisotyScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/medicine" component={Medicine} />
        </main>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
