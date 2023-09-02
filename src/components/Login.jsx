import { useState } from "react";
import { userLogin } from "../api/login";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    // try {
    //   const response = await fetch("https://fakestoreapi.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json", Accept: "*/*" }, //why does this need to be here?
    //     body: JSON.stringify({
    //       username: username,
    //       password: password,
    //     }),
    //   });
    //   const result = await response.json();
    //   console.log(result);
    //   navigate("/");
    // } catch (error) {
    //   console.error(`Error in login `, error);
    //   setError(error.message);
    // }
    try {
      const response = await userLogin(username, password);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.error("Error", error);
      setError("Login error");
    }
  }
  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <div className="loginTitle">
            <h2>Login</h2>
          </div>
          <div className="loginArea">
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type="text"
                  className="username"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </label>
              <label>
                <input
                  type="text"
                  className="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
              <button>Submit</button>
            </form>
          </div>
          {error && <p>{error}</p>}
        </div>
        <div className="signUpBox">
          <div className="signUpTitle"></div>
          <div className="joinArea"></div>
        </div>
      </div>
    </>
  );
}
