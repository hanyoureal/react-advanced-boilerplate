import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { HomeContainer } from 'modules/home';
import { LoginContainer } from 'modules/session';
import { setLoggedUser } from 'modules/session/stores/sessionStore';
import Cookies from 'js-cookie';
import { getSession } from './selectors/mainSelectors';

const propTypes = {
  session: object,
  dispatchSetLoggedUser: func,
};

const defaultProps = {
  session: null,
};

class MainContainer extends Component {
  componentWillMount() {
    const sessionCookie = Cookies.get('session');
    const session = sessionCookie ? JSON.parse(Cookies.get('session')) : null;
    if (session) {
      this.props.dispatchSetLoggedUser(session);
    }
  }

  render() {
    const {
      session,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          {
            session ?
              <Route path="/" component={HomeContainer} />
              :
              <Route path="/" component={LoginContainer} />
          }
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  session: getSession(state),
});

const mapDispatchToProps = {
  dispatchSetLoggedUser: setLoggedUser,
};

MainContainer.propTypes = propTypes;
MainContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
