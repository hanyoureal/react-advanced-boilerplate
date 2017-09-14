import React from 'react';
import { array } from 'prop-types';
import { Navigation } from 'modules/navigation';
import { ErrorContainer } from 'modules/error';
import { Layout, Card } from 'antd';

const { Header, Content, Footer } = Layout;

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
    <Layout style={{ minHeight: '100vh' }} className="ant-layout-has-sider">
      <Navigation />
      <Layout>
        <Header style={{ background: '#ececec', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <ErrorContainer />
          <Card title="Orders">
            {orders.map((order) => (<div>{order.estimatedPrice}</div>))}
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Bliss Delivery ©2017
        </Footer>
      </Layout>
    </Layout>
  );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
