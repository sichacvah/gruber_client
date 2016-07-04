// @flow

'use strict';

export type Action =
    { type: 'FIRST_LOADING' }
  | { type: 'RESET_ERRORS' }


export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => Object;
export type ThunkAction = { dispatch: Dispatch, getState: GetState } => any;
