import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/that-store-logo.png";
import { useEffect, useState } from "react";
export default function NavBar() {
  const [logout, setLogout] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    loggedIn ? setLogout(true) : setLogout(false);
  }, []);

  async function logoutUser() {
    localStorage.setItem("loggedIn", "guest");
    localStorage.clear();
    setLogout(false);
    window.location.reload();
  }

  async function handleSearch(e) {
    e.preventDefault();
    const allProducts = JSON.parse(localStorage.getItem("allProducts"));
    const filteredResults = await allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("filtered", filteredResults);

    localStorage.setItem("filteredList", JSON.stringify(filteredResults));
    setSearchTerm("");
    navigate(`/products/searched/${searchTerm}`);
  }

  function toggleMenu() {
    setMobileMenu(true);
  }

  function closeMenu() {
    setMobileMenu(false);
  }

  function handleClickOutside(e) {
    if (setMobileMenu && !e.target.classList.contains("hamburgerMenu")) {
      closeMenu();
    }
  }

  return (
    <>
      <div className="navBarContainer" onClick={handleClickOutside}>
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
                    Logged In: {localStorage.getItem("username")}
                  </h3>
                ) : (
                  <Link to="/login">
                    <h3>
                      <button>Login</button>
                    </h3>
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
                  <h3>
                    <button>Cart</button>
                  </h3>
                </Link>
              </div>
            </div>
          </div>
          <div className="storeNavigation">
            <div className={`hamburgerMenu`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="navigateBtns">
              <ul className={`buttons ${mobileMenu ? "active" : "unactive"}`}>
                <li key={"mensItems"}>
                  <div className="shopCategory mensBtn" onClick={closeMenu}>
                    <Link to="/products/men's clothing">
                      <h2>Men</h2>
                    </Link>
                  </div>
                </li>
                <li key={"womensItems"}>
                  <div className="shopCategory womensBtn" onClick={closeMenu}>
                    <Link to="/products/women's clothing">
                      <h2>Women</h2>
                    </Link>
                  </div>
                </li>
                <li key={"jeweleryItems"}>
                  <div className="shopCategory jeweleryBtn" onClick={closeMenu}>
                    <Link to="/products/jewelery">
                      <h2>Jewlery</h2>
                    </Link>
                  </div>
                </li>
                <li key={"electronicsItems"}>
                  <div
                    className="shopCategory electronicsBtn"
                    onClick={closeMenu}
                  >
                    <Link to="/products/electronics">
                      <h2>Electronics</h2>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="extraShopContainer">
              <form className="searchBarContainer" onSubmit={handleSearch}>
                <input
                  className="searchBar"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
