// @flow

'use strict';


import type { Action } from './types';


export function resetErrors() {
  return {
    type: 'RESET_ERRORS'
  };
}

