import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import spiderman from "../src/assets/spiderman.webp";

const Signup = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    // console.log(event);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signup`,
        {
          email: email,
          username: username,
          password: password,
        }
      );
      // console.log(response.data);
      Cookies.set("token", response.data.token, { expires: 15 });
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-signup">
      <h1>SIGN UP</h1>
      <div className="form">
        <div className="signup-left">
          <div className="container-form">
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button className="button-signup">SIGN UP</button>
            </form>
          </div>

          <div className="link">
            <Link className="a" to="/user/login">
              You already have an account ? Login !
            </Link>
          </div>
        </div>
        <div>
          <img className="spiderman" src={spiderman} alt="spiderman" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
