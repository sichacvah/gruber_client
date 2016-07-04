// @flow

'use strict';

import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import errors from './errors';
import gruberConfig from './config';


const reducers = combineReducers({
  config: require('./config'),
  api,
  errors,
  gruberConfig
});

export default reducers;
