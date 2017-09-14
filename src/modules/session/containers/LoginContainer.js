import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { logIn } from '../stores/sessionStore';
import { getSessionError } from '../selectors/sessionSelectors';
import LogIn from '../components/LogIn';
import messages from '../messages';

const propTypes = {
  intl: intlShape,
  error: object,
  dispatchLogIn: func,
};

const defaultProps = {
};

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.validateFields = this.validateFields.bind(this);

    this.state = {
      username: '',
      password: '',
      validation: {
        username: {
          status: 'success',
          help: '',
          hasFeedback: false,
        },
        password: {
          status: 'success',
          help: '',
          hasFeedback: false,
        },
      },
    };
  }

  onInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => {
      if (this.state.validation[name].hasFeedback) {
        this.validateFields();
      }
    });
  }

  onLogIn() {
    this.validateFields(() => {
      this.props.dispatchLogIn({
        ...this.state,
      });
    });
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onLogIn();
    }
  }

  validateFields(handler) {
    const {
      intl,
    } = this.props;

    const {
      username,
      password,
      validation,
    } = this.state;

    let error = false;
    const newValidation = {
      ...validation,
    };

    if (!username.length) {
      error = true;
      newValidation.username = {
        status: 'error',
        help: intl.formatMessage(messages.requiredField),
        hasFeedback: true,
      };
    } else {
      newValidation.username = {
        status: 'success',
        help: null,
        hasFeedback: true,
      };
    }

    if (!password.length) {
      error = true;
      newValidation.password = {
        status: 'error',
        help: intl.formatMessage(messages.requiredField),
        hasFeedback: true,
      };
    } else {
      newValidation.password = {
        status: 'success',
        help: null,
        hasFeedback: true,
      };
    }

    this.setState({
      validation: newValidation,
    });

    if (!error) {
      return typeof handler !== 'undefined' ? handler() : null;
    }

    return null;
  }

  render() {
    const {
      username,
      password,
      validation,
    } = this.state;

    const {
      error,
    } = this.props;

    return (
      <LogIn
        error={error}
        validation={validation}
        username={username}
        password={password}
        onInputChange={this.onInputChange}
        onKeyUp={this.onKeyUp}
        onLogIn={this.onLogIn}
      />
    );
  }
}

HomeContainer.propTypes = propTypes;
HomeContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  error: getSessionError(state),
});

const mapDispatchToProps = {
  dispatchLogIn: logIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeContainer));
