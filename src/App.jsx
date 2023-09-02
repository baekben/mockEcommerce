import NavBar from "./components/NavBar";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <>
      <div className="main">
        <BrowserRouter>
          <NavBar />
          <div className="body">
            *body*
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </div>
          <div className="footer">Footer</div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
