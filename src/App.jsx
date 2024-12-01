import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cookies from "js-cookie";
import "./App.css";

// Pages
import Comics from "../pages/Comics";
import ComicInfos from "../pages/ComicInfos";
import ComicsByCharacter from "../pages/ComicsByCharacter";
import Characters from "../pages/Characters";
import CharacterInfo from "../pages/CharacterInfos";
import Favoris from "../pages/Favoris";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/comic/:id" element={<ComicInfos />}></Route>
          <Route path="/comics/:id" element={<ComicsByCharacter />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
          <Route path="/character/:id" element={<CharacterInfo />}></Route>
          <Route path="/favoris" element={<Favoris />}></Route>
          <Route
            path="/user/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          ></Route>
          <Route
            path="/user/signup"
            element={
              <Signup
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          ></Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
