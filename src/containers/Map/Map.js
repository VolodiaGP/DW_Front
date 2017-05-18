import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { withGoogleMap, GoogleMap, Marker, Polygon } from 'react-google-maps';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import {
  loadRegions,
  loadObjects,
  loadCategories,
  loadContractTypes,
  loadHolders,
  loadOwnershipForms,
  loadPeopleCategories,
  loadPeoples
} from 'redux/modules/map';

const returnMarkerImg = (element) => {
  switch (element) {
    case 1:
      return 'http://maps.google.com/mapfiles/kml/paddle/blu-diamond.png';
    case 2:
      return 'http://www.myiconfinder.com/uploads/iconsets/128-128-a4c7ca66f18a996590e6d440bf29c0fa.png';
    default:
      break;
  }
};

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={8}
    defaultCenter={{ lat: 50.454090, lng: 30.524743 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => {
      const markerIcon = returnMarkerImg(marker.elementType);
      return (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(index)}
          onClick={() => props.onMarkerClick(index)}
          icon={markerIcon}
        />
      );
    })}
    <Polygon paths={props.coords} onClick={(event) => { console.log('polygon', event); }} />
  </GoogleMap>
));

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [];

    promises.push(dispatch(loadRegions()));
    promises.push(dispatch(loadObjects()));
    promises.push(dispatch(loadCategories()));
    promises.push(dispatch(loadContractTypes()));
    promises.push(dispatch(loadHolders()));
    promises.push(dispatch(loadOwnershipForms()));
    promises.push(dispatch(loadPeopleCategories()));
    promises.push(dispatch(loadPeoples()));

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    regions: state.map.regions,
    objects: state.map.objects,
    categories: state.map.categories,
    contractTypes: state.map.contractTypes,
    holders: state.map.holders,
    ownershipForms: state.map.ownershipForms,
    peopleCategories: state.map.peopleCategories,
    peoples: state.map.peoples
  })
)
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: false,
      markers: []
    };
  }

  componentWillMount() {
    const markers = [{
      position: {
        lat: 50.454090,
        lng: 30.524743,
      },
      key: `Kyiv`,
      defaultAnimation: 2,
      elementType: 1
    }, {
      position: {
        lat: 50.753834709847816,
        lng: 29.278564453125,
      },
      defaultAnimation: 2,
      elementType: 2
    }];
    this.setState({ markers });
  }

  handleMapClicked(event) {
    const { someState } = this.state;
    const latitudeClicked = event && event.latLng && event.latLng.lat() || null;
    const longitudeClicked = event && event.latLng && event.latLng.lng() || null;
    console.log('latitudeClicked=', latitudeClicked, ', longitudeClicked=', longitudeClicked, someState);
  }

  render() {
    const { markers } = this.state;
    const coords = [
      { lat: 50.477390305021146, lng: 30.47607421875 },
      { lat: 49.7315809334801, lng: 31.036376953125 },
      { lat: 50.771207831887835, lng: 31.4813232421875 }
    ];
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
            coords={coords}
            onMarkerRightClick={() => { console.log('onMarkerRightClick'); }}
            onMarkerClick={(index) => {
              console.log('onMarkerClcik', index); markers[0].elementType = 2;
              this.setState({ someState: !this.state.someState });
            }}
          />
        </div>
      </div>
    );
  }
}
