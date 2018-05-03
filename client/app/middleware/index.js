import { applyMiddleware, compose } from 'redux';
import geoquery from './geoquery';
import websocket from './websocket';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

export default composeEnhancers(applyMiddleware(websocket, geoquery));
