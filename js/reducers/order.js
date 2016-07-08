// @flow

'use strict';

import type { Action } from '../actions/types';

// TODO: Refactor types
type Attribute = {
  name: string;
};

export type State = {
  attributes: {
    "vehicle-properties": Array<Object>;
    address: string;
    lat: string;
    lng: string;
    date?: Date;
    duration: number;
  };
  relationships: {
    "vehicle-type": {
      data: ?VehicleType;
    };
  };
  type: string;
};

const initialState = {
  attributes: {
    "vehicle-properties": [],
    address: "",
    lat: "",
    lng: "",
    duration: 1,
    date: new Date(Date.now()),
  },
  relationships: {
    "vehicle-type": {
      data: null,
    },
  }
};

function property(state: Object = {}, action: Action) {
  if (action.type === 'CHANGE_PROPERTY_VALUE') {
    if (action.id === state.id) {
      return {
        ...state,
        value: action.value,
      };
    }
    return state;
  }
  return state;
}

function vehicleProperties(state: {}, action: Action) {
  if (action.type === 'SELECT_VEHICLE_TYPE') {
    return {
      ...state.attributes,
      id: state.id,
      type: state.type,
      value: (state.attributes["value-type"] === 'boolean' ? null : "0")
    };
  } else if (action.type === 'CHANGE_PROPERTY_VALUE') {
    if (action.id !== state.id) {
      return state;
    }
    return {
      ...state,
      value: action.value,
    };
  }
  return state;
}


function order(state: State = initialState, action: Action) {
  if (action.type === 'SELECT_VEHICLE_TYPE') {
    const availableProperties = action.vehicleType.relationships["vehicle-property-types"].data.map((i) => i.id);
    return {
      ...state,
      relationships: {
        "vehicle-type": {
          data: {
            id: action.vehicleType.id,
            type: action.vehicleType.type
          },
        },
      },
      attributes: {      
        ...state.attributes,
        "vehicle-properties": action.included.filter((p) => availableProperties.includes(p.id)).map((p) => vehicleProperties(p, action)),
      }
    };
  } else if (action.type === 'CHANGE_PROPERTY_VALUE') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        "vehicle-properties": state.attributes["vehicle-properties"].map((p) => vehicleProperties(p, action)),
      }
    };
  } else if (action.type === 'SET_DATE') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        date: action.date
      },
    };
  } else if (action.type === 'SET_DURATION') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        duration: action.duration,
      }
    }
  }
  return state;
}

export default order;
