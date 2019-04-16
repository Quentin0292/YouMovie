import React from 'react'
const BASE_URL="https://youtube.com/embed/";

const Video = ({ videoId }) => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe title={videoId} className="embed-responsive-item" src={`${BASE_URL}${videoId}`}></iframe>
    </div>
  )
}

export default Video
