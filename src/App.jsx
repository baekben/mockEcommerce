import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Products from "./components/Products";

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
              <Route
                path="/mens"
                element={<Products category={"men's clothing"} />}
              />
              <Route
                path="/womens"
                element={<Products category={"women's clothing"} />}
              />
              <Route
                path="/accessories"
                element={<Products category={"jewelery"} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      <footer>Footer</footer>
    </>
  );
}

export default App;
