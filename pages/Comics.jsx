import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <p>Loading...</p>
  ) : (
    <>
      <div className="container-comics">
        <div className="search">
          <input
            type="text"
            placeholder="Rechercher des articles ?"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="container-comics">
        <div className="container-comics-1">
          {data.results.map((comic) => {
            return (
              <div className="all-comics" key={comic._id}>
                <div className="star-icon">
                  <i className="fa-regular fa-star"></i>
                </div>
                <Link to={`/comic/${comic._id}`}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt="image"
                  />
                  <div className="">
                    <h1>{comic.title}</h1>
                    <p>{comic.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comics;
