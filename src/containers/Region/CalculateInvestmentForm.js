import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import inputField from './../../components/ModalWindows/inputField';
import { withGoogleMap, GoogleMap, Polygon } from 'react-google-maps';

let currentCenter = {};

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: props.polygons[0].center_lat, lng: props.polygons[0].center_lon }}
    onClick={() => { console.log('click', props); }}
    ref={(map) => {
      if (map) {
        if (currentCenter !== props.mapCenter) {
          map.panTo({ lat: Number(props.polygons[0].center_lat), lng: Number(props.polygons[0].center_lon) });
        }
        currentCenter = props.mapCenter;
      }
    }}
  >
    {props.polygons.map((polygon, index) => {
      const path = polygon.map_points.map(point => ({ lat: Number(point.map_lat), lng: Number(point.map_lon) }));
      return (
        <Polygon
          paths={path} key={`item-polygon-${index}`}
        />
      );
    })}
  </GoogleMap>
));

//   {props.markers && props.markers.length !== 0 ? props.markers.map((marker, index) => {
//     const position = {
//       lat: Number(marker.map_points[0].map_lat),
//       lng: Number(marker.map_points[0].map_lon)
//     };
//     return (
//       <Marker
//         position={position}
//         onClick={() => props.onMarkerClick(marker.id)}
//         key={`current-marker-${index}`}
//       />
//     );
//   }) : ''}

const validate = (values) => {
  const requiredFields = ['first_name', 'last_name', 'email', 'login', 'password', 'submit_password'];
  const lengthFields = ['password', 'submit_password'];
  const mailFields = ['email'];
  const errors = {};
  requiredFields.map((field) => {
    if (!values[field]) {
      errors[field] = 'Поле обов\'язкове!';
      return errors[field];
    }
    return true;
  });
  lengthFields.map((field) => {
    if (values[field] && values[field].length <= 5) {
      errors[field] = 'Поле має містити щонайменше 6 символів!';
      return errors[field];
    }
    return true;
  });
  mailFields.map((field) => {
    if (values[field] && !values[field].match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i)) {
      errors[field] = 'Це поле має бути поштою';
    }
  });
  if (values.submit_password !== values.password) {
    errors.submit_password = 'Паролі не співпадають!';
  }
  return errors;
};

@reduxForm({
  form: 'calculateInvestmentForm',
  validate
})
export default class CalculateInvestmentForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    display: PropTypes.bool,
    categoriesList: PropTypes.array,
    currentRegion: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static defaultProps = {
    display: false,
    categoriesList: [],
    currentRegion: {}
  };

  render() {
    const { handleSubmit, display, categoriesList, currentRegion } = this.props;
    console.log('categoriesList', categoriesList);
    return (
      <div className={`calculate-investment-form ${display ? 'display' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="form-elements">
            <div className="left-row">
              {categoriesList && categoriesList.length !== 0 ? categoriesList.map(category =>
                <div className="input-field" key={`category-id-${category.id}`}>
                  <div className="label">{category.title}:</div>
                  <div className="field">
                    <Field name={category.id} component={inputField} divClassName="input-text" />
                  </div>
                </div>
              ) : ''}
            </div>
            <div className="right-row">
              <GettingStartedGoogleMap
                containerElement={
                  <div style={{ height: `100%` }} />
                }
                mapElement={
                  <div style={{ height: `100%` }} />
                }
                polygons={currentRegion}
              />
            </div>
          </div>
          <div
            onClick={handleSubmit((values) => { console.log('values', values); })}
            className="default-dark-button"
          >
            Зареєструватись
          </div>
        </form>
      </div>
    );
  }
}
