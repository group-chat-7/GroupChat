import React, { useState } from "react";
import test from "./gifs/1.webp";
import test2 from "./gifs/2.gif";

function GifSubmits({ onSubmit }) {
  const [selectedGif, setSelectedGif] = useState(null);

  const handleGifSelect = (gifName) => {
    setSelectedGif(gifName);
  };

  const handleGifSubmit = () => {
    if (selectedGif) {
      // Concatenate the message with the selected GIF
      const messageWithGif = `(gif) ${selectedGif}`;
      onSubmit(messageWithGif);
      // Clear the selected GIF after submission
      setSelectedGif(null);
      // Close the modal
      document.getElementById("my_modal_1").close();
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Select a GIF</h3>
        <div className="gif-container">
          <img
            src={test}
            alt="GIF 1"
            onClick={() => handleGifSelect("1.webp")}
          />
          <img
            src={test2}
            alt="GIF 2"
            onClick={() => handleGifSelect("2.gif")}
          />
          {/* Add more GIF options as needed */}
        </div>
        <div className="modal-action">
          <button className="btn" onClick={handleGifSubmit}>
            Submit GIF
          </button>
          {/* Button to close the modal */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_1").close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default GifSubmits;
