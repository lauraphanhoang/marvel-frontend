import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import robot from "../src/assets/robot.webp";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(event);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email: email, password: password }
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
    <div className="container-login">
      <h1>LOGIN</h1>
      <div className="container-form">
        <form onSubmit={handleLogin}>
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
          <button className="button-login">LOGIN</button>
        </form>
      </div>
      <div className="link">
        <Link className="a" to="/user/signup">
          Create an account
        </Link>
      </div>
      <div>
        <img className="robot" src={robot} alt="robot" />
      </div>
    </div>
  );
};
export default Login;
