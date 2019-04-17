import React, { Component } from 'react'

import Title from './components/Title'
import SearchBar from './components/SearchBar'
import VideoList from './containers/VideoList'
import Video from './components/Video'
import VideoDetails from './components/VideoDetails'

// axios permet de faire des requetes AJAX directement depuis un URL
import axios from 'axios'

import './style/style.css'


// Variable contenant les informations de l'api The Movie DB
const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?api_key=92dd02450f3a7e727e3e74d6319f20a7&language=fr-FR&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = "92dd02450f3a7e727e3e74d6319f20a7";
const DEFAULT_PARAM = "language=fr&include_adult=false";

class App extends Component {
  constructor(props) {
    super(props)
      this.state = ({
        movies: [],
        currentMovie: {},
        isSearch: false
      })
  }

  // Avant que le composant soit monté, je lance la fonction initMovies()
  componentWillMount () {
    this.initMovies();
  }

  // requete AJAX via axios, et je remplis mon state avec la réponse
  // movies => avec les meilleurs films du moment
  // currentMovie => avec le film du moment
  initMovies(){
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
      this.setState({
        // je slice dans le tableau de response pour ne garder dans mon state que les films 1, 2, 3, 4
        movies: response.data.results.slice(1, 5),
        // en revanche ici je ne garde que l'élément 0 de ma response
        currentMovie: response.data.results[0]
        // l'utilisation de cette fonction anonyme permet d'attendre que le state soit complétement remplit avant de lancer la fonction applyVideoToCurrentMovie()
      }, function() {
        this.applyVideoToCurrentMovie();
      });
    }.bind(this));
  }

  // Dans cette fonction je récupere la clé correspondant à la vidéo sur youtube
  // j'ajoute l'attribut videoId à mon state currentMovie
  // et le passe en props à mon composant <Video /> plus bas dans l'appli
  applyVideoToCurrentMovie(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?api_key=${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response){
      if(response.data.videos.results[0] && response.data.videos.results[0].key){
        // récuperation de la key pour la currentVideo
        const youtube_key = response.data.videos.results[0].key;
        let currentMovieWithVideo = this.state.currentMovie;
        // ajout de l'attribut videoId à currentMovieWithVideo, attribut qui contient ma clé youtube concernant la vidéo en question
        currentMovieWithVideo.videoId = youtube_key;
        // mise à jour de mon state, ce qui enchaine l'ajout de videoId à mon state currentMovie, je peux désormais l'utiliser dans d'autre composant
        this.setState({currentMovie: currentMovieWithVideo})
        // console.log(this.state.currentMovie)
      }
    }.bind(this));
  }

  // En récupérant les informations du composant enfant, je lui applique les deux fonctions suivante
  // applyToCurrentMovie() => pour mettre à jour la vidéo de bande annonce en fonction du film recherché
  // setRecommendation() => pour mettre à jour la liste des recommendations en fonction du film recherché
  callBackMovieClick(movie){
    this.setState({currentMovie:movie}, function(){
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }

  // requete AJAX qui cherche les films en fonction de l'input dans la searchBar
  searchMovie(textSearch){
    if(textSearch){
      axios.get(`${API_END_POINT}search/movie?api_key=${API_KEY}&${DEFAULT_PARAM}&query=${textSearch}`).then(function(response){
        // si on trouve des data
        if(response.data && response.data.results[0]){
          // si le film trouvé est différents de l'actuel
          if(response.data.results[0].id !== this.state.currentMovie.id){
            this.updateAfterSearch(response);
          }
        }
      }.bind(this));
    }
  }

  // Après la recherche, si le film est différents de l'actuel on met à jour le state currentMovie avec le premier élément de la response
  // un fois fait, et toujours à l'aide d'une fonction anonyme pour que les choses se fassent dans le bon ordre, on lance la fonction
  // applyVideoToCurrentMovie() => qui va permettre d'avoir la bande annonce du film en question
  // setRecommendation() => qui va permettre d'avoir 4 films en recommendation en fonction du film dans currentMovie
  updateAfterSearch(response){
    this.setState({currentMovie: response.data.results[0]}, () => {
      this.applyVideoToCurrentMovie();
      this.setRecommendation();
    });
  }

  // Avec cette requête Ajax, l'id de currentMovie va être utilisé pour accèder aux recommendations de l'API MovieDB
  setRecommendation(){
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?api_key=${API_KEY}&language=fr`).then(function(response){
      // si la response existe && qu'elle contient plus de 5 résultats
      if(response.data && response.data.results.length > 5){
        // je met à jour le state movie avec les 4 premières recommendations
        this.setState({movies: response.data.results.slice(1,5)});
      }
    }.bind(this))
  }

  shouldComponentUpdate(nextProps, nextState){
    if(!nextState.currentMovie.videoId){
      return false;
    } else {
      return true;
    }
  }

  render() {
    const renderMovieList = () => {
      if(!this.state.movies >= 4){return <div>Chargement</div>}
      return <VideoList movies={this.state.movies} callBackMovieClick={this.callBackMovieClick.bind(this)} />
    }

    const renderMovie = () => {
      // si videoId existe dans le state currentMovie
      if(this.state.currentMovie.videoId){
        return (<div><Video videoId={this.state.currentMovie.videoId} /><hr/><VideoDetails description={this.state.currentMovie.overview} title={this.state.currentMovie.title} /><hr/></div>)
      } else {
        return <div>Pas de donnée</div>
      }
    }

    return (
      <div>
        <Title />
        <div className="container-fluid">
          <div className="search_bar">
            <SearchBar callBackRequest={this.searchMovie.bind(this)} />
          </div>
          <div className="row">
            <div className="col-md-8">
              {renderMovie()}
            </div>
            <div className="col-md-4">
              {renderMovieList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
