import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { getOrders } from '../selectors/homeSelectors';
import { loadOrders } from '../stores/homeStore';
import Home from '../components/Home';

const propTypes = {
  orders: array,
  dispatchLoadOrders: func,
};

const defaultProps = {
  hello: 'hello',
  orders: [],
};

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatchLoadOrders();
  }

  render() {
    const {
      orders,
    } = this.props;

    return (
      <Home orders={orders} />
    );
  }
}

HomeContainer.propTypes = propTypes;
HomeContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  orders: getOrders(state),
});

const mapDispatchToProps = {
  dispatchLoadOrders: loadOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
