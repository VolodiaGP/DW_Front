import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import inputField from './../../components/ModalWindows/inputField';
import { withGoogleMap, GoogleMap, Polygon, Marker } from 'react-google-maps';

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
    <Marker
      position={{ lat: 50.454090, lng: 30.524743 }}
      key={'current-marker-'}
    />
  </GoogleMap>
));

// {props.markers && props.markers.length !== 0 ? props.markers.map((marker, index) => {
//   // const position = {
//   //   lat: Number(marker.map_points[0].map_lat),
//   //   lng: Number(marker.map_points[0].map_lon)
//   // };
//   const position = { lat: 50.454090, lng: 30.524743 };
//   return (
//     <Marker
//       position={position}
//       key={`current-marker-${index}`}
//     />
//   );
// }) : ''}
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
                  <Field name="total-price" component={inputField} divClassName="input-text" />
                </div>
              </div>
            </div>
            <div className="right-row">
              <div className="title-row">Вкажіть точку вашого об'кта: </div>
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
