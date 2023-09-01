const apiURL = "https://fakestoreapi.com/auth/login";

// user login
export async function userLogin(username, password) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error in login `, error);
  }
}
