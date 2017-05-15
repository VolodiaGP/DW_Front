import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={8}
    defaultCenter={{ lat: 50.454090, lng: 30.524743 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: null
    };
  }

  handleMapClicked(event) {
    const { someState } = this.state;
    const latitudeClicked = event && event.latLng && event.latLng.lat() || null;
    const longitudeClicked = event && event.latLng && event.latLng.lng() || null;
    console.log('latitudeClicked=', latitudeClicked, ', longitudeClicked=', longitudeClicked, someState);
  }

  render() {
    const markers = [{
      position: {
        lat: 50.454090,
        lng: 30.524743,
      },
      key: `Kyiv`,
      defaultAnimation: 2,
    }];
    require('./Map.scss');
    return (
      <div className="global-maps-container">
        <Helmet title="Region info"/>
        <div className="das">MAP</div>
        <div className="map-container">
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={() => { console.log('mapLoaded'); }}
            onMapClick={(event) => { this.handleMapClicked(event); }}
            markers={markers}
            onMarkerRightClick={() => { console.log('onMarkerRightClick'); }}
          />
        </div>
      </div>
    );
  }
}
