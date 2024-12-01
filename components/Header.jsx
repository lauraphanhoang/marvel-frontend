import { Link, useNavigate } from "react-router-dom";
import logo from "../src/assets/marvel-logo-bnw.png";
import avengers from "../src/assets/avengers-icons.jpg";
import Cookies from "js-cookie";

const Header = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo Marvel" />
        </Link>
      </div>
      <nav className="container-menu">
        <div className="menu">
          <button onClick={() => navigate("/characters")}>CHARACTERS</button>
          <button onClick={() => navigate("/comics")}>COMICS</button>
          <button onClick={() => navigate("/favoris")}>FAVORIS</button>
        </div>
        <div>
          {token ? (
            <button
              className="deconnexion"
              onClick={() => {
                Cookies.remove("token");
                setIsAuthenticated(false);
                navigate("/");
              }}
            >
              DECONNEXION
            </button>
          ) : (
            <div className="login-signup">
              <button onClick={() => navigate("/user/signup")}>SIGN UP</button>
              <button onClick={() => navigate("/user/login")}>LOGIN</button>
              <img className="avengers" src={avengers} alt="avengers icon" />
            </div>
          )}
        </div>
        <div></div>
      </nav>
    </header>
  );
};

export default Header;
