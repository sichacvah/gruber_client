// TODO: add flow typecheck

'use strict';


export function setCode(code) {
  return {
    type: 'SET_CODE',
    code,
  };
}

export function setPhone(phone) {
  return {
    type: 'SET_PHONE',
    phone,
  };
}


export function setPhoneSended() {
  return {
    type: 'PHONE_SENDED',
  };
}

export function unlockPhone() {
  return {
    type: "UNLOCK_PHONE",
  };
}
