/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getProduct } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";
export default function Product() {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  useEffect(() => {
    async function getProductInfo() {
      const productInfo = await getProduct(productId);
      setProduct(productInfo);
    }
    getProductInfo();
  }, [productId]);

  async function handleClick(e) {
    e.preventDefault();
    navigate(`/products/${category}`);
  }

  async function addToCart(e) {
    e.preventDefault();
    console.log(`Adding ${product.title} with id ${productId} to cart`);
  }
  return (
    <>
      {product && (
        <div className="product-Container">
          <div className="titleContainer">
            <div className="productTitle">
              <h2>{product.title}</h2>
            </div>
          </div>
          <div className="productInfoContainer">
            <div className="productImgContainer">
              <div>
                <img src={product.image} alt="" className="product-Img" />
              </div>
            </div>
            <div className="productCostInfo">
              <div className="priceContainer">
                <h2>$ {product.price}</h2>
              </div>
              <div className="buttons">
                <div className="buttonsContainer">
                  <button onClick={handleClick}>
                    Go Back to {`${category}`} products
                  </button>
                </div>
                <div className="buttonsContainer">
                  <button type="button" onClick={addToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="productDescription">
            <div>{product.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
