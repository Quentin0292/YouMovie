import React from 'react'
import VideoListItem from '../components/VideoListItem'

const VideoList = (props) => {
  function callBackMovieClick(movie) {
    props.callBackMovieClick(movie)
  }

  return (
    <div>
      <ul className="list-group">
        {props.movies.map(movie => {
            return <div><VideoListItem key={movie.id} movie={movie}  callBackMovieClick={callBackMovieClick}/><hr/></div>
          })}
      </ul>
    </div>
  )
}

export default VideoList
