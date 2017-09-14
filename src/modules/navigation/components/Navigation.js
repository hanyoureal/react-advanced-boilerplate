import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func, string } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import { logOut } from 'modules/session/stores/sessionStore';
import LogoImg from 'assets/images/Logo_s.png';
import messages from '../messages';
import { menuItems } from '../config';

const { Sider } = Layout;
const propTypes = {
  intl: intlShape.isRequired,
  location: string,
  dispatchLogOut: func,
};

const defaultProps = {
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.onCollapse = this.onCollapse.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      collapsed: false,
    };
  }

  logOut() {
    this.props.dispatchLogOut();
  }

  onCollapse() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {
      intl,
      location,
    } = this.props;

    const {
      collapsed,
    } = this.state;

    const menuLocations = menuItems.map(({ name }) => name);
    const selectedLocation =
      (menuLocations.indexOf(location) !== -1) ? [location] : [];

    return (
      <Sider
        className="header"
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        collapsible
      >
        <div className="logo">
          <img src={LogoImg} alt="Logo" />
        </div>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={selectedLocation}
        >
          {
            menuItems.map(({ name, icon }) => (
              <Menu.Item key={name}>
                <Link to={`/${name}`}>
                  <Icon type={icon} />
                  <span>{intl.formatMessage(messages[name])}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  dispatchLogOut: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Navigation));
