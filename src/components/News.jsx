import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsInfoQuery } from '../services/newsAPI';
import { useGetCoinsInfoQuery } from '../services/coinGeckoApi';
//destructuree (i.e. granular selection of elements from AntD class (in this case Typography))
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = "https://i0.wp.com/wetalkstartups.com/wp-content/uploads/2022/02/crypto.jpg";

const News = ( { newsPeek }  ) => {
  /// COMPILATION
  const count = newsPeek ? `count=5` : `count=12`;
  const [ newsCategory, setNewsCategory ] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching, error } = useGetNewsInfoQuery(newsCategory, count);
  const { data } = useGetCoinsInfoQuery(50);
  //console.log(cryptoNews);

  if(isFetching) return "Loading Crypto News";
  if(!cryptoNews?.value) return "Loading Crypto News";
  if(error) return `There was an issue, try again later. ${error}`;

  ///RUNTIME
  return (
    <Row gutter={[0, 18]}>
      {!newsPeek && (
        <Col span={24}>
          <Select showSearch  className='select-news' placeholder="Select a crypto" optionFilterProp='children' onChange={(value)=> setNewsCategory(value)} filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, index)=>(
        <div className='news-card-container'> 
        <Col xs={24} sm={16} lg={10} key={index}>
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth:"200px", maxHeight:"100px" }}src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"></img>
              </div>
              <p>
                  {news.description > 100 
                    ? `${news.description.substring(0,100)}...` 
                    : news.description 
                  }
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
        </div>
      ))}
    </Row>
  )
}

export default News