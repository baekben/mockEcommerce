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
      <div className="products container">
        <div className="filterMenu">
          <div className="filters">FILTER MENU</div>
        </div>
        <div className="productsList">
          {products.map((product) => {
            return (
              <>
                <div className="productContainer" key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.price}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
