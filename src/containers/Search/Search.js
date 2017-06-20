import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
  })
)
export default class Search extends Component {
  static propTypes = {
    searchQuery: PropTypes.String,
    searchResults: PropTypes.Array,
  };

  static defaultProps = {
    searchQuery: '',
    searchResults: '',
  };


  render() {
    const { searchQuery, searchResults } = this.props;
    require('./Search.scss');
    return (
      <div className="container search-container">
        {searchResults && searchResults.message
          ?
            <div className="title">За вашим запитом <span>"{searchQuery}"</span> не було знайдено жодних результатів:</div>
          :
            <div className="title">За вашим запитом <span>"{searchQuery}"</span> було отримано наступні результати:</div>
        }
        {searchResults && searchResults.length !== 0 ?
          <div className="search-results">
            {searchResults && searchResults.region ? searchResults.map(region =>
              <div className="item">
                <div className="type"><span className="type">Регіони</span> - {region.title ? region.title : ''}</div>
                {/* <div className="description">Сховати детальну інформацію</div> */}
                <div className="ololo">
                  <div className="image">
                    <img src={`http://diploma-investment-map.herokuapp.com/${region.image ? region.image : ''}`}/>
                  </div>
                  <div className="description">{region.description ? region.description : ''}</div>
                </div>
              </div>
            ) : ''}
          </div>
        : ''}
        <div className="item">
          <div className="type"><span className="type">Інвестиційний об'єкт</span> - Магазин Києва</div>
          <div className="description">Показати детальну інформацію</div>
        </div>
        <div className="item">
          <div className="type"><span className="type">Інвестиційний об'єкт</span> - Київська телевежа</div>
          <div className="description">Сховати детальну інформацію</div>
          <div className="ololo">
            <div className="image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/%D0%9A%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D0%B5%D0%BB%D0%B5%D0%B1%D0%B0%D1%88%D0%BD%D1%8F.JPG/250px-%D0%9A%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D1%82%D0%B5%D0%BB%D0%B5%D0%B1%D0%B0%D1%88%D0%BD%D1%8F.JPG"/>
            </div>
            <div className="description">Ки́ївська телеве́жа — суцільнометалева просторова ґратована висотна споруда
              висотою 380 метрів побудована у 1968–1973 роки в Києві з метою трансляції радіо та телебачення.
              Це найвища решітчаста вільностояча конструкція світу[1] та найвища споруда України[2].
            </div>
          </div>
        </div>
        <div className="item">
          <div className="type"><span className="type">Регіон</span> - Київська область</div>
          <div className="description">Сховати детальну інформацію</div>
          <div className="ololo">
            <div className="image">
              <img src="http://skyandmethod.com/wp-content/uploads/2014/09/IMG_9949_sandm_majdan_SM.jpg"/>
            </div>
            <div className="description">Ки́ївська о́бласть — область на півночі України. Обласний центр — місто
              Київ — адміністративно до її складу не входить. Площа області — 28 131 км²
              (8-ма за цим показником в Україні), населення на 2016 рік становить 1,7 млн осіб.
              Розташована в басейні середньої течії Дніпра, більшою частиною на Правобережжі.
              На сході межує з Чернігівською і Полтавською, на південному-сході та півдні з Черкаською,
              на південному-заході — з Вінницькою, на заході — з Житомирською областями, на півночі — з
              Гомельською областю Білорусі. Утворена 27 лютого 1932 року. В області 25 районів, 24 міст, у
              тому числі 12 обласного значення, 30 селищ міського типу, загалом 1127 населених пунктів.
              Північну частину області площею близько 2 тис. км² займає Чорнобильська зона відчуження.
              Місто Славутич є ексклавом Київської області на території Чернігівської.
            </div>
          </div>
        </div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
