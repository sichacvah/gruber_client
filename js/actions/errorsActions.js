// @flow

'use strict';


import type { Action } from './types';


export function resetErrors() {
  return {
    type: 'RESET_ERRORS'
  };
}


export function handleError(e) {
  console.log('ERROR');
  console.log(e);
  return {
    type: "HANDLE_ERROR"
  }
}
