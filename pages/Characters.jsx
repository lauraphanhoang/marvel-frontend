import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sky from "../src/assets/night-sky.jpg";
import loading from "../src/assets/Avenger-Logo-No-Background.png";

const Characters = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (name) {
          filters += "?name=" + name;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/characters` + filters
        );
        setData(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name]);

  return isLoading === true ? (
    <div className="container">
      <img className="loading" src={loading} alt="loading page" />{" "}
    </div>
  ) : (
    <>
      <div className="banniere-characters">
        <div className="title-character">
          <p>CHARACTERS</p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="search a character"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="container-characters">
        {data.results.map((character) => {
          return (
            <div key={character._id} className="character">
              <div className="star-icon">
                <i className="fa-regular fa-star"></i>
              </div>
              <div className="character-1">
                <Link to={`/character/${character._id}`}>
                  <div className="characters-images">
                    {character.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                    character.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                      <img src={sky} />
                    ) : (
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt="image"
                      />
                    )}
                  </div>
                  <div className="test">
                    <h1>{character.name}</h1>
                    <p>{character.description}</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Characters;
