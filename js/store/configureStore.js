// @flow

'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate, createTransform} from 'redux-persist';
import {AsyncStorage} from 'react-native';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


var dropApiLoadingStatuses = createTransform(
  (api) => {
    return {
      ...api,
      isCreating: 0,
      isDeleting: 0,
      isReading: 0,
      isUpdating: 0,
    };
  },
  (api) => {
    return {
      ...api,
      isCreating: 0,
      isDeleting: 0,
      isReading: 0,
      isUpdating: 0,
    }
  },


);
var createGruberStore = applyMiddleware(thunk, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createGruberStore)(reducers);
  persistStore(store, {storage: AsyncStorage, transforms: [dropApiLoadingStatuses]}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}

export default configureStore;

