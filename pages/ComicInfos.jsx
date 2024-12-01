import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import loading from "../src/assets/Avenger-Logo-No-Background.png";

const ComicInfos = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comic/${id}`
        );
        setData(response.data);
        // console.log(response.data);
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
    <>
      <div className="container-comic">
        <div className="left">
          <img
            className="comic"
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt="image"
          />
        </div>
        <div className="right">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
};

export default ComicInfos;
