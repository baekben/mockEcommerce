import { useState } from "react";
import { userLogin } from "../api/login";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

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
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userToken", response.token);
      // need user id?
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
      setError("Login error");
    }
  }

  async function openSignUpForm(e) {
    e.preventDefault();
    navigate("/signUp");
  }

  return (
    <>
      <div className="userSignInContainer">
        <div className="loginBox">
          <div className="loginTitle">
            <h2>Login</h2>
          </div>
          <div className="loginArea">
            <form onSubmit={handleSubmit} className="loginForm">
              <div className="formItem">
                <label>
                  <input
                    type="text"
                    className="username"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="formItem">
                <label>
                  <input
                    type={visible ? "text" : "password"}
                    className="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
                <div>
                  <button
                    type="button"
                    className="passwordView"
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    {visible ? "Hide Password" : "Show Password"}
                  </button>
                </div>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
          {error && <p>{error}</p>}
        </div>
        <div className="signUpBox">
          <div className="signUpTitle">
            <h2>Sign Up</h2>
          </div>
          <div className="joinArea">
            <button onClick={openSignUpForm}>Join Here</button>
          </div>
        </div>
      </div>
    </>
  );
}
