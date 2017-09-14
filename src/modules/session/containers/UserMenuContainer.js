import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func, object } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, Menu, Dropdown } from 'antd';
import { logOut } from '../stores/sessionStore';
import { getSession } from '../selectors/sessionSelectors';
import messages from '../messages';

const propTypes = {
  intl: intlShape.isRequired,
  loggedUser: object,
  dispatchLogOut: func,
};

const defaultProps = {
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleClick({ key }) {
    const actions = {
      logout: this.logOut,
    };

    if (Object.keys(actions).indexOf(key) !== -1) {
      actions[key]();
    }
  }

  logOut() {
    this.props.dispatchLogOut();
  }

  render() {
    const {
      intl,
      loggedUser,
    } = this.props;

    const menu = (<Menu
      onClick={this.handleClick}
    >
      <Menu.Item key="profile">
        <Link to="/profile">
          {intl.formatMessage(messages.profile)}
        </Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">
          {intl.formatMessage(messages.settings)}
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <span>{intl.formatMessage(messages.logout)}</span>
      </Menu.Item>
    </Menu>);

    return (
      <Dropdown overlay={menu}>
        <a className="user-menu">
          <Icon type="user" style={{ fontSize: 20 }} /> {loggedUser.name} <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  loggedUser: getSession(state),
});

const mapDispatchToProps = {
  dispatchLogOut: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Navigation));
