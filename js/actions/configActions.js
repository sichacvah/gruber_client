// @flow


'use strict';

import type { ThunkAction, Dispatch, GetState } from './types';
import env from '../env';

const options = {
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json'
  },
};

export function firstLoad(): Action {
  return {
    type:'FIRST_LOADING'
  };
}

export function getStatus(): ThunkAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: 'API_VERSION_WILL_READ' });
    fetch(`${env.jsonApiHost}api/status/actual_version`, options)
      .then(res => {
        if (res.status >= 200 && res.status < 300)  {
          return res.json();
        }

        const e = new Error(res.statusText);
        e.response = res;
        throw e;
    }).then(json => {
      dispatch({ type: 'API_VERSION_READ',  version: json.data.id});
    }).catch(e => {
      dispatch({ type: "API_VERSION_FAILED", error: e});
    });

  };
}
