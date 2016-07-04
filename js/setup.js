// @flow

'use strict';

import 'react-native-browser-polyfill';
import GruberApp from './GruberApp';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from './store/configureStore';

function setup(): ReactClass<{}> {
  class Root extends React.Component {
    state: {
      isLoading: boolean;
      store: any;
    };

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }

    render() {
      if (this.state.isLoading) {
        return null;
      }

      return (
        <Provider store={this.state.store}>
          <GruberApp />
        </Provider>
      );
    }
  }
  return Root;
}


export default setup;
