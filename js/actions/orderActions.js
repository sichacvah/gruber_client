// @flow


'use strict';

import type { Dispatch, GetState, Action, ThunkAction } from './types';


export function selectVehicle(vehicleType: Object): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const { api } = getState();
    dispatch({
      type: 'SELECT_VEHICLE_TYPE',
      vehicleType,
      included: api['vehicle-property-types'].data,
    });

  } 
}

export function changePropertyValue(id: string, value: string): Action {
  return {
    type: "CHANGE_PROPERTY_VALUE",
    id,
    value
  };
}

export function setDate(date: Date): Action {
  return {
    type: 'SET_DATE',
    date
  };
}

export function setDuration(duration: number): Action {
  return {
    type: 'SET_DURATION',
    duration
  } 
}


export function setComment(comment: string): Action {
  return {
    type: 'SET_COMMENT',
    comment
  };
}


export function setAddress(address: string): Action {
  return {
    type: 'SET_ADDRESS',
    address
  };
}



