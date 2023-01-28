import React from 'react';
import { Link } from 'react-router-dom';
// ant design imports:
import { /*Button,*/ Menu, /* Topography,*/ Avatar, Typography } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, /*MenuOutlined*/} from '@ant-design/icons'; 

// remember that these hook functions are basically the same as enpackted class-based functions... i.e. whatever comes before the return statemnt relates to the compilation of this Navbar class which is being held/defined in this Navbar jsx namespace. What comes under the scope of the return block will be the runtime execution of this class... i.e. the injection of its compiled elements into wherever this component is being deployed in our App.js 'higher order' namespace which itself is a hookfunction/component being injected into index.html. 
// note here also the imports of various other pre-defined/internal/external namespaces/component classes such as the router or, in this case these antd components  which we can usefully deploy in our current Navbar component hook runtime.
//import the icon:
import cryptoIcon from '../assets/cryptos_icon.png';
const Navbar = () => {
  
  // COMPILATION BLOCK
  // antd menu new construct -- NOTE I AM STUCK ON HOW TO MAKE THE onClick event listener propagate to a react router link redirect... I want to use the Link to stay within concept of this tutorial instead of using a vanilla js redirect.
  // declare a constand that holds an array of the items of the menu. each element of that array is a menu item, each holding the properties and functions and css className as attributes of the object. 
  //Functions that are called within the object's relevant function property are defined first: 
 /*
let direction = null;
async function navigate(data){
  await data;
  const direction = `/${antMenuItems.data}`;
  console.log(direction);
  return direction;
}
async function navHome(data){
  await data;
  console.log(data);
  <Link to={data}/>;
}
// here we prepare the antd-related icons also to be packed into our navigation items  array 
const antdIcons = {
  homeIcon: <HomeOutlined/>,
  cryptosIcon: <FundOutlined/>,
  exchangeIcon: <MoneyCollectOutlined/>,
  newsIcon: <BulbOutlined/>,
}

  //then the array construct holding menu items, which we deploy in the runtime block using the antD <Menu> </Menu> component declaration and using that component's items attitube (passing it the antMenuItems array in this case).
  const antMenuItems = [
    //{
      // we don't need two levels deep - only if we want the menu to pop out with the various nav links being show on hover...
      //label: 'Navigation',
      //children: [
    {
          label: 'Home',
          key: '',
          onClick: navHome('/'),
          icon: antdIcons.homeIcon,
        },
    {
          label: 'CryptoInfo',
          key: 'Cryptos',
          onClick: <Link to="/cryptos" />,
          icon: antdIcons.cryptosIcon,
        },
    {
          label: 'Exchanges',
          key: 'Exchanges',
          onClick: <Link to="/exchanges" />,
          icon: antdIcons.exchangeIcon,
        },
    {
          label: 'News',
          key: 'News',
          onClick: <Link to="/news" />,
          icon: antdIcons.newsIcon,
        },
      //],
    //},
  ];
*/
  // RUNTIME RETURN
  return (
    <div className='nav-container'>
        <div className='logo-container'>
            {/*Remember that JSX comments are like this... jsx being a react virtual DOM rendering of HTML with the react engin injections being carried out as an overlay/controller overriding HTML relationship to DOM? */}
            {/*these Avatar typography etc components are all prebuilt components from antd library */}
            <Avatar src={cryptoIcon} size="large" />
            <Typography.Title level={2} className="logo">
                {/*react router kind of works like a normal real life router, and somewhat like laravel routing. A link can serve up a static route, which is what we are doing here, but dynamic routing can also be deployed (although not as smoothly as laravel)*/}
                <Link to='/'>CryptoUpdates</Link>
            </Typography.Title>
                {/*</div></div><button className='menu-control-container'></button></>*/} 
        </div>
        {/**End of logo container start of nav menu. menu component is imported from antd 
         * NOTE in the tutorial, he is using an older deprecated construct for AntD. It still works now but there is a warning in the console saying: `children will be removed` use `items` instead... basically antd is requiring that we first compile the menu and it's menu items as an array that includes a key to differentiate each menu item... which is an expected practice for JS to differentiate from each of the  members of the menu list. So, above here, above the runtime return statement of this hook/component class function, within the compilation section, we find the organisation of these menu items. And below the previously used Antd construct, we find the newer construct for the next antd version. */}
        <Menu theme="dark">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="cryptos" icon={<FundOutlined />}>
            <Link to="/cryptos">CryptoInfo</Link>
          </Menu.Item>
          <Menu.Item key="exchanges" icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item key="news" icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>   
        </Menu>
        {/*<Menu mode="vertical" items={antMenuItems} />;*/}
        {/*<Link to={direction} />*/}
    </div>
  )
}

export default Navbar