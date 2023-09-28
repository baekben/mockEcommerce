import { useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { getProduct } from "../api/products";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  // placeholding cart
  useEffect(() => {
    async function getUserCart(userId) {
      const loggedIn = localStorage.getItem("loggedIn");
      const userToken = localStorage.getItem("userToken");
      if (loggedIn !== "guest" && userToken !== "createdUser") {
        const cartItems = await getCart(userId);
        const cartProducts = cartItems.products;
        await itemsInCart(cartProducts);
      } else {
        // if user is not logged in then the cart should be from localstorage

        const cartItems = JSON.parse(localStorage.getItem("userCart"));

        const cartProducts = cartItems === null ? [] : cartItems;
        await itemsInCart(cartProducts);
      }
    }
    const userId = localStorage.getItem("userId");
    getUserCart(userId);
  }, []);

  async function itemsInCart(cartProducts) {
    let total = 0;
    if (cartProducts.length > 0) {
      for (let index in cartProducts) {
        const productObj = cartProducts[index];
        console.log(productObj);
        const product = await getProduct(productObj.productId);
        productObj.productInfo = product;
        const itemTotal = product.price * productObj.quantity;
        productObj.itemTotal = itemTotal;
        total = total + itemTotal;
      }
      console.log(cartProducts);
    } else {
      cartProducts = [];
    }
    setTotalCost(total);
    setCart(cartProducts);
  }

  function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
    setTotalCost(0);
  }

  function deleteItem(itemTitle) {
    let itemToDelete = cart.filter((item) => item.title === itemTitle);
    let newCart = cart.filter((item) => item.title !== itemTitle);
    setCart(newCart);
    const newTotal = totalCost - itemToDelete.itemTotal;
    console.log("newTotal");
    setTotalCost(newTotal);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <>
      <div className="cartContainer">
        <div className="listCart">
          <div>
            <h1>Cart</h1>
            <div className="clearCartBtn">
              <button onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
          <div className="cartItems">
            <table className="items">
              <thead>
                <tr>
                  <th>
                    <h2>Product</h2>
                  </th>
                  <th>
                    <h2>Quantity</h2>
                  </th>
                  <th>
                    <h2>Cost</h2>
                  </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item) => {
                    return (
                      <>
                        <tr key={item.id + " cart item"}>
                          <td>
                            <h2>{item.productInfo.title}</h2>
                          </td>
                          <td>
                            <h2>{item.quantity}</h2>
                          </td>
                          <td>
                            <h2>${item.itemTotal}</h2>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                deleteItem(item.productInfo.title);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <tr className="noItems">
                      <td>No Products</td>
                      <td>N/A</td>
                      <td>0</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="orderSummary">
          <div>
            <h1>Summary</h1>
          </div>
          <div className="costPreview">
            <div>
              <div>
                <p>
                  Total: <b>${totalCost}</b>
                </p>
              </div>
              {/* <div>
                <p>Total ahhh</p>
              </div> */}
            </div>
          </div>
          <div className="checkoutBtnContainer">
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
