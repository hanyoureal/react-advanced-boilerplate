import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { ErrorContainer } from 'modules/error';
import { LoginContainer } from 'modules/session';
import { HomeContainer } from 'modules/home';
import { setLoggedUser } from 'modules/session/stores/sessionStore';
import { Navigation } from 'modules/navigation';
import { Layout } from 'antd';
import { getSession } from './selectors/mainSelectors';

const { Header, Content, Footer } = Layout;

const propTypes = {
  history: object,
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
      history,
    } = this.props;

    const location = history.location.pathname.split('/')[1];

    return (
      <div>
        {
          !session ?
            <LoginContainer />
            :
            <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider">
              <Navigation location={location} />
              <Layout>
                <Header style={{ background: '#ececec', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                  <ErrorContainer />
                  <Switch>
                    <Route exact path="/" render={() => <Redirect to="/orders" />} />
                    <Route path="/orders" component={HomeContainer} />
                    <Route path="/drivers" component={HomeContainer} />
                    <Route path="/map" component={HomeContainer} />
                  </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Bliss Delivery ©2017
                </Footer>
              </Layout>
            </Layout>
        }
      </div>
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

// withRouter property enables router property watches directly on props
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));
