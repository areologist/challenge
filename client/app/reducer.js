import {
  WEBSOCKET_OPEN,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_ERROR,
} from './middleware/websocket';
import {
  QUERY_START,
  QUERY_RESULT,
  QUERY_DONE,
  QUERY_ERROR,
  VIEW_CHANGE } from './actions';

const initialState = {
  query: null,
  results: [],
  searching: false,
  view: 'both',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case WEBSOCKET_OPEN:
      return { ...state, ready: true, error: undefined };
    case WEBSOCKET_DISCONNECT:
      return { ...state, ready: false };
    case WEBSOCKET_ERROR:
      return { ...state, ready: false, error: payload };

    case VIEW_CHANGE:
      return { ...state, view: payload };

    case QUERY_START:
      return {
        ...state,
        error: undefined,
        query: payload,
        results: [],
        searching: !!payload,
      };
    case QUERY_RESULT:
      return {
        ...state,
        results: [
          ...state.results,
          ...payload,
        ],
      };
    case QUERY_DONE:
      return {
        ...state,
        query: null,
        searching: false,
      };
    case QUERY_ERROR:
      return {
        ...state,
        error: payload,
        searching: false,
      };

    default:
      return state;
  }
};
