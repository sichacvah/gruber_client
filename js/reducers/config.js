// @flow

'use strict';

import type { Action } from '../actions/types';

export type GruberConfig = {
  firstLoading: boolean;
  version: string;
};


const initialState: GruberConfig = {
  firstLoading: true,
  version: 'v1',
};


function gruberConfig(state: GruberConfig = initialState, action: Action) {
  if (action.type === 'API_VERSION_READ') {
    return { ...state, version: action.version  };
  } else if (action.type === 'FIRST_LOADING') {
    return { ...state, firstLoading: false };
  }
  return state;
}

export default gruberConfig;
