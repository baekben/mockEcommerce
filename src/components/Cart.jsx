import { useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { getProduct } from "../api/products";
export default function Cart() {
  const [cart, setCart] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  // placeholding cart
  useEffect(() => {
    async function getUserCart(userId) {
      const cartItems = await getCart(userId);
      const cartProducts = cartItems.products;
      let total = 0;
      for (let index in cartProducts) {
        const productObj = cartProducts[index];
        const product = await getProduct(productObj.productId);
        productObj.productInfo = product;
        const itemTotal = product.price * productObj.quantity;
        productObj.itemTotal = itemTotal;
        total = total + itemTotal;
      }
      setTotalCost(total);
      setCart(cartProducts);
    }
    const userId = localStorage.getItem("userId");
    getUserCart(userId);
  }, []);

  //   async function getCartProduct(item) {
  //     console.log(item);
  //     const productName = await getProduct(item.productId);
  //     return (
  //       <>
  //         <tr className={item.id}>
  //           <td>{productName}</td>
  //           <td>{item.quantity}</td>
  //         </tr>
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="cartContainer">
        <div className="listCart">
          <div>
            <h1>Cart</h1>
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
                          <td>Delete</td>
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
            <button>checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
