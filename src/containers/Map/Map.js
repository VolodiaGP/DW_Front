import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow } from 'react-google-maps';
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
  loadPeoples,
  toggleMarkerDisplay
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
      const position = {
        lat: Number(marker.map_points[0].map_lat),
        lng: Number(marker.map_points[0].map_lon)
      };
      const contractType = props.contractTypes.find(element => Number(element.id) === Number(marker.contract_type));
      const holder = props.holders.find(element => Number(element.id) === Number(marker.holder));
      return (
        <Marker
          position={position}
          onRightClick={() => props.onMarkerRightClick(marker.id)}
          onClick={() => props.onMarkerClick(marker.id)}
          icon={markerIcon}
          key={`current-marker-${index}`}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={() => props.onMarkerClick(marker.id)}>
              <div className="info-container">
                <div className="name">{marker.name}</div>
                <div className="description">{marker.description}</div>
                <div className="holder"><div className="title">Власник:</div>{holder.title}</div>
                <div className="contract-type"><div className="title">Тип контракту:</div>{contractType.title}</div>
                <div className="price"><div className="title">Ціна:</div>{marker.price} грн.</div>
                <div className="metrics"><div className="title">Площа:</div>{marker.metrics} м<sup>2</sup></div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
    {props.polygons.map((polygon, index) => {
      return (
        <Polygon
          onClick={(event) => { console.log('polygon', event, 'index = ', index); }}
        />
      );
    })}
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
  static propTypes = {
    regions: PropTypes.array,
    objects: PropTypes.array,
    categories: PropTypes.array,
    contractTypes: PropTypes.array,
    holders: PropTypes.array,
    ownershipForms: PropTypes.array,
    peopleCategories: PropTypes.array,
    peoples: PropTypes.array
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    regions: [],
    objects: [],
    categories: [],
    contractTypes: [],
    holders: [],
    ownershipForms: [],
    peopleCategories: [],
    peoples: []
  };

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
    const { regions, objects, categories, contractTypes, holders,
      ownershipForms, peopleCategories, peoples } = this.props;
    const dispatch = this.context.store.dispatch;
    const markersList = objects.filter(element => element.map_points.length === 1);
    const polygonsList = objects.filter(element => element.map_points.length !== 1);
    require('./Map.scss');
    return (
      <div className="global-maps-container">
        <Helmet title="Region info"/>
        <div className="map-container">
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapClick={(event) => { this.handleMapClicked(event); }}
            markers={markersList}
            polygons={polygonsList}
            regions={regions}
            categories={categories}
            contractTypes={contractTypes}
            holders={holders}
            ownershipForms={ownershipForms}
            peopleCategories={peopleCategories}
            peoples={peoples}
            onMarkerClick={(index) => {
              dispatch(toggleMarkerDisplay(index));
            }}
          />
        </div>
      </div>
    );
  }
}
