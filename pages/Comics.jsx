import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import sky from "../src/assets/night-sky.jpg";
import loading from "../src/assets/Avenger-Logo-No-Background.png";

const Comics = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics` + filters
        );
        setData(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [title]);

  return isLoading === true ? (
    <div className="container">
      <img className="loading" src={loading} alt="loading page" />{" "}
    </div>
  ) : (
    <div className="main">
      <div className="banniere-comics">
        <div className="title-comic">{/* <p>COMICS</p> */}</div>
        <div className="search">
          <input
            type="text"
            placeholder="search a comic"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="container-comics">
        <div className="all-comics">
          {data.results.map((comic) => {
            return (
              <Link key={comic._id} to={`/comic/${comic._id}`}>
                <div className="flip-card">
                  <div className="star-icon">
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      {comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                      comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708" ? (
                        <img className="no-image" src={sky} />
                      ) : (
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt="image"
                        />
                      )}
                    </div>
                    <div className="flip-card-back">
                      <h1>{comic.title}</h1>
                      <p>{comic.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
