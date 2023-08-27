import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <div className="navBarContainer">
        <div className="logoContainer">
          <p>This is where the logo will be</p>
        </div>
        <div className="menuContainer">
          <div className="loginContainer">
            <div className="userLogin">
              <p>Login Info</p>
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
                <input className="searchBar" type="text" placeholder="Search Bar" />
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
