import React, { useState, useCallback } from "react";
import { IoVideocamOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"

const VideoCallButton = () => {
  const [value, setValue] = useState();

  const navigate = useNavigate()

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`)
  }, [navigate, value])

  return (
    <div className="relative h-32 w-32">
      <div className="absolute inset-y-0 right-0 w-16">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter room code"
        />
        <button onClick={handleJoinRoom}>
          <IoVideocamOutline />
        </button>
      </div>
    </div>
  );
};

export default VideoCallButton;
