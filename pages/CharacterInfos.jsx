import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sky from "../src/assets/night-sky.jpg";
import loading from "../src/assets/Avenger-Logo-No-Background.png";

const CharacterInfos = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/character/${id}`
        );
        const responseBis = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics/${id}`
        );
        setData(response.data);
        setData(responseBis.data);
        // console.log(response.data);
        // console.log(responseBis.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading === true ? (
    <div className="container">
      <img className="loading" src={loading} alt="loading page" />{" "}
    </div>
  ) : (
    <div className="container">
      <div className="container-character">
        <div className="character-infos">
          {data.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
          data.thumbnail.path ===
            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
            <img src={sky} />
          ) : (
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt="image"
            />
          )}

          <div>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
        </div>

        <div className="comics">
          {data.comics.map((comic, index) => {
            return (
              <div key={index} className="comics-infos">
                <Link to={`/comic/${comic._id}`}>
                  {comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                  comic.thumbnail.path ===
                    "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                    <img src={sky} />
                  ) : (
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt="image"
                    />
                  )}
                  <div className="infos">
                    <h1>{comic.title}</h1>
                    <p>{comic.description}</p>
                    <p>{comic.title}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterInfos;
