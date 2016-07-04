// @flow

'use strict';


import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  AppState,
  Alert
} from 'react-native';

import {Text} from './common/GruberText';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setEndpointPath, setEndpointHost, readEndpoint} from 'redux-json-api';
import {resetErrors, getStatus} from './actions';
import GruberColors from './common/GruberColors';
import FirstLoadingScreen from './firstScreen/FirstLoadingScreen';
import env from './env';

const stateToProps = (state) => {
  return {
    api: state.api,
    firstLoading: state.gruberConfig.firstLoading,
    apiVersion: state.gruberConfig.version,
    error: state.errors.error,
  };
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEndpointPath,
    setEndpointHost,
    resetErrors,
    getStatus,
    readEndpoint
  }, dispatch);
}

class GruberApp extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // TODO: for notifications
    //AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    const endpoint = env.jsonApiEndpoint + this.props.apiVersion;
    this.props.getStatus();
    this.props.setEndpointHost(env.jsonApiHost);
    this.props.setEndpointPath(endpoint);
    this.props.readEndpoint('vehicle_types');
    this.props.readEndpoint('job_types');
  }

  render() {
    if (this.props.firstLoading) {
      return (<FirstLoadingScreen />);
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(237, 196, 18, 0.95)"
          color="black"
          barStyle="light-content" />

        <GruberNavigation />
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(stateToProps, dispatchToProps)(GruberApp);
