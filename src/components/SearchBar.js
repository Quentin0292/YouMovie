import React, { Component } from 'react'

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: "",
      intervalBeforeRequest: 3000,
      lockRequestCall: false
    }
  }

  handleChange = event => {
    this.setState({searchText: event.target.value})
    if(!this.state.lockRequestCall){
      this.setState({lockRequestCall: true})
      setTimeout(function(){ this.search(this.state.searchText) }.bind(this), this.setState.intervalBeforeRequest);
    }
  }

  search(inputText){
    this.setState({lockRequestCall: false});
    this.props.callBackRequest(inputText)
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 input-group">
          <input onKeyUp={this.handleChange} type="text" className="form-control input-lg" placeholder="Recherchez un film..." onChange={this.handleChange} />
          <span className="input-group-btn">
            <button className="btn btn-secondary">Go</button>
          </span>
        </div>
      </div>
    )
  }
}
