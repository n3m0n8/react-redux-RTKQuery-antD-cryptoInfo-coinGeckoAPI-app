import React/* { useState }*/ from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { /* Select, */ Typography, Row, Col, } from 'antd';
//note I am note using moneycollect and fund because coinGeckoApi doesn't have coin-specific exchange/market data... and anyway it doesn't make any sense to have such data....
import { /*MoneyCollectOutlined,*/ DollarCircleOutlined, /*FundOutlined,*/ExclamationCircleOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, /*Html5Filled */} from '@ant-design/icons';
import { useGetCoinInfoQuery } from '../services/coinGeckoApi';
//import { useGetCoinHistoryQuery, useGetCoinDataQuery } from '../services/coinRankingApi';
//import LineChart from './LineChart';
//import { Line } from 'react-chartjs-2';
const { Title, Text } = Typography;
//const { Option } = Select;

const Coin = () => {
  const { coinName } = useParams();
  console.log(coinName);
  //const  [timePeriod, setTimePeriod] = useState('7d');

  const { data, isFetching, error } = useGetCoinInfoQuery(coinName);
  //const { data: coinIds, fetch, err_ } = useGetCoinDataQuery();
  //const coinUuid = coinIds.data.coins.uuid;
  //const { data: priceChange, fetching, err } = useGetCoinHistoryQuery({ coinUuid, timePeriod });
  //console.log(data);

  if(isFetching /*|| fetching || fetch*/) return "Loading Coin Info";
  //if(!data /*|| !coinIds || !priceChange*/) return "Loading Historical Data";

/*NOTE- as noted in coinRankingApi.js, i had adapted from coinRanking to coinGecko for data calls because the latter allows exchanges and is generally better and open-source... the issue however, at the end of the tutorial regarding time-based calculations is that the coinGecko api doesn't have easy to handle historical data fetching... it has granular, day-to-day prices that could be used to calculate the percentage diff changes as I tried to quickly do below, but as you can see, it becomes heavy and cumbersome- not to mention it uses up more network resource because the longer time period datasets like the 3year (1095 days) and 5 years(1825 days) come in as long JSON files... so I simply created a paralelly RTK query reducer encapsulation var called coinRankingApi where i use coin ranking specifically for the time-period/historical data fetching. ignor the below: 
const time = ['1','7','30','90','365', '1095','1825'];
const firstArrElem = coinHistory.prices[0].toString();
const lastArrElem = coinHistory.prices[-1].toString();
const startPrice = firstArrElem.substring(14, -1);
const endPrice =  lastArrElem.substring(14, -1);
const priceChange = millify(((endPrice-startPrice)/startPrice)*100);
*/
//const time = ['3h', '24h','7d','30d','3m','1y', '3y','5y'];
const movementStats = [
  {
    title: '$USD Price',
    value: `$ ${data.market_data.current_price.usd && millify(data.market_data.current_price.usd)}`,
    icon: <DollarCircleOutlined/> 
  }, 
  {
    title: 'Rank',
    value: `${data.market_cap_rank && millify(data.market_cap_rank)}`,
    icon: <NumberOutlined/> 
  },
  {
    title: '24h Volume',
    value: `$${data.market_data.total_volume.usd && millify(data.market_data.total_volume.usd)}`,
    icon: <ThunderboltOutlined/> 
  },
  {
    title: 'Market Capitalisation',
    value: `$${data.market_data.market_cap.usd && millify(data.market_data.market_cap.usd)}`,
    icon: <DollarCircleOutlined/> 
  },
  {
    title: 'Daily High',
    value: `$${data.market_data.high_24h.usd && millify(data.market_data.high_24h.usd)}`,
    icon: <TrophyOutlined/>, 
  },
  {
    title: 'All Time High',
    value: `$${data.market_data.ath.usd && millify(data.market_data.ath.usd)}`,
    icon: <TrophyOutlined/>, 
  },
];

const marketStats = [
  /*{
    NOT using any of these for coin-speficic purposes... 
    title: 'Number of Markets',
    value: `${data.tickers.map((exchange{exchanges: count(exchange)})}`,
    icon: <FundOutlined/>, 
  },
  {
    title: 'Number Of Exchanges',
    value: `$ ${data.market_data.ath.usd && millify(data.market_data.ath.usd)}`,
    icon: <MoneyCollectOutlined/>, 
  },
  {
    title: 'Approved Supply',
    value: `$ ${data.market_data.ath.usd && millify(data.market_data.ath.usd)}`,
    icon: <ExclamationCircleOutlined/>, 
  },*/
  {
    title: 'Total Supply',
    value: `${data.market_data.total_supply && millify(data.market_data.total_supply)}`,
    icon: <ExclamationCircleOutlined/>, 
  },
  {
    title: 'Circulating Supply',
    value: `${data.market_data.circulating_supply && millify(data.market_data.circulating_supply)}`,
    icon: <ExclamationCircleOutlined/>, 
  },
];


//data.image.small  -- image

  if(error /* || err_ || err*/) return `There was an issue, try again later. ${error /*|| err_ ||err*/ }`;
  return (
    <Col className='coin-detail-container'> 
      <Col className='coin-heading-container'> 
        <Title level={2} className="coin-name">
          {data.name }({data.symbol}) Price
        </Title>
        <p>
          {data.name} live price (USD).
          View stats and market information:
        </p>
        {/* <Select 
        defaultValue="7d" className='select-timeperiod' placeholder="Select Time Period" onChange={(value)=> setTimePeriod(value)}>
          { time.map((period) => 
            <Option key={period}> 
              {period}
            </Option>)}
        </Select>/*}
        {/**here render line chart using chartJS 
        <LineChart priceChange={priceChange} currentPrice={millify(data.price.usd)} coinName={data.name}/>*/}
        <Col className='stats-container' >
          {/**coin related stats  */}
          <Col className='coin-value-statistics'>
            <Col className='coin-value-statistics-heading'>
                <Title value={3} className='coin-details-heading'>
                     {data.name} Coin Stats
                </Title>
                <p>
                  Overview of coin-specific stats for {data.name}.
                </p>
            </Col>
            {movementStats.map( ({ icon, title, value }) => (
                <Col className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>
                      {value}
                  </Text> 
                </Col>
              ) 
            )}
          </Col>
          {/**market related stats  */}
          <Col className='other-stats-info'>
            <Col className='coin-value-statistics-heading'>
                <Title value={3} className='coin-details-heading'>
                     Market Stats for {data.name} 
                </Title>
                <p>
                  Overview of market-related stats relating to {data.name}.
                </p>
            </Col>
            {marketStats.map( ({ icon, title, value }) => (
                <Col className='coin-stats'>
                  <Col className='coin-stats-name'>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className='stats'>
                      {value}
                  </Text> 
                </Col>
              ) 
            )}
          </Col>
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className="coin-details-heading">
              About {data.name}: 
              <br/>
              {HTMLReactParser(data.description.en)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className="coin-details-heading">
              Homepage: {data.links.homepage ? <a href={data.links.homepage}> {data.links.homepage}</a> : `Sorry, this coin has no associated website.`}<br/>
              Forum: { data.links.official_forum_url ? <a href={data.links.official_forum_url}> {data.links.homepage}</a> : `Sorry, this coin has no associated official forum.`}<br/>
              Sub-Reddit: { data.links.subreddit_url ? <a href={data.links.subreddit_url}> {data.links.subreddit_url} </a> : `Sorry, this coin has no subreddit page.`}<br />
              GitHub Repos: { data.links.repos_url.github ? <a href={data.links.repos_url.github.map((repo)=> (<p>{repo} <br/></p>))}> {data.links.repos_url.github}</a> : `Sorry, this coin has no Github repo.`}
          </Title>
        </Col>
      </Col>
    </Col>
  )
}

export default Coin