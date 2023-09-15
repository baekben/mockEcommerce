/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { specificProducts } from "../api/products";
export default function Products({ category }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("desc");
  useEffect(() => {
    console.log(category);

    async function getProducts() {
      // sort is added with descending as default
      const encodedString = encodeURIComponent(category) + `?sort=${sort}`;
      console.log(encodedString);
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

  console.log(products);
  return (
    <>
      <div className="productsContainer">
        <div className="filterMenu">
          <div className="filterMenuContainer">
            <h2>{category.toUpperCase()}</h2>
            <div className="filterContainer">
              <ul>
                <li>
                  <a href="#" onClick={updateSort}>
                    Sort: {sort}
                  </a>
                </li>
                <li>
                  <a href="#">Price</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="productsList">
          {products.map((product) => {
            return (
              <>
                <div className="productContainer" key={product.id}>
                  <div className="productImgItem">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="productImg"
                    />
                  </div>

                  <div>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
