import React from 'react';
// router imports:
import { Routes, Route, Link } from 'react-router-dom';
//import stylings from antD package:
import { Layout, Typography, Space } from 'antd';

// import second-order components into first-order  App.js component but do so using the index.js imports objects namespace. We can now import these various second-order components more easily via destructure statement pointing to the source of the index.js namespace , i.e. the present directory (/components)
import { Navbar, Homepage, Cryptos, Coin, Exchanges, News } from './components/';
import "./App.css" ;
const App = () => {
  return (
    <section className='app'>
          <span className='navbar'>
            <Navbar />
          </span>
        <main className='main'>
          {/**import ant design layout component */}
          <Layout>
            {/**Routes class div which switches the fetched URI endpoints on basis of routes. Using a react router switch allows multiple routes, similar to real life switch extending router-base LAN */}
            <div className='routes'> 
            {/**NOTE that since React Router v6 release this year, we have a different construct... instead of a <Switch> arrray with various routes that have the components being routed injected within the <Route></Route> fragment, there is instead he use of a singular <Routes> array which then only has one <Route /> fragement. That fragment then takes the path or exact path as an attribute, and a further attirbutes such as the element={<componentName />} */}
            <Routes>
              <Route exact path="/" element={<Homepage />} /> 
              <Route exact path="/cryptos" element={<Cryptos coinsPeek="" />} />
              {/**Note the use of : to demarcate a dynamic injection of variable into route path... similar to laravel with /{{$dynamicVariable}} */}
              <Route exact path="/coin/:coinName" element={<Coin />} /> 
              <Route exact path="/exchanges" element={<Exchanges />} /> 
              <Route exact path="/news" element={<News />} /> 
            </Routes>
            </div>
          </Layout>
            <span className='footer'>
            {/**Note that level is a particular attribute of antD components. The style attributes are passed as a destructured object list. */}
              <Typography.Title level={5} style={{ color: "white", textAlign:"center" }}>
              &copy; CryptoUpdates <br />
              All Rights reserved. 
              </Typography.Title>
              <Space>
                <Link to="/">Homepage</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
              </Space>
            </span>
        </main>
    </section>
  );
}

export default App