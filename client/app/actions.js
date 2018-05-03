import { send } from './middleware/websocket';

export const VIEW_CHANGE = 'VIEW:CHANGE';

export const QUERY_START = 'QUERY:START';
export const QUERY_RESULT = 'QUERY:RESULT';
export const QUERY_DONE = 'QUERY:DONE';
export const QUERY_ERROR = 'QUERY:ERROR';

export { open } from './middleware/websocket';

export const changeView = view => ({
  type: VIEW_CHANGE,
  payload: view,
});

export const search = query => send({ query });

export const cancel = () => ({ type: QUERY_DONE });
