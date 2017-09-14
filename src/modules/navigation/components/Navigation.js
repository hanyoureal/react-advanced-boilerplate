import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Layout, Menu, Icon } from 'antd';
import { logOut } from 'modules/session/stores/sessionStore';
import LogoImg from 'assets/images/Logo_s.png';
import messages from '../messages';

const { Sider } = Layout;
const propTypes = {
  intl: intlShape.isRequired,
  dispatchLogOut: func,
};

const defaultProps = {
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.onCollapse = this.onCollapse.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      current: 'orders',
      collapsed: false,
    };
  }

  handleClick({ key }) {
    if (key === 'logout') {
      this.logOut();
    }
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
    } = this.props;

    const {
      collapsed,
    } = this.state;

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
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
        >
          <Menu.Item key="orders">
            <Icon type="clock-circle-o" />
            <span>{intl.formatMessage(messages.orders)}</span>
          </Menu.Item>
          <Menu.Item key="logout">
            <Icon type="aliwangwang-o" />
            <span>{intl.formatMessage(messages.logout)}</span>
          </Menu.Item>
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
