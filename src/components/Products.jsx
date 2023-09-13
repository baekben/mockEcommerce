/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { specificProducts } from "../api/products";
export default function Products({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(category);
    async function getProducts() {
      const encodedString = encodeURIComponent(category);
      console.log(encodedString);
      const getProducts = await specificProducts(encodedString);
      setProducts(getProducts);
    }
    getProducts();
  }, [category]);
  console.log(products);
  return (
    <>
      <div className="productsContainer">
        <div className="filterMenu">
          <div className="filtersContainer">
            <h2>{category.toUpperCase()}</h2>
            <div className="filters">
              <ul>
                <li>
                  <a href="#">Filter1</a>
                </li>
                <li>
                  <a href="#">Filter2</a>
                </li>
                <li>
                  <a href="#">Filter3</a>
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
