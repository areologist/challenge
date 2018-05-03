import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducer';
import middleware from './middleware';

const store = createStore(reducer, middleware);
const url = process.env.CHALLENGE_CLIENT_WSS_URL || 'ws://localhost:8080';

ReactDOM.render((
  <Provider store={store}>
    <App url={url} />
  </Provider>), document.getElementById('root'));

registerServiceWorker();
