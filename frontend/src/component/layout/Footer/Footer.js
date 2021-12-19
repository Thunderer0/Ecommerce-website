import React from "react";
import playstore from  "../../../images/playstore.png"
import appstore from  "../../../images/Appstore.png"
import "./Footer.css"
const Footer = () =>{
    return (
        <footer id="footer">
        <div class="leftFooter">
            <h4>Download our App</h4>
            <p>Download our App for Android and Iphone</p>
            <img src={playstore} alt="playstore"/>
            <img src={appstore} alt="appstore"/>
        </div>
        <div class="midFooter">
            <h1>Ecommerce Website</h1>
            <p>Quality over Quantity</p>
            <p>Copyrights 2021 &copy; ParilSanghvi</p>
        </div>
        <div class="rightFooter">
            <h4>Hope you like my website</h4>
            <a href="https://github.com/Thunderer0">Github</a>
            <a href="https://www.linkedin.com/in/paril-sanghvi-38627b217/">Linkedin</a>
        </div>
        </footer>
    );
};

export default Footer