// @flow


'use strict';

import type { Action } from './types';

export function selectJobType(selectedJobType: string): Action {
  return {
    type: "SELECT_FILTER",
    selectedJobType
  };
}

export function eraseFilters(): Action {
  return { type: 'ERASE_FILTERS' };
}


