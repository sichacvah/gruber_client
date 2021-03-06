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
  (state, key) => {
    if (key !== 'api') {
      return state;
    }    
    return {
      ...state,
      isCreating: 0,
      isDeleting: 0,
      isReading: 0,
      isUpdating: 0,
    };
  },
  (state, key) => {
    if (key === 'order') {
      return {
        ...state,
        attributes: {
          ...state.attributes,
          time: new Date(state.attributes.time),
        },
      }
      
    }
    if (key !== 'api') {
      return state;
    }
    
    return {
      ...state,
      isCreating: 0,
      isDeleting: 0,
      isReading: 0,
      isUpdating: 0,
    };
  }
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

