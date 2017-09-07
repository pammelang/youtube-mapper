import React from 'react';
import scriptLoader from "react-async-script-loader";

scriptLoader(["https://maps.googleapis.com/maps/api/js?key=AIzaSyBj_YdHBs8D0aWDkYnIVfjGJk8aLIWAjso&callback=initMap"]);
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: new google.maps.LatLng(2.8,-187.3)
    });
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(2.8,-187.3),
      map: map
    });
  }
  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;
// google maps api key: AIzaSyBj_YdHBs8D0aWDkYnIVfjGJk8aLIWAjso
