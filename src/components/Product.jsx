/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getProduct } from "../api/products";
import { useNavigate, useParams } from "react-router-dom";
import { addNewItems } from "../api/cart";
export default function Product() {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [userId, setUserId] = useState();
  const [quantity, setQuantity] = useState(1);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  useEffect(() => {
    async function getProductInfo() {
      const productInfo = await getProduct(productId);
      setProduct(productInfo);

      setUserId(localStorage.getItem("userId"));
    }
    getProductInfo();
  }, [productId, category]);

  async function handleClick(e) {
    e.preventDefault();
    navigate(`/products/${category}`);
  }

  async function addToCart(e) {
    e.preventDefault();

    if (localStorage.getItem("loggedIn") !== "guest") {
      console.log(
        `Adding ${quantity} ${product.title} with id ${productId} to cart...`
      );
      await addNewItems(userId, date, {
        productId: productId,
        quantity: quantity,
      });
    } else {
      let userCart = JSON.parse(localStorage.getItem("cart"));
      if (userCart.length === 0) {
        userCart = [
          {
            title: product.title,
            productId: productId,
            quantity: quantity,
            price: product.price,
          },
        ];
      } else {
        const itemExists = userCart.find(
          (item) => item.title === product.title
        );
        console.log(itemExists);

        if (itemExists !== undefined) {
          const index = userCart.indexOf(itemExists);
          userCart[index].quantity++;
        } else {
          userCart.push({
            title: product.title,
            productId: productId,
            quantity: quantity,
            price: product.price,
          });
        }
      }
      userCart = JSON.stringify(userCart);
      localStorage.setItem("userCart", userCart);
    }
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
                <h2 className="itemPrice">$ {product.price}</h2>
              </div>
              <div className="quantityInput">
                <button
                  onClick={() => {
                    setQuantity((quantity) => quantity - 1);
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(parseInt(e.target.value) || 1);
                  }}
                />
                <button
                  onClick={() => {
                    setQuantity((quantity) => quantity + 1);
                  }}
                >
                  +
                </button>
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
              <div className="productDescription">
                <div>{product.description}</div>
              </div>
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
}
