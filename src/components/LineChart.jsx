import React from 'react';
//import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
//import { priceChange } from './Coin';
const { Title } = Typography;

const LineChart = ( { priceChange, currentPrice, coinName }) => {
    return (
    <>
        <Row className='chart-header'>
            <Title className='chart-title'>{coinName} Price Chart</Title>
            <Col level={5} className='price-change'>{priceChange}</Col>
            <Col level={5} className='current-price'>Current {coinName} price is: {currentPrice}</Col>
        </Row>
    </>
  )
};
export default LineChart;