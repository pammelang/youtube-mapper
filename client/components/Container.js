import {GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';
import React from 'react';

export class Container extends React.Component {
  render() {
    return (
      <div>
        <Map google={this.props.google}></Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBj_YdHBs8D0aWDkYnIVfjGJk8aLIWAjso"
})(Container);
