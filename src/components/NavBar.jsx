import { Link } from "react-router-dom";
import logo from "../assets/that-store-logo.png";
export default function NavBar() {
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
                <Link to="/login">
                  <h3>Login</h3>
                </Link>
              </div>
            </div>
            <div className="cartContainer">
              <Link to="/cart">
                <h3>Cart</h3>
              </Link>
            </div>
          </div>
          <div className="storeNavigation">
            <div className="navigateBtns">
              <ul className="buttons">
                <li>
                  <div className="shopCategory mensBtn">
                    <Link to="/mens">
                      <h2>Men</h2>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="shopCategory womensBtn">
                    <Link to="/womens">
                      <h2>Women</h2>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="shopCategory accessoriesBtn">
                    <Link to="/accessories">
                      <h2>Accessories</h2>
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
