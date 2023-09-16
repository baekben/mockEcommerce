import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </BrowserRouter>
      </div>
      <footer>Footer</footer>
    </>
  );
}

export default App;
