import React from 'react'

const VideoDetails = ({ title, description}) => {
  return (
    <div>
        <h1 className="h1">{title}</h1>
        <p className="lead">{description}</p>
    </div>
  )
}

export default VideoDetails
