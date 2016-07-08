// TODO: add flow type check


'use strict';

const initialState = {
  phone: "",
  code: "",
  phoneSended: false
};



function user(state = initialState, action) {
  if (action.type === 'SET_PHONE') {
    return {
      ...state,
      phone: action.phone
    }
  } else if (action.type === 'SET_CODE') {
    return {
      ...state,
      code: action.code
    }
  } else if (action.type === "PHONE_SENDED") {
    return {
      ...state,
      phoneSended: true
    }
  } else if (action.type === 'UNLOCK_PHONE') {
    return {
      ...state,
      phoneSended: false
    }
  }
  return state;
}


export default user;
