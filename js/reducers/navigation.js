// @flow

'use strict';

import type { Action } from '../actions/types';

export type Tab = 'history' | 'order';


export type State = {
  tab: Tab;
};


// TODO: ask. need 'order' or 'history' ?
const initialState = {
  tab: 'order',
};

function navigation(state: State = initialState, action: Action) {
  if (action.type === 'SWITCH_TAB') {
    return {
      ...state,
      tab: action.tab
    };
  }

  return state;
}


export default navigation;
