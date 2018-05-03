import { WEBSOCKET_ERROR, WEBSOCKET_MESSAGE, WEBSOCKET_SEND } from './websocket';

export const QUERY_START = 'QUERY:START';
export const QUERY_RESULT = 'QUERY:RESULT';
export const QUERY_DONE = 'QUERY:DONE';
export const QUERY_ERROR = 'QUERY:ERROR';

export default ({ dispatch, getState }) => next => (action) => {
  const { type, payload } = action;
  const { query } = getState();

  switch (type) {
    case WEBSOCKET_SEND:
      if (payload.data && payload.data.query) {
        dispatch({
          type: QUERY_START,
          payload: payload.data.query,
        });
      }
      break;

    case WEBSOCKET_MESSAGE:
      if (payload.error) {
        dispatch({
          type: QUERY_ERROR,
          payload: payload.error,
        });
      }
      if (payload.query !== query) {
        break;
      }
      if (payload.results) {
        dispatch({
          type: QUERY_RESULT,
          payload: payload.results || [],
        });
      }
      if (payload.done) {
        dispatch({
          type: QUERY_DONE,
        });
      }
      break;

    case WEBSOCKET_ERROR:
      dispatch({
        type: QUERY_ERROR,
        payload,
      });
      break;

    default:
      break;
  }
  next(action);
};
