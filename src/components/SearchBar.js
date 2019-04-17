import React, { Component } from 'react'

export default class SearchBar extends Component {
  // le constructor permet d'initialiser le state à la première étape du cycle de vie de notre composant
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      intervalBeforeRequest: 10000,
      lockRequestCall: false
    }
  }

  // A chaque valeur tapé dans l'input on capture cette valeur pour l'enregistrer dans le state searchText
  handleChange = event => {
    this.setState({searchText: event.target.value})
    if(!this.state.lockRequestCall){
      this.setState({lockRequestCall: true})
      setTimeout(function(){ this.search(this.state.searchText) }.bind(this), this.setState.intervalBeforeRequest);
    }
  }

  // utilisation de la fonction searchMovie() qui provient de mon composant App()
  // cette fonction utilisé en callback permet de renvoyer le resultat de la recherche dans le sens inverse
  // du composant enfant (SearchBar) au composant parent (App)
  search(inputText){
    this.setState({lockRequestCall: false});
    this.props.callBackRequest(inputText)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input onKeyUp={this.handleChange} type="text" className="form-control input-lg" placeholder="Recherchez un film..." onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}
