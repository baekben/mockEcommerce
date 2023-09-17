/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { specificProducts } from "../api/products";
import { Link, useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("desc");

  //const navigate = useNavigate();
  useEffect(() => {
    async function getProducts() {
      // sort is added with descending as default
      const encodedString = encodeURIComponent(category) + `?sort=${sort}`;
      const getProducts = await specificProducts(encodedString);
      setProducts(getProducts);
    }
    getProducts();
  }, [category, sort]);

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

  return (
    <>
      <div className="productsContainer">
        <div className="filterMenu">
          <div className="filterMenuContainer">
            <h2>{category.toUpperCase()}</h2>
            <div className="filterContainer">
              <ul className="options">
                <li>
                  <a href="#" onClick={updateSort}>
                    {sort === "desc" ? (
                      <>
                        <p>↑ A-Z</p>
                      </>
                    ) : (
                      <>
                        <p>↓ Z-A</p>
                      </>
                    )}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p>Price</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="productsList">
          {products.length > 0 ? (
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
