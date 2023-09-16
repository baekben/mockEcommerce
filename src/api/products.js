const apiURL = "https://fakestoreapi.com/products";

// ************* PRODUCTS ****************** //

// get all products
export async function getAllProducts() {
  try {
    const response = await fetch(`${apiURL}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getting all products ", error);
  }
}

// get a single product by id
export async function getProduct(id) {
  try {
    const response = await fetch(`${apiURL}/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in getting product ", error);
  }
}

// sorting product results
// default is ascending
// desc for descending
// asc for ascending
export async function sortProducts(sortType) {
  try {
    const response = await fetch(`${apiURL}?sort=${sortType}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in sorting products ", error);
  }
}

// get products in a specific category
export async function specificProducts(category) {
  try {
    const response = await fetch(`${apiURL}/category/${category}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(
      `Error in getting products in the category ${category}`,
      error
    );
  }
}
