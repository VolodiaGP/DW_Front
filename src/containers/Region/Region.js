import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
// import { withGoogleMap, GoogleMap, Marker, Polygon, InfoWindow, Circle } from 'react-google-maps';
// import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
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
  // toggleMarkerDisplay,
  // setRegionToDisplay,
  // setCategoriesToDisplay,
  // setPeopleCategoriesToDisplay
} from 'redux/modules/map';
import Lightbox from 'react-image-lightbox';
import CalculateInvestmentForm from './CalculateInvestmentForm';
// import isInPolygon from '../../helpers/isInPolygon';

// let currentCenter = {};

// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={10}
//     defaultCenter={{ lat: 50.454090, lng: 30.524743 }}
//     onClick={props.onMapClick}
//     ref={(map) => {
//       if (map) {
//         if (currentCenter !== props.mapCenter) {
//           map.panTo({ lat: Number(props.mapCenter.lat), lng: Number(props.mapCenter.lng) });
//         }
//         currentCenter = props.mapCenter;
//       }
//     }}
//   >
//     {props.regions.map((region) => {
//       const path = region.map_points.map(point => ({ lat: Number(point.map_lat), lng: Number(point.map_lon) }));
//       if (region.id === props.regionToDisplay) {
//         return (
//           <Polygon
//             paths={path} onClick={(event) => { console.log('polygon', event, 'index = '); }}
//             options={{
//               strokeWeight: '1',
//               fillColor: 'gray'
//             }}
//           />
//         );
//       }
//     })}
//     {props.markers.map((marker, index) => {
//       const position = {
//         lat: Number(marker.map_points[0].map_lat),
//         lng: Number(marker.map_points[0].map_lon)
//       };
//       const contractType = props.contractTypes.find(element => Number(element.id) === Number(marker.contract_type));
//       const holder = props.holders.find(element => Number(element.id) === Number(marker.holder));
//       if (marker.region === props.regionToDisplay && props.categoriesToDisplay.includes(marker.category)) {
//         const iconElement = {
//           url: props.categories.find(category => category.id === marker.category).img_small,
//         };
//         return (
//           <Marker
//             position={position}
//             onRightClick={() => props.onMarkerRightClick(marker.id)}
//             onClick={() => props.onMarkerClick(marker.id)}
//             icon={iconElement}
//             key={`current-marker-${index}`}
//           >
//             {marker.showInfo && (
//               <InfoWindow onCloseClick={() => props.onMarkerClick(marker.id)}>
//                 <div className="info-container">
//                   <div className="name">{marker.name}</div>
//                   <div className="description">{marker.description}</div>
//                   <div className="holder"><div className="title">Власник:</div>{holder.title}</div>
//                   <div className="contract-type"><div className="title">Тип контракту:</div>{contractType.title}</div>
//                   <div className="price"><div className="title">Ціна:</div>{marker.price} грн.</div>
//                   <div className="metrics"><div className="title">Площа:</div>{marker.metrics} м<sup>2</sup></div>
//                 </div>
//               </InfoWindow>
//             )}
//           </Marker>
//         );
//       }
//     })}
//     {props.polygons.map((polygon, index) => {
//       const path = polygon.map_points.map(point => ({ lat: Number(point.map_lat), lng: Number(point.map_lon) }));
//       if (polygon.region === props.regionToDisplay && props.categoriesToDisplay.includes(polygon.category)) {
//         return (
//           <Polygon
//             paths={path} onClick={(event) => { console.log('polygon', event, 'index = ', index); }}
//           />
//         );
//       }
//     })}
//     {props.peoples.map((people) => {
//       const position = ({ lat: Number(people.map_lat), lng: Number(people.map_lon) });
//       if (people.region === props.regionToDisplay && props.peopleCategoriesToDisplay.includes(people.category)) {
//         return (
//           <Circle radius={300} center={position} fillColor={'red'} />
//         );
//       }
//     })}
//     <DrawingManager
//       onCircleComplete={(aa, bb, cc) => { console.log('a,b,c onCircleComplete', aa, bb, cc); }}
//       onMarkerComplete={(event) => {
//         const point = {
//           lat: event.position.lat(),
//           lng: event.position.lng()
//         };
//         const polygonPoints = props.regions.find(region => region.id === props.regionToDisplay).map_points.
//         map(element => ({
//           lat: Number(element.map_lat),
//           lng: Number(element.map_lon)
//         }));
//         if (!isInPolygon(point, polygonPoints)) {
//           event.setVisible(false);
//         }
//       }}
//       onOverlayComplete={(aa, bb, cc) => { console.log('a,b,c onOverlayComplete', aa, bb, cc); }}
//     />
//   </GoogleMap>
// ));

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
    peoples: state.map.peoples,
    mapCenter: state.map.mapCenter,
    regionToDisplay: state.map.regionToDisplay,
    categoriesToDisplay: state.map.categoriesToDisplay,
    peopleCategoriesToDisplay: state.map.peopleCategoriesToDisplay,
  })
)
export default class Region extends Component {
  static propTypes = {
    regions: PropTypes.array,
    objects: PropTypes.array,
    categories: PropTypes.array,
    contractTypes: PropTypes.array,
    holders: PropTypes.array,
    ownershipForms: PropTypes.array,
    peopleCategories: PropTypes.array,
    peoples: PropTypes.array,
    mapCenter: PropTypes.object,
    regionToDisplay: PropTypes.number,
    categoriesToDisplay: PropTypes.array,
    params: PropTypes.object,
    peopleCategoriesToDisplay: PropTypes.array,
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
    peoples: [],
    mapCenter: {},
    regionToDisplay: null,
    categoriesToDisplay: [],
    peopleCategoriesToDisplay: [],
    params: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      isLightBoxOpen: false,
      isObjectsDisplay: false,
      isInvestmentFormDisplay: false,
      isPeoplesObjectsDisplay: false,
      objectsCategorySelected: null,
      peoplesCategorySelected: null,
      objectSelected: null,
      peopleSelected: null
    };
  }

  setObjectsFromCategoryToDisplay(categoryId) {
    const { objectsCategorySelected } = this.state;
    let category = categoryId;
    if (objectsCategorySelected === categoryId) {
      category = null;
    }
    this.setState({ objectsCategorySelected: category });
  }

  setPeoplesCategoryToDisplay(categoryId) {
    const { peoplesCategorySelected } = this.state;
    let category = categoryId;
    if (peoplesCategorySelected === categoryId) {
      category = null;
    }
    this.setState({ peoplesCategorySelected: category });
  }

  setObjectToDisplay(objectId) {
    const { objectSelected } = this.state;
    let object = objectId;
    if (objectSelected === objectId) {
      object = null;
    }
    this.setState({ objectSelected: object });
  }

  setPeopleToDisplay(peopleId) {
    const { peopleSelected } = this.state;
    let people = peopleId;
    if (peopleSelected === peopleId) {
      people = null;
    }
    this.setState({ peopleSelected: people });
  }

  handleMapClicked(event) {
    const { someState } = this.state;
    const latitudeClicked = event && event.latLng && event.latLng.lat() || null;
    const longitudeClicked = event && event.latLng && event.latLng.lng() || null;
    console.log('latitudeClicked=', latitudeClicked, ', longitudeClicked=', longitudeClicked, someState);
  }

  render() {
    // const { regions, objects, categories, contractTypes, holders, regionToDisplay, categoriesToDisplay,
    //   ownershipForms, peopleCategories, peoples, mapCenter, peopleCategoriesToDisplay } = this.props;
    const { regions, objects, categories, peopleCategories, peoples, params } = this.props;
    const { isLightBoxOpen, isObjectsDisplay, objectsCategorySelected, peoplesCategorySelected,
      objectSelected, peopleSelected, isPeoplesObjectsDisplay, isInvestmentFormDisplay } = this.state;
    console.log('this.props', this.props);
    // const dispatch = this.context.store.dispatch;
    // const markersList = objects.filter(element => element.map_points.length === 1);
    // const polygonsList = objects.filter(element => element.map_points.length !== 1);
    // console.log('mapCenter', mapCenter);
    const currentRegion = regions.find(region => Number(region.id) === Number(params.id));
    // const currentObjects = objects.filter(object => Number(object.region === Number(params.id)));
    require('./Region.scss');
    return (
      <div className="global-region-container">
        <Helmet title="Region info"/>
        <div className="region-description">
          <div className="left-part">
            <div className="region-image" onClick={() => this.setState({ isLightBoxOpen: true })}>
              <img src="http://skyandmethod.com/wp-content/uploads/2014/09/IMG_9949_sandm_majdan_SM.jpg" />
            </div>
            <div className="show-more" onClick={() => this.setState({ isLightBoxOpen: true })}>
              Натисніть на зображення для збільшення.
            </div>
            {isLightBoxOpen ?
              <Lightbox
                mainSrc={['http://skyandmethod.com/wp-content/uploads/2014/09/IMG_9949_sandm_majdan_SM.jpg']}
                onCloseRequest={() => this.setState({ isLightBoxOpen: false })}
              />
            : ''}
          </div>
          <div className="right-part">
            <div className="region-title">
              {currentRegion && currentRegion.title ? currentRegion.title : ''}
            </div>
            <div className="region-description">
              {currentRegion && currentRegion.description ? currentRegion.description : ''}
            </div>
            <div className="region-center">
              <span>Центр регіону:</span>
              {currentRegion && currentRegion.center_city ? currentRegion.center_city : 'Не вказано'}
            </div>
          </div>
        </div>
        <div className="region-objects">
          <div
            className={`title ${isObjectsDisplay ? 'to-top' : ''}`}
            onClick={() => { this.setState({ isObjectsDisplay: !isObjectsDisplay }); }}
          >
            Категорії об'єктів, що знаходяться на регіоні
          </div>
          <div className={`objects-list ${isObjectsDisplay ? 'display' : ''}`}>
            {categories && categories.length !== 0 ? categories.
              filter(category => objects.filter(obj => obj.category === category.id
                && Number(obj.region) === Number(params.id)).length !== 0).map(category =>
                  <div className="category-item">
                    <div
                      className={`category-title ${category.id === objectsCategorySelected ? 'active' : ''}`}
                      onClick={() => {
                        this.setObjectsFromCategoryToDisplay(category.id);
                      }}
                    >
                      {category.title}
                    </div>
                    <div className={`category-item-list ${objectsCategorySelected === category.id ? 'display' : ''}`}>
                      {objectsCategorySelected === category.id ? objects.filter(object => Number(object.region) === Number(params.id)
                        && object.category === objectsCategorySelected).map(item =>
                          <div className="current-object">
                            <div
                              className={`object-title ${objectSelected === item.id ? 'active' : ''}`}
                              onClick={() => { this.setObjectToDisplay(item.id); }}
                            >
                              {item.name}
                            </div>
                            <div className={`object-description ${objectSelected === item.id ? 'display' : ''}`}>
                              {item.id === objectSelected && objects && objects.length !== 0 ?
                                objects.filter(object => object.id === objectSelected).map(currentObject =>
                                  <div className="object-info">
                                    {currentObject.description}
                                  </div>
                              ) : ''}
                            </div>
                          </div>
                      ) : ''}
                    </div>
                  </div>
            ) : ''}
          </div>
        </div>
        <div className="region-demography">
          <div
            className={`title ${isPeoplesObjectsDisplay ? 'to-top' : ''}`}
            onClick={() => { this.setState({ isPeoplesObjectsDisplay: !isPeoplesObjectsDisplay }); }}
          >
            Демографія, поточного регіону
          </div>
          <div className={`objects-list ${isPeoplesObjectsDisplay ? 'display' : ''}`}>
            {peopleCategories && peopleCategories.length !== 0 ? peopleCategories.
            filter(category => peoples.filter(people => people.category === category.id
            && Number(people.region) === Number(params.id)).length !== 0).map(category =>
              <div className="category-item">
                <div
                  className={`category-title ${category.id === peoplesCategorySelected ? 'active' : ''}`}
                  onClick={() => {
                    this.setPeoplesCategoryToDisplay(category.id);
                  }}
                >
                  {category.title}
                </div>
                <div className={`category-item-list ${peoplesCategorySelected === category.id ? 'display' : ''}`}>
                  {peoplesCategorySelected === category.id ? peoples.filter(people => Number(people.region) === Number(params.id)
                  && people.category === peoplesCategorySelected).map(item =>
                    <div className="current-object">
                      <div
                        className={`object-title ${objectSelected === item.id ? 'active' : ''}`}
                        onClick={() => { this.setPeopleToDisplay(item.id); }}
                      >
                        {item.title}
                      </div>
                      <div className={`object-description ${peopleSelected === item.id ? 'display' : ''}`}>
                        {item.id === peopleSelected && peoples && peoples.length !== 0 ?
                          peoples.filter(people => people.id === peopleSelected).map(currentPeople =>
                            <div className="object-info">
                              {currentPeople.description}
                            </div>
                          ) : ''}
                      </div>
                    </div>
                  ) : ''}
                </div>
              </div>
            ) : ''}
          </div>
        </div>
        <div className="input-form">
          <div
            className="title"
            onClick={() => { this.setState({ isInvestmentFormDisplay: !isInvestmentFormDisplay }); }}
          >
            Визначення найкращого капіталовкладення
          </div>
          <CalculateInvestmentForm
            display={isInvestmentFormDisplay}
            categoriesList={categories && categories.length !== 0 ? categories.filter(category =>
              objects.filter(obj => obj.category === category.id
                && Number(obj.region) === Number(params.id)).length !== 0) : []}
            markers={objects}
            currentRegion={regions.filter(region => Number(region.id) === Number(params.id))}
          />
        </div>
      </div>
    );
  }
}
