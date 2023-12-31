import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { getAllProducts } from "../src/api/products";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Checkout from "./components/Checkout";

function App() {
  library.add(fas, faFacebook, faXTwitter, faInstagram);

  useEffect(() => {
    async function guestCart() {
      localStorage.setItem("loggedIn", false);
      const allProducts = await getAllProducts();
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
      // guest cart will be local storage
      if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    }

    localStorage.getItem("loggedIn") === true
      ? console.log("user logged in")
      : guestCart();
  }, []);

  return (
    <>
      <div className="main">
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <main>
            <div className="content-body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/searched/:searchTerm" element={<Products />} />
                <Route
                  path="/products/:category/:productId"
                  element={<Product />}
                />

                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<Checkout />} />
              </Routes>
            </div>
          </main>

          <footer>
            <div>
              <p>
                <Link to="/products/men's clothing">Men</Link>
                <Link to="/products/women's clothing">Women</Link>
                <Link to="/products/jewlery">Jewlery</Link>
                <Link to="/products/electronics">Electronics</Link>
              </p>
            </div>
            <div>
              <p>
                <a href="#">Contact Us</a>
                <a href="#ig">
                  <FontAwesomeIcon icon="fa-brands fa-instagram" />
                </a>
                <a href="#fb">
                  <FontAwesomeIcon icon="fa-brands fa-facebook" />
                </a>
                <a href="#x">
                  <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                </a>
                <a href="#github">GitHub Repo</a>
              </p>
            </div>
            <div>
              <p>Fullstack Academy Capstone Project 2023</p>
              <p>Ben B.</p>
            </div>
          </footer>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
