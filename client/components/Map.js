import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
       lat: lat,
       lng: lng
     }
   };
   this.recenterMap = this.recenterMap.bind(this);
   this.loadMap = this.loadMap.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleEvent = this.handleEvent.bind(this);
   this.renderChildren = this.renderChildren.bind(this);
   this.getYoutubeData = this.getYoutubeData.bind(this);
  }
  componentDidMount() {
  // componentDidMount() is invoked immediately after a component is mounted.
  // Initialization that requires DOM nodes should go here. If you need to load data
  // from a remote endpoint, this is a good place to instantiate the network request.
  // Setting state in this method will trigger a re-rendering.
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude
            }
          })
        })
      }
    }
   this.loadMap();
  }
  componentDidUpdate(prevProps, prevState) {
  // componentDidUpdate() is invoked immediately after updating occurs.
  // This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  // This is also a good place to do network requests as long as you compare the
  // current props to previous props (e.g. a network request may not be necessary
  // if the props have not changed).
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  // const evntnames = ['click', 'dragend', 'ready'];
  // evntnames.forEach(e => Map.propTypes[e] = React.PropTypes.func);
  loadMap() {
    console.log('loadMap is being called')
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;
      //loadMap() called only after component has rendered
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef); //ref to the actual, not virtual, DOMelement

      let {lat, lng} = this.props.initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: 14
      })
      this.map = new maps.Map(node, mapConfig);
      this.marker = new maps.Marker({
        position: center,
        map: this.map
      });
      this.infowindow = new maps.InfoWindow({
        content: "info here"
      });
      // evntnames.forEach(e => {
      //   this.map.addListener(e, this.handleEvent(e));
      // });
      this.map.addListener('dragend', (evt) => {
        this.props.onMove(this.map);
      })
      this.marker.addListener('click', function() {
        this.infowindow.open(this.map, this.marker);
      });
      maps.event.trigger(this.map, 'ready');
    }
  }
  handleEvent(evntName) {
    let timeout;
    const handlerName = evntName;
    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(function () {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }
  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(curr.lat, curr.lng)
      map.panTo(center)
    }
  }
  renderChildren() {
    const {children} = this.props;

    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const location ={lat: ReactDOM.findDOMNode(this.refs.lat).value, lng: ReactDOM.findDOMNode(this.refs.lng).value};
    this.setState({
      currentLocation: {
          lat: location.lat,
          lng: location.lng
      }
    })
    this.recenterMap();
  }
  getYoutubeData() {

  }
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={{zIndex: 10}}>
          Latitude: <input type="text" ref="lat" placeholder="Input Latitude"/>
          Longitude: <input type="text" ref="lng" placeholder="Input Longitude"/>
          <input type="submit" />
        </form>
        <div style={style} ref='map'>
          Loading map...
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool,
  onMove: React.PropTypes.func
}
Map.defaultProps = {
  zoom: 14,
  // Singapore, by default
  initialCenter: {
    lat: 1.290270,
    lng: 103.851959
  },
   centerAroundCurrentLocation: false,
   onMove: function() {} //default prop
}

export default Map;
// google maps api key: AIzaSyBj_YdHBs8D0aWDkYnIVfjGJk8aLIWAjso
