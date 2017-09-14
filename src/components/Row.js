import React from 'react';
import { Row } from 'antd';

export default function CustomRow(props) {
  return (<Row
    style={{
      margin: '12px',
      ...props.style,  // eslint-disable-line
    }}
    {...props}
  >
    {
      props.children // eslint-disable-line
    }
  </Row>);
}
