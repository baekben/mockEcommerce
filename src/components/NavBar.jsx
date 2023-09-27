import { Link } from "react-router-dom";
import logo from "../assets/that-store-logo.png";
import { useEffect, useState } from "react";
export default function NavBar() {
  const [logout, setLogout] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    loggedIn !== "guest" ? setLogout(true) : setLogout(false);
  }, []);

  async function logoutUser() {
    localStorage.setItem("loggedIn", "guest");
    window.location.reload();
  }

  return (
    <>
      <div className="navBarContainer">
        <div className="logoContainer">
          <Link to="/">
            <img src={logo} alt="" width={"200px"} height={"200px"} />
          </Link>
        </div>
        <div className="menuContainer">
          <div className="loginContainer">
            <div className="userLogin">
              <div className="loginBtn">
                {/* when user logs in, then it can change to sign out or account */}
                {logout ? (
                  <h3 className="username">
                    {localStorage.getItem("username")}
                  </h3>
                ) : (
                  <Link to="/login">
                    <h3>Login</h3>
                  </Link>
                )}
              </div>
              {logout && (
                <>
                  <div className="logoutContainer">
                    <button onClick={logoutUser}>Logout</button>
                  </div>
                </>
              )}
            </div>
            <div className="cartContainer">
              <div className="cartBtn">
                <Link to="/cart">
                  <h3>Cart</h3>
                </Link>
              </div>
            </div>
          </div>
          <div className="storeNavigation">
            <div className="navigateBtns">
              <ul className="buttons">
                <li>
                  <div className="shopCategory mensBtn">
                    <Link to="/products/men's clothing">
                      <h2>Men</h2>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="shopCategory womensBtn">
                    <Link to="/products/women's clothing">
                      <h2>Women</h2>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="shopCategory jeweleryBtn">
                    <Link to="/products/jewelery">
                      <h2>Jewlery</h2>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="shopCategory electronicsBtn">
                    <Link to="/products/electronics">
                      <h2>Electronics</h2>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="extraShopContainer">
              <form className="searchBarContainer">
                <input className="searchBar" type="text" placeholder="Search" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
