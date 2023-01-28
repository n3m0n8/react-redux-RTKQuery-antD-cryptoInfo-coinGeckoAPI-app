import React from 'react';
import ReactDOM from 'react-dom/client'; //note since react 18 we import react dom from /client
import { BrowserRouter as Router } from 'react-router-dom';
// import the provider class from redux to allow pipelining of the store destructured redux-axios api middleware class-instance into our app.
import { Provider } from 'react-redux';

import App from  './App';
// import redux store 'middleware/intermediary' provider class instance object for wrapping into our routed app.
import store from './app/store';
// import the antd.css (note this construct is deprecated in antD v5 so I have just followed guidelines and imported reset from the dist directory... but this is having no impact and I have had to tinker with the app.css file directly for fixing layout/presentation issues...)
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));/*if using typescript we would also declare its type as HtmlElement)  */
root.render(
    <React.StrictMode>{/**this is a helper wrapper that makes explicit and deploys to the browser frontend any issues with the code that we would normally have to find in the console or using a react dev extension... similar to laravel's error output console (although not as nice) */}
    {/**wrap the store provider object around our react app router to allow pipelining of axios-fetched, redux-intermediated data */}
        <Provider store={store}>
            <Router> {/**any use of link or other routing element need to have the app wrapped by a router construct */}
                <App />
            </Router>
        </Provider>    
    </React.StrictMode>
);


/* below is React 17 and back boilerplate injection. above is react18 and above 
ReactDOM.render(
<router>
    <App />, document.getElementById('root')
</router>
); */