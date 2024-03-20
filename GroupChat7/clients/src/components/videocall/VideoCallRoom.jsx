import React from "react";
import { useParams, Link } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCallRoom = () => {
  const { roomId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1735794576;
    const serverSecret = "65d6d28da81150813b8ab876843eb43a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "videocall"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({
        container: element,
        sharedLinks: [
        {
            name: "Copy Link",
            url: `http://localhost:3000/room/${roomId}`
        }
    ],
        scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
    })
  };

  return (
    <>
    <div>
        <div ref={myMeeting}/>
    </div>
    <div>
        <Link to={"/"}>HOME</Link>
    </div>
    </>
  );
};

export default VideoCallRoom;
