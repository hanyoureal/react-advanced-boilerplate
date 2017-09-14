import React, { Component } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { getErrors } from '../selectors/errorSelectors';
import { popError } from '../stores/errorStore';
import Error from '../components/Error';

const propTypes = {
  errors: object.isRequired,
  dispatchPopError: func,
};

const defaultProps = {
  errors: {},
};

class HomeContainer extends Component {
  getErrors() {
    const {
      errors,
      dispatchPopError,
    } = this.props;

    const errorsArr = Object.keys(errors).map((key) => ({
      ...errors[key],
      onClose: () => dispatchPopError(errors[key]),
      type: 'error',
    }));

    return errorsArr;
  }

  render() {
    return (
      <Error errors={this.getErrors()} />
    );
  }
}

HomeContainer.propTypes = propTypes;
HomeContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

const mapDispatchToProps = {
  dispatchPopError: popError,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
