import './App.css';
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup';
import store from "./store"
import {loadUser} from "./actions/userAction"
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import  ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart'
import Shipping from './component/Cart/Shipping'
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders"
import OrderDetails from "./component/Order/OrderDetails"
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
// import NotFound from "./component/layout/Not Found/NotFound";
function App() {

  const {user,isAuthenticated}= useSelector((state)=>state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  },[])

  return (
    <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products}/>
    <Route path="/products/:keyword" component={Products}/>
    <Route exact path="/search" component={Search}/>
    <ProtectedRoute exact path="/account" component ={Profile}/>
    <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
    <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
    <ProtectedRoute exact path="/shipping" component={Shipping} />
    <ProtectedRoute exact path="/success" component={OrderSuccess} />
    <ProtectedRoute exact path="/orders" component={MyOrders} />
    <Route exact path="/password/forgot" component={ForgotPassword}/>
    <Route exact path="/password/reset/:token" component={ResetPassword}/>
    <Route exact path="/login" component={LoginSignup}/>
    <Route exact path="/cart" component={Cart}/>
    <Switch>
    <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
    <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
    </Switch>
    <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
    <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />
    <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />
    <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />
    <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />
    <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />
    <ProtectedRoute isAdmin={true}  exact path="/admin/users" component={UsersList}/>
    <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
                <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
    <Footer/>
    </Router>

  );
}

export default App; 