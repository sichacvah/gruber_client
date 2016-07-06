// @flow

'use strict';

export type JsonApiError = {
  id?: number;
  links?: Object;
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: string;
  meta?: Object;
  endpoint?: string;
};


export type State = {
  error?: JsonApiError;
};

const initialState = {
  error: null
};

function errors(state?: State = initialState, action) {
  if ((action.type === 'API_CREATE_FAILED' ||
      action.type === 'API_READ_FAILED' ||
      action.type === 'API_UPDATE_FAILED' ||
      action.type === 'API_DELETE_FAILED'
     ) && action.payload.title) {
     return { ...state, error: action.payload };
  } else if (action.type === 'RESET_ERRORS') {
     return { ...state, error: null }
  }
  return state;
}


export default errors;
