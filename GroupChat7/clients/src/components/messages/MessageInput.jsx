import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import GifSubmits from "../GifSubmits";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const handleGifSubmit = (gifMessage) => {
    // Concatenate the selected GIF message with the existing message
    const fullMessage = `${message} ${gifMessage}`;
    setMessage(fullMessage.trim()); // Trim to remove extra spaces
    handleSubmit(e); // Submit the combined message
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>{" "}
      </div>
      {/* Button to open the modal */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Select GIF
      </button>
      {/* Include the GifSubmits component */}
      <GifSubmits onSubmit={handleGifSubmit} />
    </form>
  );
};

export default MessageInput;
