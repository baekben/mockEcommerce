const apiURL = "https://fakestoreapi.com/carts";

// *************** CART *********************\\
//
// get all carts
export async function getAllCarts() {
  try {
    const response = await fetch(`${apiURL}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getting all carts ", error);
  }
}

// get single cart by id
export async function getCart(id) {
  try {
    const response = await fetch(`${apiURL}/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in getting cart ${id}`, error);
  }
}

// limit the number of carts shown
export async function limitCarts(amount) {
  try {
    const response = await fetch(`${apiURL}?limit=${amount}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in showing less than ${amount} carts `, error);
  }
}

// sort carts based on id
// ascending or descending
export async function sortCarts(method) {
  try {
    const response = await fetch(`${apiURL}?sort=${method}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in sorting carts `, error);
  }
}

// get carts in a date range
// if startDate is empty then it will start from beginning of time
// if endDate is empty then it will fetch till now
export async function getCartsByDate(startDate = "", endDate = "") {
  try {
    const response = await fetch(
      `${apiURL}?startdate=${startDate}enddate=${endDate}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getting carts in the date range ", error);
  }
}

// get user's cart
export async function getUserCart(id) {
  try {
    const response = await fetch(`${apiURL}/user/2`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in getting user ${id} cart `, error);
  }
}

// add a new product to a cart
// products array will need {productId and quantity}
export async function addNewItems(userId, date, products) {
  try {
    const response = await fetch(`${apiURL}`, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        date: date,
        products: products,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error adding item(s)`, error);
  }
}

// update a cart
export async function updateProduct(cartId, userId, date, products) {
  try {
    let method = "PUT";
    if (getCart(cartId)) {
      method = "PATCH";
    }
    const response = await fetch(`${apiURL}/${cartId}`, {
      method: method,
      body: JSON.stringify({
        userId: userId,
        date: date,
        products: products,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in updating cart with product`, error);
  }
}

// delete a cart
export async function deleteCart(cartId) {
  try {
    const response = await fetch(`${apiURL}/${cartId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in deleting cart", error);
  }
}
