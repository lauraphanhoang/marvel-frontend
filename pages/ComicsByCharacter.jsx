import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import loading from "../src/assets/Avenger-Logo-No-Background.png";
import axios from "axios";

const ComicsByCharacter = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comics/${id}`
        );
        setData(response.data);
        console.log(response.data);
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
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt="image"
        />
      </div>
      {data.comics.map((comic) => {
        return (
          <>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt="image"
            />
            <h1 key={comic}>{comic.title}</h1>
            <p>{comic.description}</p>
            <p>{comic.title}</p>
          </>
        );
      })}
      ;
    </div>
  );
};

export default ComicsByCharacter;
