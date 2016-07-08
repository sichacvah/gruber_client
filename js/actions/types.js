// @flow

'use strict';

export type Action =
    { type: 'FIRST_LOADING' }
  | { type: 'RESET_ERRORS' }
  | { type: 'SWITCH_TAB', tab: string }
  | { type: 'SELECT_FILTER', selectedJobType: string }
  | { type: "ERASE_FILTERS" }
  | { type: 'CHANGE_PROPERTY_VALUE', id: string, value: string }
  | { type: 'SELECT_VEHICLE_TYPE', vehicleType: Object, included: Array<Object> }
  | { type: 'SET_DATE', date: Date }
  | { type: 'SET_DURATION', duration: number }


export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => Object;
export type ThunkAction = { dispatch: Dispatch, getState: GetState } => any;
