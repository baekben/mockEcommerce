import { useEffect, useState } from "react";
import { getCart } from "../api/cart";
import { getProduct } from "../api/products";
export default function Cart() {
  const [cart, setCart] = useState({});
  // placeholding cart
  const userId = 5;
  useEffect(() => {
    async function getUserCart(userId) {
      const cartItems = await getCart(userId);
      console.log(cartItems);
      const cartProducts = cartItems.products;
      console.log("cartProducts", cartProducts[0]);
      for (let index in cartProducts) {
        const product = cartProducts[index];
        const productName = await getProduct(product.productId);
        product.productName = productName;
      }
      setCart(cartProducts);
    }
    getUserCart(userId);
  }, [userId]);

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
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cart.length > 0 ? (
                  cart.map((item) => {
                    return (
                      <>
                        <tr key={item.id}>
                          <td>{item.productName.title}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <tr className="noItems">
                      <td>No Products</td>
                      <td>N/A</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="orderSummary">
          <div>
            <h2>Summary</h2>
          </div>
          <div className="costPreview">
            <div></div>
          </div>
          <div className="checkoutBtnContainer">
            <button>checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
