import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import test from "./1.webp";
import test2 from "./2.gif";

function RandomButton() {
  const [showGif, setShowGif] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.get("http://localhost:3001/have-access", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setShowGif(true);
      setFetchTrigger((prevTrigger) => !prevTrigger);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      });
    }
  }

  return (
    <>
      <span
        onClick={handleSubmit}
        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 hover:cursor-pointer"
      >
        Random Gif
      </span>
      {showGif && <Gif fetchTrigger={fetchTrigger} />}
      <img
        src={test}
        alt="gif anime"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      />
      <img
        src={test2}
        alt="gif anime"
        style={{
          width: "5rem",
          height: "5rem",
        }}
      />
    </>
  );
}

function Gif({ fetchTrigger }) {
  const [data, setData] = useState("");

  const fetchDataFromApi = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3001/anime",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [fetchTrigger]);

  return (
    <>
      {data && (
        <img
          src={data}
          alt="gif anime"
          style={{
            width: "5rem",
            height: "5rem",
          }}
        />
      )}
    </>
  );
}

export default RandomButton;
