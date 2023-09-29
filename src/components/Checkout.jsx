import { useEffect, useState } from "react";
export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [purchased, setPurchased] = useState(false);
  useEffect(() => {
    async function getCart() {
      const cart = JSON.parse(localStorage.getItem("cart"));
      setCartItems(cart);
    }
    getCart();
  });

  function changeQuantity(index, amount) {
    const updatedItems = [...cartItems];
    const updatedItem = { ...updatedItems[index] };
    updatedItem.quantity = updatedItem.quantity + amount;
    updatedItems[index] = updatedItem;
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  }

  function payItems() {
    console.log("items purchased");
    setPurchased(true);
  }
  return (
    <>
      <div className="checkOutPage">
        <div className="checkoutContainer">
          <h1>Checkout</h1>
          <div className="itemsToCheckOut">
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
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                      return (
                        <>
                          <tr key={item.id + " cart item"}>
                            <td>
                              <h2>{item.title}</h2>
                            </td>
                            <td>
                              <h2>
                                <button
                                  onClick={() => {
                                    changeQuantity(index, -1);
                                  }}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    changeQuantity(index, e.target.value);
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    changeQuantity(index, 1);
                                  }}
                                >
                                  +
                                </button>
                              </h2>
                            </td>
                            <td>
                              <h2>${item.itemTotal}</h2>
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
          <div className="userPayment">
            <form onSubmit={payItems}>
              <div className="payButton">
                <label>
                  <input type="text" placeholder="name" />
                </label>
                <label>
                  <input type="text" placeholder="Card Info" />
                </label>
                <button>Purchase</button>
              </div>
            </form>
            {purchased && (
              <>
                <p>Thank you for purchasing</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
