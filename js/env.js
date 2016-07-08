// @flow
//
import {devHost} from '../development';


'use strict';


const env = {
  jsonApiHost: (__DEV__ ? devHost : ""),
  jsonApiEndpoint: 'api/'
};

export default env;
