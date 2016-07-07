// @flow

'use strict';

import type { Action } from '../actions/types';

type Attribute = {
  name: string;
};


// TODO: Refactor type
export type VehicleType = {
  id: string;
  type: string;
};


export type State = {
  attributes: {
    "vehicle-properties": Array<Object>;
    address: string;
    lat: string;
    lng: string;
  };
  relationships: {
    data: {
      "vehicle-type": ?VehicleType;
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
  },
  relationships: {
    data: {
      "vehicle-type": null
    },
  }
};

function setDefaultValue(property: Object): Object {
  return {
    ...property,
    value: "0",
  };
}

function setRelations(vehicleType: Object): Object {
  return {
    id: vehicleType.id,
    type: vehicleType.type
  };
}

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


function order(state: State = initialState, action: Action) {
  if (action.type === 'SELECT_VEHICLE_TYPE') {
    const availableProperties = action.vehicleType.relationships["vehicle-property-types"].data.map((i) => i.id);
    return {
      ...state,
      relationships: {
        data: {
          "vehicle-type": setRelations(action.vehicleType),
        },
      },
      attributes: {      
        ...state.attributes,
        "vehicle-properties": action.included.filter((p) => availableProperties.includes(p.id)).map((p) => ({...p, value: "0"})),
      }
    };
  } else if (action.type === 'CHANGE_PROPERTY_VALUE') {
    return {
      ...state,
      "vehicle-properties": setVehicleProperties,
    };
  }
  return state;
}

export default order;
