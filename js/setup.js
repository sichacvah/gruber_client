// @flow

'use strict';

import 'react-native-browser-polyfill';
import GruberApp from './GruberApp';
import { Provider } from 'react-redux';
import GruberColors from './common/GruberColors';
import React from 'react';
import configureStore from './store/configureStore';
import {
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

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
       return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
            <StatusBar
              translucent={false}
              backgroundColor="rgba(0,0,0, 0.9)"
              color="black"
              barStyle="light-content" />
            <ActivityIndicator size="large" animating={true} color={GruberColors.appColor} />
          </View>
        );
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
