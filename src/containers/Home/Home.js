import React, { Component } from 'react';
// import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    require('./Home.scss');
    const firstImage = require('../../../static/img/home/kiev_obl.gif');
    const mineralsImage = require('../../../static/img/home/minerals.jpg');
    return (
      <div className="home-page-container">
        <Helmet title="Home"/>
        <div className="hero">
          <div className="hero-information">
            <div className="title">Інвестиційна мапа</div>
            <div className="actions-buttons">
              <div className="button-hero registration">Реєстрація</div>
              <div className="button-hero login">Вхід</div>
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
        </div>
      </div>
    );
  }
}
