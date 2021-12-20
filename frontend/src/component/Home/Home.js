import React, { Fragment } from "react";
import {CgMouse} from "react-icons/all"
import "./Home.css"
import Product from "./Product.js"
import MetaData from "../layout/MetaData";
const product= {
    name:"Blue Tshirt",
    images:[{url:"https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg"}],
    price:"₹3000",
    _id: "paril",
}

const Home = () => {
    return <Fragment>
        <MetaData title="ECOMMERCE"/>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>
                    Scroll<CgMouse/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
            <Product product = {product}/>
        </div>
    </Fragment>
};

export default Home;
