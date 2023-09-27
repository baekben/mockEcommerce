import { useState, useEffect } from "react";
import { userLogin } from "../api/login";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/user";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function grabUsers() {
      const currentUsers = JSON.parse(localStorage.getItem("apiUsers"));
      if (currentUsers === null) {
        const users = await getUsers();
        setAllUsers(users);
        localStorage.setItem("apiUsers", JSON.stringify(users));
      } else {
        setAllUsers(currentUsers);
      }
    }
    grabUsers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let response = await userLogin(username, password);
      const user = allUsers.find(
        (user) => user.username === username && user.password === password
      );
      console.log(user);
      if (user) {
        console.log("userLogin", user.id);
        response ? response : (response = { token: "createdUser" });
        const userInfo = JSON.stringify({
          username: username,
          password: password,
          userToken: response.token,
          userId: user.id,
        });
        localStorage.setItem(`${username}-info`, userInfo);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userId", user.id);
        navigate("/");
      } else {
        console.log("user does not exist");
        setError("User does not exist");
      }
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
