import { Link } from "react-router-dom";
import logo from "../assets/that-store-logo.png";
export default function NavBar() {
  return (
    <>
      <div className="navBarContainer">
        <div className="logoContainer">
          <img src={logo} alt="" width={"200px"} height={"200px"} />
        </div>
        <div className="menuContainer">
          <div className="loginContainer">
            <div className="userLogin">
              <div className="loginBtn">
                {/* when user logs in, then it can change to sign out or account */}
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
          <div className="storeNavigation">
            <div className="navigateBtns">
              <ul className="buttons">
                <li>
                  <div className="mensBtn">
                    <Link to="/mens">Men</Link>
                  </div>
                </li>
                <li>
                  <div className="womensBtn">
                    <Link to="/women">Women</Link>
                  </div>
                </li>
                <li>
                  <div className="accessoriesBtn">
                    <Link to="/accessories">Accessories</Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="extraShopContainer">
              <form className="searchBarContainer">
                <input className="searchBar" type="text" placeholder="Search" />
              </form>
              <div className="cartContainer">
                <Link to="/cart">Cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
