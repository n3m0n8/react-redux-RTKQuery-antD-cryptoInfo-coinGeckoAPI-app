import React from 'react'
//millify is package for formating numbers/currencies
import {millify} from  'millify'; 
// import linked pages/simplified views components:
import Cryptos from './Cryptos';
import News from './News';

// import antd components:
import {Typography, Row, Col, Statistic} from 'antd';
import { Link } from 'react-router-dom';
// import the RTK Query encapsulated getCrypto object's getCoinInfo query for use in this component to deploy coins api data: 
import { useGetGlobalInfoQuery, /* useGetCoinInfoQuery, /* useGetExchangeInfoQuery,*/} from '../services/coinGeckoApi';

//create alias consts for antD components for shorthand:
const { Title } = Typography;

const Homepage = () => {
  // in the compilation block of our react hook/class function (before the return runtime exec method below) we define for deployment our RTK Query -produced api hooks, with conditionals (in this case a loading conidtion if we have a slow connection/data is slow)
  // note i added an error destructured object here on left hand assignment of the incoming api data ... to output an error message in case of error. 
  //all below is deprecated... based on the coinranking API which was causing a cors header issue (not sent unless signed up for non-free account) 
  //const { data, isFetching, error } = useGetCoinInfoQuery(/*10*/);
  //if (isFetching) return 'Loading...';
  //if (error) return 'Sorry, Something Went Wrong. Try again later.';
  //console.log(data);
  // assign a globalstats var to hold the incoming coinsinfo api fetched data. The questionmark syntax seems to be particular to this particular api or mybe shorthand for navigating json... i can't be bothered to check...

  // NEW CONSTRUCT USING THE coinGEKCKO API :
  // HERE WE WILL PULL TWO SEPARATRTK QUERY METHDS : ONE FOR GLOBAL TO SHOW THE GLOBAL INFORMATION R ELATING TO THE MARKETY CAP AND NAOTHER FOR TOP COINS BY USD MARKET CAP, THE REASON FOR THIS SEPARATIO NOF TWO API CALLS IS THAT COIN GECK PROVIDES THIS DATA SEAPARTELY UNLIKE COINRANKING (BUT HOPEFULLY CORS WORKS)
  //FIRST THE GLOBAL DATA FOR THE HOMEPAGE TOP SECTION 
const { data: globalstats, isFetching, error } = useGetGlobalInfoQuery();
  if (isFetching) return 'Loading...';
  if (error) return 'Sorry, Something Went Wrong. Try again later.';
  //console.log(`${globalstats.data.active_cryptocurrencies}`);

  //SECOND THE TOP COINS DATA, WITH THE INPUTED 10 NUMBER BECAUSE HERE, UNLIKE CRYPTOS.JSX page, WE ARE ONLY SHOWING THE TOP 10 COINS INSTEAD OF TOP 50.
/*
  const {data: top10, isFetchin, err } = useGetCoinInfoQuery(10);
  if (isFetchin) return 'Loading...';
  if (err) return 'Sorry, Something Went Wrong. Try again later.';
  console.log(top10);
*/
  //const globalstats = data;
  //const top10 = top10Data;

  return (
    <>
      <Title level={2} className="heading"> Global Crypto Statistics </Title>
      <Row>
        {/**span is an attribute of antd table. the total possible span is 24 column spaces... so here we are creating  table with 12 column spaces i.e. using up half of vw */}
        <Col span={12}><Statistic  title="Total Cryptocurrencies" value={globalstats.data.active_cryptocurrencies}/></Col>
        {/*we use milifiy library here om to reduce the splaying out of larg numbers in the thousands/millions...*/}
        <Col span={12}><Statistic  title="Total Exchanges" value={millify(globalstats.data.markets)}/></Col>
        <Col span={12}><Statistic  title="Total Market Cap" value={millify(globalstats.data.total_market_cap.usd)}/></Col>
        <Col span={12}><Statistic  title="Total 24h Volume" value={millify(globalstats.data.total_volume.usd)}/></Col>
        {/* <Col span={12}><Statistic  title="Total Markets" value={millify(globalstats.totalMarkets)}/></Col> commented out because market and exchange are one and the same thing in cryptoworld*/}
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies.</Title>
          &nbsp;&nbsp;
          <Cryptos coinsPeek />
          <Title level={5} className="show-more">
          <Link to="/cryptos">See More</Link></Title>
          {/**We are indeed deploying a 'simplified' view of our other page components by passing the coinsPeek prop... this allows us to create a view /preview of what awaits on full page. */}
      </div>
      <div className='home-heading-container'>
        <Title level={2} className="home-title">
          Latest Crypto News.</Title>
          &nbsp;&nbsp;
          <News newsPeek/>
          <Title level={5} className="show-more">
          <Link to="/news">Read More</Link></Title>
      </div>
    </>
  )
}

export default Homepage