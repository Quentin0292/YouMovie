import React from 'react'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/"

const VideoListItem =  (props) => {
  function handleClick(){
    props.callBackMovieClick(props.movie);
  }

  return (
    <div onClick={handleClick.bind(this)}>
      <li className="list-group-item">
        <div className="media">
          <div className="media-left">
            <img className="media-object img-rounded" height="150px" width="120px" src={`${IMAGE_BASE_URL}${props.movie.poster_path}`} alt=""/>
          </div>
          <div className="media-body">
            <h5 className="title_list_item">{ props.movie.title }</h5>
          </div>
        </div>
      </li>
    </div>
  )
}

export default VideoListItem
