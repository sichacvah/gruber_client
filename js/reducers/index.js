// @flow

'use strict';

import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import errors from './errors';
import gruberConfig from './config';
import navigation from './navigation';
import jobTypesFilter from './jobTypesFilter';
import order from './order';


const reducers = combineReducers({
  config: require('./config'),
  api,
  errors,
  gruberConfig,
  navigation,
  jobTypesFilter,
  order,
});

export default reducers;
