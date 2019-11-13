import React from "react";
import "../App.scss";

const Video = (props) => {
  return (
    <iframe
      title="Clip"
      width="560"
      height="315"
      src={props.link}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default Video;
