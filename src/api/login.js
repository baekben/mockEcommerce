const apiURL = "https://fakestoreapi.com/auth/login";

// user login
export const userLogin = async (username, password) => {
  try {
    const response = await fetch(`${apiURL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*/*" }, //why does this need to be here?
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
