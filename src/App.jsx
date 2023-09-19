import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import Product from "./components/Product";

function App() {
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
                  ig
                  {/* <i className="fa-brands fa-instagram"></i> */}
                </a>
                <a href="#fb">
                  fb
                  {/* <i className="fa-brands fa-facebook"></i> */}
                </a>
                <a href="#x">
                  x{/* <i className="fa-brands fa-x-twitter"></i> */}
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
