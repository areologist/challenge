import Sockette from 'sockette';

export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT';
export const WEBSOCKET_RECONNECT = 'WEBSOCKET:RECONNECT';

export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED';
export const WEBSOCKET_RECONNECTING = 'WEBSOCKET:RECONNECTING';
export const WEBSOCKET_MAXATTEMPT = 'WEBSOCKET:MAXATTEMPT';
export const WEBSOCKET_ERROR = 'WEBSOCKET:ERROR';

const jsonTryParse = (json) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return json;
  }
};

const createWebsocket = (dispatch, url) => new Sockette(url, {
  timeout: 30,
  // maxAttempts: 50,
  onopen: e => dispatch({ type: WEBSOCKET_OPEN, payload: e }),
  onmessage: e => dispatch({ type: WEBSOCKET_MESSAGE, payload: jsonTryParse(e.data) }),
  onreconnect: e => dispatch({ type: WEBSOCKET_RECONNECTING, payload: e }),
  onmaximum: e => dispatch({ type: WEBSOCKET_MAXATTEMPT, payload: e }),
  onclose: e => dispatch({ type: WEBSOCKET_CLOSED, payload: e }),
  onerror: e => dispatch({ type: WEBSOCKET_ERROR, payload: e }),
});

const createMiddleware = () => {
  let ws;

  return ({ dispatch }) => next => (action) => {
    const { type, payload } = action;
    switch (type) {
      case WEBSOCKET_CONNECT:
        if (ws) {
          ws.close();
          ws = null;
        }
        ws = createWebsocket(dispatch, payload);
        break;
      case WEBSOCKET_SEND:
        ws.send(JSON.stringify(payload));
        break;
      case WEBSOCKET_DISCONNECT:
        ws.close();
        break;
      case WEBSOCKET_RECONNECT:
        ws.close();
        ws.reconnect();
        break;
      default:
        break;
    }
    next(action);
  };
};

export default createMiddleware();

export const open = url => ({
  type: WEBSOCKET_CONNECT,
  payload: url,
});

export const close = () => ({
  type: WEBSOCKET_DISCONNECT,
});

export const send = message => ({
  type: WEBSOCKET_SEND,
  payload: {
    timestamp: new Date(),
    data: message,
  },
});
