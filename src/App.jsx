import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import Product from "./components/Product";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  library.add(fas, faFacebook, faXTwitter, faInstagram);
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <NavBar />
          <div className="content-body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/products/:category" element={<Products />} />
              <Route
                path="/products/:category/:productId"
                element={<Product />}
              ></Route>
            </Routes>
          </div>
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
