// @flow

'use strict';

import type { Action } from '../actions/types';

type State = {
  selectedJobType: ?string;
};

const initialState = {
  selectedJobType: null
};


function jobTypesFilter(state: State = initialState, action: Action) {
  if (action.type === 'SELECT_FILTER') {
    return {
      ...state,
      selectedJobType: (action.selectedJobType !== state.selectedJobType ? action.selectedJobType : null)
    };
  } else if (action.type === 'ERASE_FILTERS') {
    return {
      ...state,
      selectedJobType: null
    };
  }
  return state;
}

export default jobTypesFilter;
