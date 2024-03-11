import React from 'react';
import './VideoPopup.css';
import ReactPlayer from 'react-player/youtube';
import { IoClose } from "react-icons/io5";

const VideoPopup = ({show, setShow, videoId, setVideoId}) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    }
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
        <div className="opacityLayer" onClick={hidePopup}></div>
        <div className="videoPlayer">
            <span className="closeBtn" onClick={hidePopup}><IoClose/></span>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width='100%'
            height='100%'/>
        </div>
    </div>
  )
}

export default VideoPopup