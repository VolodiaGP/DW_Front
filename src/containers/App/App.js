import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { loginFromCookie, logout } from 'redux/modules/auth';
import ModalWindow from '../../components/ModalWindows/ModalWindow';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }}) => {
    const promises = [];
    if (!getState().auth.token) {
      promises.push(dispatch(loginFromCookie()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({auth: state.auth}),
  { pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  // componentWillReceiveProps(nextProps) {
    // if (!this.props.user && nextProps.user) {
    //   // login
    //   this.props.pushState('/loginSuccess');
    // } else if (this.props.user && !nextProps.user) {
    //   // logout
    //   this.props.pushState('/');
    // }
  // }

  handleLogout = (event) => {
    event.preventDefault();
    // this.props.logout();
  };

  render() {
    const {auth} = this.props;
    const styles = require('./App.scss');
    const dispatch = this.context.store.dispatch;
    return (
      <div className="global-application-container">
        <ModalWindow />
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className="brand"/>
                <span>Домашня сторінка</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/about">
                <NavItem eventKey={5}>Про нас</NavItem>
              </LinkContainer>

              {!auth.token &&
              <LinkContainer to="/login">
                <NavItem eventKey={6}>Вхід</NavItem>
              </LinkContainer>}
              {auth.token &&
              <LinkContainer to="/logout">
                <NavItem eventKey={7} className="logout-link" onClick={() => { dispatch(logout()); }}>
                  Вихід
                </NavItem>
              </LinkContainer>}
            </Nav>
            {auth && auth.token &&
              <p className={styles.loggedInMessage + ' navbar-text'}>Ввійшли, як <strong>Адмін</strong>.</p>
            }
            <Nav navbar pullRight>
              <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
                <i className="fa fa-github"/>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        <footer>
          <div className="well text-center">
            Футер
          </div>
        </footer>
      </div>
    );
  }
}
