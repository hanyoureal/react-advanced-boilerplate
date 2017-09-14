import React from 'react';
import { array } from 'prop-types';
import { Card } from 'antd';

const propTypes = {
  orders: array,
};

const defaultProps = {
  hello: 'hello',
  orders: [],
};

function Home(props) {
  const {
    orders,
  } = props;

  return (
    <Card title="Orders">
      {orders.map((order, idx) => (<div key={`order-${idx}`}>{order.estimatedPrice}</div>))}
    </Card>
  );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
