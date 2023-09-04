import { useState } from "react";
import { addUser } from "../api/user";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    addressNum: "",
    city: "",
    zipcode: "",
    phone: "",
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const newUser = await addUser(email, username, password, userInfo);
        if (newUser) {
          navigate("/login");
        }
      } else {
        setCheckPassword(false);
      }
    } catch (error) {
      console.error(`Error in adding user ${username} `, error);
    }
  }
  return (
    <>
      <div className="signUpContainer">
        <div className="title">
          <h2>Sign Up</h2>
        </div>
        <div className="signUpFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="userInfo">
              <label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </label>
              <br />
              <br />
              <label>
                <input
                  type="text"
                  placeholder="Street Address"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      address: e.target.value,
                    }));
                  }}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      addressNum: e.target.value,
                    }));
                  }}
                />
              </label>
              <br />
              <label>
                <input
                  type="text"
                  placeholder="Zipcode"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      zipcode: e.target.value,
                    }));
                  }}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setUserInfo((currentInfo) => ({
                      ...currentInfo,
                      phone: e.target.value,
                    }));
                  }}
                />
              </label>
            </div>
            <br />
            <label>
              <input
                type="text"
                placeholder="Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <br />
            <br />
            <label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <label>
              <br />
              <input
                type="text"
                placeholder="Re-enter Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </label>
            <br />
            {checkPassword ? null : <p>Passwords do not match!</p>}
            <br />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
