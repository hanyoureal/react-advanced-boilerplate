import React from 'react';
import { object, string, func } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Col, Form, Input, Card, Button, Alert, Row } from 'antd';
import { Logo } from 'components';
import messages from '../messages';

const propTypes = {
  intl: intlShape.isRequired,
  error: object,
  validation: object,
  username: string,
  password: string,
  onInputChange: func,
  onKeyUp: func,
  onLogIn: func,
};

const defaultProps = {
  hello: 'hello',
  orders: [],
};

function Home(props) {
  const {
    intl,
    error,
    validation,
    username,
    password,
    onInputChange,
    onKeyUp,
    onLogIn,
  } = props;

  let errorMessage;
  if (error && error.errorCode && messages[error.errorCode]) {
    errorMessage = intl.formatMessage(messages[error.errorCode]);
  } else if (error && error.message) {
    errorMessage = error.message;
  } else if (error) {
    errorMessage = intl.formatMessage(messages.default_error);
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Row type="flex" justify="center" align="middle" style={{ padding: '50px' }}>
        <Logo />
      </Row>
      <Row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <Card title={intl.formatMessage(messages.authentication)} style={{ width: '400px' }}>
          { error &&
            <Row type="flex" justify="center" align="middle">
              <Col span={24}>
                <Alert
                  message={errorMessage}
                  type="error"
                />
              </Col>
            </Row>
          }
          <Form onSubmit={onLogIn}>
            <Form.Item
              style={{ marginTop: 20 }}
              label={intl.formatMessage(messages.username)}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              validateStatus={validation.username.status}
              help={validation.username.help}
              hasFeedback={validation.username.hasFeedback}
            >
              <Input
                size="large"
                name="username"
                placeholder={intl.formatMessage(messages.username)}
                value={username}
                onChange={onInputChange}
                onKeyUp={onKeyUp}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage(messages.password)}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              validateStatus={validation.password.status}
              help={validation.password.help}
              hasFeedback={validation.password.hasFeedback}
            >
              <Input
                size="large"
                name="password"
                type="password"
                placeholder={intl.formatMessage(messages.password)}
                value={password}
                onChange={onInputChange}
                onKeyUp={onKeyUp}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 18, offset: 6 }} style={{ marginTop: 40 }}>
              <Button type="primary" onClick={onLogIn}>
                {intl.formatMessage(messages.submit)}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default injectIntl(Home);
