import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount() {
   this.loadMap();
 }
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;
      //loadMap() called only after component has rendered
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef); //ref to the actual, not virtual, DOMelement

      let zoom = 14;
      let lat = 1.290270;
      let lng = 103.851959;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div style={style} ref='map'>Loading map...</div>
    )
  }
}

export default Map;
// google maps api key: AIzaSyBj_YdHBs8D0aWDkYnIVfjGJk8aLIWAjso
