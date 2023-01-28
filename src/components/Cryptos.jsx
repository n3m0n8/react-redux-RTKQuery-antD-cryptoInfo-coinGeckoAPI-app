import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCoinsInfoQuery } from '../services/coinGeckoApi';
import millify from 'millify';

const Cryptos = ( /*{should be passed as prop but bugs out on window reload -i.e. if we deploy {coinsPeek} prop, it will work the first time, but then bug out on reload} -- UPDATE, actuall it bugs out whether or not there is the prop... it seems to be that it works perfectly fine on first compilation and then a reload makes it but out... coudl it have to do with the API limiter? Too many requestions in a minute perhaps? UPDATE - not related to API limiter/requests... this is something to do with memory state on reloads... its very strange and buggy - sometiems it works on multiple reloads. other times it breaks and i have to tinker the coinspeak arg to the right */{ coinsPeek }) => {


    // set a number of cryptos to show... we do a check by using a custom prop on this cryptos component called coinsPeek. If it's value is set to "true" then we get the we will get only top 10 cryptos, otherwise we get top 50 (i.e. we see the full cryptos page view).
  const coinsToShow = coinsPeek ? 8 : 50;
  /* Nothing works ... ridiculous typical labyrthine react...   
  let coinsToShow = null;
  if (coinsPeek === true){
    coinsToShow = 10;
  }
  else{
    coinsToShow = 50;
  };
  UPDATE- SOmehow this setup is working but it is unstable.. it works only on loading as mentioned above.
  */ 
  const { data: cryptosList, isFetching, error } = useGetCoinsInfoQuery(coinsToShow);
  //const coins = useState(JSON.stringify(data));  // if i stringify the data, then we get an object and useState works... BUT... then the map() function doesnt work and Object.keys doesn't lead anywhere in terms of iterating through the inidivudal coin object properties...]
  // but if we pass the api data array into useState, the opposite happens. we can iterate, but it all comes out as "undefined"... typically ridiculous time-killer issues that never occure with VUE, let alone PHP.
  const [ cryptos, setCryptos ] = useState(cryptosList); 
//define search for cryptos to show on filter:
      const [ searchTerm, setSearchTerm ] = useState('');

 

  // useEffect deployed for the Search through the coins data:
  useEffect(()=>{
    //setCryptos(data);
    const filteredData = cryptosList.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  //const coin =coins[Object.keys(coins)[0]]; st
  //console.log(coin);
  //const [coins /*, setCryptos*/] = useState(data);  In tutorial,javascriptMastery deployed this useState() method....However, although this worked with his deployment of a custom function that was defined in the RTK Query class (named cryptoAPI in this current effort), it seems pointless... The react documentation says that :" The only argument to the useState() Hook is the initial state. Unlike with classes, the state doesn’t have to be an object." In this case, we don't have a data object that is consistently changing because of what WE are doing... it self-updates the crypto prices/info on the basis of whatever th API is doing.... it's not required to useState- there is only one state for the purposes of hte frontend app, that stat is whatever data state the api info is coming in as. deploying useState crashes the api ... obviously because then there is an expectation that the data container var is to be shifting state...  but it's not shiftin on the frontend of our app, its shifting over there at coinGecko's api.
  if(isFetching) return "Loading Crypto Data";
  if(error) return `There was an issue, try again later. ${error}`;
  //console.log(`error: ${error}`);
  //console.log(`coins array: ${data}`);
  //console.log(`bitcoin: ${data.id}`);
  return (
    <>
    {!coinsPeek && (
        <div className="search-crypto">
        <Input placeholder="Search For a Cryptocurrency" onChange={(event)=> setSearchTerm(event.target.value)}></Input>
    </div>
    )}

        <Row gutter={[4, 0]}  className="crypto-card-container">
            {cryptos.map((coin)=>(
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
                    <Link to={`/coin/${coin.id}`}>
                        <Card title={`${coin.market_cap_rank}. ${coin.name}`} extra={<img className='crypto-image' alt="Cryptocurrency Icon" src={coin.image}/>}
                        hoverable>
                            <p>Price: {millify(coin?.current_price)}</p>
                            <p>MarketCap: {millify(coin?.market_cap)}</p>
                            <p>Daily Change: {millify(coin?.price_change_percentage_24h)}%</p>
                        </Card>
                  </Link>
                </Col>
            ))}
        </Row>    
    </>
  )
}

export default Cryptos