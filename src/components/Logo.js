import React from 'react';
import { Row } from 'antd';
import LogoImg from 'assets/images/Logo.png';

export default function CustomRow(props) {
  return (
    <Row type="flex" justify="center" align="middle" style={{ padding: '50px' }}>
      <img src={LogoImg} alt="Logo" />
    </Row>
  );
}
