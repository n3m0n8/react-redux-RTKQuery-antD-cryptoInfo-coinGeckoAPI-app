import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Input } from 'antd';
import { useGetExchangeInfoQuery } from '../services/coinGeckoApi';
//import millify from 'millify';

const Exchanges = () => {

  const {data: exchangesList, isFetching, error } = useGetExchangeInfoQuery();
  
  const [ exchanges, setCryptos ] = useState(exchangesList); 
//define search for cryptos to show on filter:
      const [ searchTerm, setSearchTerm ] = useState('');
  // useEffect deployed for the Search through the coins data:
  useEffect(()=>{
    //setCryptos(data);
    const filteredData = exchangesList.filter((exchange) => exchange.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [exchangesList, searchTerm]);

  if(isFetching) return "Loading Exchange Data";
  if (!exchangesList) return "Loading Exchange Data";
  if(error) return `There was an issue, try again later. ${error}`;
 
  return (
    <>
    {exchangesList && (
        <div className="search-crypto">
        <Input placeholder="Search For an Exchange" onChange={(event)=> setSearchTerm(event.target.value)}></Input>
    </div>
    )}
        <Row gutter={[4, 0]}  className="crypto-card-container">
            {exchanges.map((exchange)=>(
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={exchange.id}>
                        <Card title={`${exchange.name}. ${exchange.name}`} extra={<img className='crypto-image' alt="Cryptocurrency Icon" src={exchange.image}/>}
                        hoverable>
                            <p>Country: {exchange?.country}</p>
                            <p>Founding Year: {(exchange?.year_established)}</p>
                            <p>CoinGecko Trust Score Rank: {exchange?.trust_score_rank}</p>
                        </Card>
                </Col>
            ))}
        </Row>    
    </>
  )
}

export default Exchanges