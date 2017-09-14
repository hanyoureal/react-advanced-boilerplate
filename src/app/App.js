import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import MainContainer from 'modules/main/MainContainer';
import 'antd/dist/antd.css';
import 'assets/styles/styles.scss';
import store from './store';

export default function App() {
  const locale = navigator.language;

  let messages;
  try {
    messages = require(`messages/${locale}.json`); // eslint-disable-line
  } catch (e) {
    messages = require('messages/en-US.json'); // eslint-disable-line
  }

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages}>
        <MainContainer />
      </IntlProvider>
    </Provider>
  );
}
