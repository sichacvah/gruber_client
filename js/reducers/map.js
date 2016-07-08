// @flow
// TODO: add flow typecheck;

'use strict';



const initialState = {
  lat: 54.736965,
  lng: 55.970451000000025,
  latDelta: 0.0922,
  lngDelta: 0.0421,
};

function map(state: State = initialState, action: Action) {
  if (action.type === 'SET_CENTER') {
    return {
      ...state,
      lat: action.lat,
      lng: action.lng,
      latDelta: action.latDelta,
      lngDelta: action.lngDelta
    };
  }

  return state;
}


export default map;
