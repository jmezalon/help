import React from 'react';
import { withRouter } from 'react-router-dom';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {findValue: "", nearValue: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.findChange = this.findChange.bind(this);
    this.nearChange = this.nearChange.bind(this);
    this.activatePlacesSearch = this.activatePlacesSearch.bind(this);


 }



  handleSubmit(event) {
    event.preventDefault();
    this.setState({nearValue: document.getElementById("autocomplete").value})
    this.props.fetchBusinesses({
      name: this.state.findValue,
      cuisine: this.state.findValue.charAt(0).toUpperCase() + this.state.findValue.slice(1),
      price_range: 4,
      noise_level: 4,
      delivery: false,
      bounds: this.state.nearValue
    });
    if(this.props.match.path !== "/search" ) {
      this.props.history.push("/search");
    }


  }

   activatePlacesSearch() {
    var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  findChange(event) {
    this.setState({findValue: event.target.value});
    this.setState({nearValue: document.getElementById("autocomplete").value})
  }

  nearChange(event) {
    this.setState({nearValue: event.target.value});
    // this.activatePlacesSearch();
  }



  render() {
    // let filteredBusinesses = this.props.businesses.filter(
    //   (business) => {
    //     return business.name.toLowerCase().indexOf(this.state.nearValue.toLowerCase() !== -1);
    //   }
    // )
    // let defaultBounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(40.751300 , -73.983665 ),
    //   new google.maps.LatLng(42, -74.5)
    // );
    //
    // let input = document.getElementById("autocomplete");
    // // var options = {
    // //   bounds: defaultBounds,
    // //   types: ["establishment"]
    // // };
    // let autocomplete = new google.maps.places.Autocomplete(input);


    return(
      <form id="search-form" onSubmit={this.handleSubmit} className={this.props.path === "/" ? "landing-form" : "serach-nav"} >
        <ul className={this.props.path === "/" ? "landing-form-ul" :"search-form-nav"}>

          <li className={this.props.path === "/" ? "find-text-land" :"find-text-nav"}>
            Find
          </li>
          <li className={this.props.path === "/" ? "find-input-land" :"find-input-field"}>
            <input className={this.props.path === "/" ? "land-input-find" :"nav-input-find"} onChange={this.findChange} value={this.state.findValue} text="type" placeholder="Restaurants"/>
          </li>
          <li className={this.props.path === "/" ? "land-seperator" : "seperator"}><div className={this.props.path === "/" ? "land-seperator-div" :"seperator-div"}></div></li>
          <li className={this.props.path === "/" ? "near-text-land" :"near-text-nav"}> Near</li>
          <li>
            <input id="autocomplete" autoComplete="on" onFocus={this.activatePlacesSearch} onBlur={this.nearChange} className={this.props.path === "/" ? "near-input-land" :"near-input-nav"} onChange={this.nearChange} value={this.state.nearValue} text="type" placeholder="Current Location" />
          </li>
          <li>
            <button type="submit" className={this.props.path === "/" ? "mag-land" :"mag"} onKeyDown={this.handleSubmit} onClick={this.handleSubmit}><i className={this.props.path ==="/" ? "land-icon fa fa-search" : "icon fa fa-search" }></i></button>

          </li>
        </ul>
      </form>

    );
  }



}

export default withRouter(SearchForm);
