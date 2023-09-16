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
  return (
    <>
      {product && (
        <div>
          <div>
            <div>Product Name {product.id}</div>
          </div>
          <div>
            <div>
              Product Image <img src={product.image} alt="" />
            </div>
          </div>
          <div>
            <div>Description{product.description}</div>
          </div>
          <div>
            <div>
              <button onClick={handleClick}>
                Go Back to {`${category}`} Products
              </button>
            </div>
            <div>Add to Cart</div>
          </div>
        </div>
      )}
    </>
  );
}
