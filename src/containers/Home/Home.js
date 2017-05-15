import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { modalDisplay } from 'redux/modules/modal';

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
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

export default class Home extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleRegistrationButtonClick() {
    const dispatch = this.context.store.dispatch;
    dispatch(modalDisplay('registration'));
  }

  handleLoginButtonClick() {
    const dispatch = this.context.store.dispatch;
    dispatch(modalDisplay('login'));
  }

  render() {
    require('./Home.scss');
    const firstImage = require('../../../static/img/home/kiev_obl.gif');
    const mineralsImage = require('../../../static/img/home/minerals.jpg');
    const markers = [{
      position: {
        lat: 25.0112183,
        lng: 121.52067570000001,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
    }];
    return (
      <div className="home-page-container">
        <Helmet title="Home"/>
        <div className="hero">
          <div className="hero-information">
            <div className="title">Інвестиційна мапа</div>
            <div className="actions-buttons">
              <div
                className="button-hero registration"
                onClick={() => { this.handleRegistrationButtonClick(); }}
              >
                Реєстрація
              </div>
              <div
                className="button-hero login"
                onClick={() => { this.handleLoginButtonClick(); }}
              >
                Вхід
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="not-pair">
            <div className="left-part">
              <div className="title">Отримання інформації про інвестиційний клімат регіону</div>
              <div className="text">
                Надається інформація про інвестиційний клімат певного регіону.
                Враховується інформація про населення, кліматичні умова, ресурси та об"єкти регіону,
                які можуть вплинути на інвестиційну привабливіть певної території.
              </div>
              <div className="see-more default-dark-button">Отримати інформацію</div>
            </div>
            <div className="right-part to-center">
              <img src={firstImage} />
            </div>
          </div>
          <div className="pair">
            <div className="left-part to-center">
              <img src={mineralsImage} />
            </div>
            <div className="right-part">
              <div className="title">База ресурсів та об'єктів</div>
              <div className="text">
                Отримання інформацію про ресурси та об'єкти, їхні валстивості, та інформація,
                яким чином вони впливають на інвестиційну привабливіть регіону.
              </div>
              <div className="see-more default-dark-button">Перейти до бази</div>
            </div>
          </div>
          <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={() => { console.log('mapLoaded'); }}
            onMapClick={() => { console.log('omMapClick'); }}
            markers={markers}
            onMarkerRightClick={() => { console.log('onMarkerRightClick'); }}
          />
        </div>
      </div>
    );
  }
}
