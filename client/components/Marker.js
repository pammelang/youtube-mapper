import React from 'react';

export class Marker extends React.component {
  componentDidUpdate() {
    if ((this.props.map !== prevProps.map) ||
     (this.props.position !== prevProps.position)) {
       this.renderMarker();
   }
  }
  renderMarker() {
     let {map, google, position, mapCenter} = this.props;
     let pos = position || mapCenter;
     position = new google.maps.LatLng(pos.lat, pos.lng);

     const pref = {
       map: map,
       position: position
     };
     this.marker = new google.maps.Marker(pref);
 }
  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}
