// @flow

'use strict';

import type { Action } from '../actions/types';

// TODO: add flow types
const initialState = {
  attributes: {
    "vehicle-properties": [],
    address: "",
    lat: "54.736965",
    lng: "55.970451000000025",
    aproximate_hours: 1,
    time: new Date(Date.now()),
    comment: "",
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


function order(state = initialState, action: Action) {
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
        time: action.date,
      },
    };
  } else if (action.type === 'SET_DURATION') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        aproximate_hours: action.duration,
      },
    };
  } else if (action.type === 'SET_COMMENT') {
    return { 
      ...state,
      attributes: {
        ...state.attributes,
        comment: action.comment,
      },
    };
  } else if (action.type === 'SET_ADDRESS') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        address: parseAddress(action.address),
      },
    };
  } else if (action.type === 'SET_CENTER') {
    return {
      ...state,
      attributes: {
        ...state.attributes,
        lat: action.lat.toString(),
        lng: action.lng.toString(),
      },
    };
  }
  return state;
}

function parseAddress(address) {
  const arr = address.split(',');
  const head = arr.slice(0,2);
  const tail = arr.slice(2);
  return `${head.join(",").trim()}\n${tail.join(",").trim()}`
}

export default order;
