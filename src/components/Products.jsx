/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { specificProducts } from "../api/products";
import { Link, useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
export default function Products() {
  const { category, searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("desc");
  // true is high and false will be low
  const [priceOrder, setPriceOrder] = useState(true);
  const [ratingOrder, setRatingOrder] = useState(true);

  const [selected, setSelected] = useState(0);

  //const navigate = useNavigate();
  useEffect(() => {
    async function getProducts() {
      // sort is added with descending as default

      if (searchTerm !== undefined) {
        const filteredList = await JSON.parse(
          localStorage.getItem("filteredList")
        );
        setProducts(filteredList);
      } else {
        const encodedString = encodeURIComponent(category) + `?sort=${sort}`;
        const getProducts = await specificProducts(encodedString);
        localStorage.setItem("displayProducts", JSON.stringify(getProducts));
        setProducts(getProducts);
      }
    }
    getProducts();
  }, [category, sort, searchTerm]);

  // asending or descending order of products
  useEffect(() => {
    setSort("desc");
  }, [category]);

  async function updateSort(e) {
    e.preventDefault();
    if (sort == "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  }

  async function orderItems(filter, filterDos = null) {
    const displayProducts = await JSON.parse(
      localStorage.getItem("displayProducts")
    );
    let sortedProducts;
    if (filterDos === null) {
      setPriceOrder(!priceOrder);
      sortedProducts = displayProducts.sort((a, b) =>
        priceOrder ? a[filter] - b[filter] : b[filter] - a[filter]
      );
    } else {
      setRatingOrder(!ratingOrder);
      sortedProducts = displayProducts.sort((a, b) =>
        ratingOrder
          ? a[filter][filterDos] - b[filter][filterDos]
          : b[filter][filterDos] - a[filter][filterDos]
      );
    }

    localStorage.setItem("displayProducts", JSON.stringify(sortedProducts));
    setProducts(sortedProducts);
    console.log("Products", products);
  }

  function handleSelected(index) {
    // update to selected choice on filters
    setSelected(index);
  }

  return (
    <>
      <div className="productsContainer">
        <div className="filterMenu">
          <div className="filterMenuContainer">
            <h1>{category.toUpperCase()}</h1>
            <div className="filterContainer">
              <h3>Filters</h3>
              <ul className="options">
                <li
                  key={0}
                  onClick={() => handleSelected(0)}
                  className={
                    0 === selected
                      ? "filterOption nameOrder selected"
                      : "filterOption nameOrder unselected"
                  }
                >
                  <a href="#" onClick={updateSort}>
                    {sort === "desc" ? (
                      <>
                        <p>↑ Z-A</p>
                      </>
                    ) : (
                      <>
                        <p>↓ A-Z</p>
                      </>
                    )}
                  </a>
                </li>
                <li
                  key={1}
                  onClick={() => handleSelected(1)}
                  className={
                    1 === selected
                      ? "filterOption priceOrder selected"
                      : "filterOption priceOrder unselected"
                  }
                >
                  <a
                    href="#priceSort"
                    onClick={() => {
                      orderItems("price");
                    }}
                  >
                    <p>{priceOrder ? <>$$$-$</> : <>$-$$$</>}</p>
                  </a>
                </li>
                <li
                  key={2}
                  onClick={() => handleSelected(2)}
                  className={
                    2 === selected
                      ? "filterOption ratingOrder selected"
                      : "filterOption ratingOrder unselected"
                  }
                >
                  <a
                    href="#ratingSort"
                    onClick={() => {
                      orderItems("rating", "rate");
                    }}
                  >
                    <p>
                      Rating:{" "}
                      {ratingOrder ? <>High to Low</> : <>Low to High</>}
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="productsList">
          {products.length > 0 && products !== null ? (
            products.map((product) => {
              return (
                <>
                  <div className="productContainer" key={product.id}>
                    <div className="productImgItem">
                      <Link to={`/products/${category}/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="productImg"
                          // onClick={() => {
                          //   navigate(`/product/${product.id}`);
                          // }}
                        />
                      </Link>
                    </div>
                    <div>
                      <p>{product.title}</p>
                      <p>${product.price.toFixed(2)}</p>
                      <p>
                        Rating: {product.rating.rate}/5{" "}
                        {`(${product.rating.count})`}
                      </p>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
