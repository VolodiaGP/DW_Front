import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import inputField from './../../components/ModalWindows/inputField';
import { withGoogleMap, GoogleMap, Polygon, Marker } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import isInPolygon from '../../helpers/isInPolygon';
import { change } from 'redux-form';
import { connect } from 'react-redux';

let currentCenter = {};

const GettingStartedGoogleMap = withGoogleMap(props => {
  console.log('rposp', props);
  console.log('props.marker', props.marker);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: Number(props.region.center_lat), lng: Number(props.region.center_lon) }}
      onClick={() => { console.log('click', props); }}
      ref={(map) => {
        if (map) {
          if (currentCenter !== props.mapCenter) {
            map.panTo({ lat: Number(props.region.center_lat), lng: Number(props.region.center_lon) });
          }
          currentCenter = props.mapCenter;
        }
      }}
    >
      {props && props.region && props.region.map_points.length !== 0 ?
        <Polygon
          paths={props.region.map_points.map(
            point => ({lat: Number(point.map_lat), lng: Number(point.map_lon)})
          )}
          options={{
            strokeWeight: '1',
            fillColor: 'gray'
          }}
          key={`item-polygon-`}
        />
        : ''}
      <DrawingManager
        onMarkerComplete={(event) => {
          const point = {
            lat: event.position.lat(),
            lng: event.position.lng()
          };
          const polygonPoints = props.region.map_points.map(element => ({
            lat: Number(element.map_lat),
            lng: Number(element.map_lon)
          }));
          event.setVisible(false);
          if (isInPolygon(point, polygonPoints)) {
            props.onMarkerAdded(point);
          }
        }}
        drawingMode={Marker}
      />
      {props && props.marker ?
        <div className="ds">
          <Marker
            position={{
              lat: Number(props.marker.lat),
              lng: Number(props.marker.lng)
            }}
          />
        </div>
        : ''}
    </GoogleMap>
  );
});

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

const selector = formValueSelector('calculateInvestmentForm');
@reduxForm({
  form: 'calculateInvestmentForm',
  validate
})
@connect(
  state => ({
    formMapLon: selector(state, 'map_lon'),
    formMapLat: selector(state, 'map_lat')
  }),
  {})
export default class CalculateInvestmentForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    display: PropTypes.bool,
    categoriesList: PropTypes.array,
    currentRegion: PropTypes.object,
    formMapLon: PropTypes.Number,
    formMapLat: PropTypes.Number,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static defaultProps = {
    display: false,
    categoriesList: [],
    currentRegion: {},
    formMapLon: null,
    formMapLat: null
  };

  constructor(props) {
    super(props);
    this.state = {
      markerObject: null
    };
  }

  render() {
    const {
      handleSubmit, display, categoriesList, formMapLon, formMapLat, currentRegion
    } = this.props;
    console.log('formMapLon', formMapLon);
    console.log('formMapLat', formMapLat);
    const dispatch = this.context.store.dispatch;
    console.log('current regions', currentRegion);
    console.log('categoriesList', categoriesList);
    return (
      <div className={`calculate-investment-form ${display ? 'display' : ''}`}>
        <form onSubmit={handleSubmit((submitValues) => { console.log('submitValues', submitValues); })}>
          <div className="form-elements">
            <div className="left-row">
              <div className="title-row">Виставте пріоритет інвестиційних об'єктів для капіталовкладення:</div>
              {categoriesList && categoriesList.length !== 0 ? categoriesList.map(category =>
                <div className="input-field" key={`category-id-${category.id}`}>
                  <div className="label">{category.title}:</div>
                  <div className="field">
                    <Field name={category.id} component={inputField} divClassName="input-text" />
                  </div>
                </div>
              ) : ''}
              <br /><br />
              <div className="input-field" key={'category-id-'}>
                <div className="title-row">Вкажіть розмір фонду, який задовольнятиме вашим фінансовим можливостям: </div>
                <div className="label">Інвестиційний фонд:</div>
                <div className="field">
                  <Field name="max_sum" component={inputField} divClassName="input-text" />
                </div>
              </div>
            </div>
            <div className="right-row">
              <div className="title-row">Вкажіть точку вашого об'кта: </div>
              <GettingStartedGoogleMap
                containerElement={
                  <div style={{ height: `300px` }} />
                }
                mapElement={
                  <div style={{ height: `300px` }} />
                }
                region={currentRegion}
                onMarkerAdded={(marker) => {
                  this.setState({ markerObject: marker });
                  dispatch(change('calculateInvestmentForm', 'map_lon', marker.lng));
                  dispatch(change('calculateInvestmentForm', 'map_lat', marker.lat));
                }}
                marker={{
                  lng: formMapLon,
                  lat: formMapLat
                }}
              />
              <div className="form-row map-points">
                <div className="input-field" key={`map-lon`}>
                  <div className="label">Довгота об'єкту:</div>
                  <div className="field">
                    <Field name="map_lon" component={inputField} divClassName="input-text" />
                  </div>
                </div>
                <div className="input-field" key={`map-lat`}>
                  <div className="label">Широта об'єкту:</div>
                  <div className="field">
                    <Field name="map_lat" component={inputField} divClassName="input-text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={handleSubmit((values) => { console.log('values', values); })}
            className="default-dark-button"
          >
            Обрахувати
          </div>
        </form>
        <div className="result">
          <div className="result-title">Результат: </div>
          <div className="text">
            <div>Найкращий шлях розподілення фонду в "15000000грн" наступний:</div>
            <div className="row"><span>1 - Завод: </span> - (об'єкт) <a>Завод на оренду</a> <div></div></div>
            <div className="row"><span>2 - Нафта:</span> - (об'єкт) <a>Нафта ПН-СХ2</a></div>
            <div className="row"><span>3 - Телевізійна вишка:</span> - (об'єкт) <a>Телевізійна вишка</a></div>
            <div className="row"><span>4 - Земельна ділянка:</span> - (об'єкт) <a>Земля</a></div>
          </div>
        </div>
      </div>
    );
  }
}
