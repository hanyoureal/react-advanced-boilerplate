import React from 'react';
import { array } from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Alert } from 'antd';
import messages from '../messages';

const propTypes = {
  intl: intlShape.isRequired,
  errors: array,
};

const defaultProps = {
  errors: [],
};

function Home(props) {
  const {
    intl,
    errors,
  } = props;

  const errorsToDisplay = errors.splice(0, 3);
  return (
    <div>
      {errorsToDisplay.map((error, idx) => {
        let message;

        if (error.errorCode && messages[error.errorCode]) {
          message = intl.formatMessage(messages[error.errorCode]);
        } else if (error.message) {
          message = error.message;
        } else {
          message = intl.formatMessage(messages.defaultError);
        }

        return (
          <Alert
            key={`error-${idx}`}
            message={message}
            onClose={error.onClose}
            closable={!!error.onClose}
            type={error.type}
          />
        );
      })}
    </div>
  );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default injectIntl(Home);
