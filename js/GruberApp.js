// @flow

'use strict';


import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  AppState,
  Alert,
  InteractionManager,
  ActivityIndicator
} from 'react-native';
import {Text} from './common/GruberText';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setEndpointPath, setEndpointHost, readEndpoint} from 'redux-json-api';
import {resetErrors, getStatus} from './actions';
import GruberColors from './common/GruberColors';
import FirstLoadingScreen from './firstScreen/FirstLoadingScreen';
import env from './env';
import GruberNavigator from './GruberNavigator';

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
    (this: any).shouldRenderPlaceholderView = this.shouldRenderPlaceholderView.bind(this);
  }

  shouldRenderPlaceholderView() {
    return this.props.api.isReading > 0;
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

  reloadData() {
    this.props.resetErrors();
    this.props.readEndpoint('vehicle_types');
    this.props.readEndpoint('job_types');
  }

  renderPlaceholderView() {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: "center"}]}>
        <ActivityIndicator size="large" animating={true} color={GruberColors.appColor} />
      </View>
    )
  }

  render() {
    if (this.props.firstLoading) {
      return (<FirstLoadingScreen />);
    }

    if (this.props.error) {
      Alert.alert(
        'Ошибка!',
        this.props.error.title,
        [
          {text: 'Ok', onPress: this.reloadData.bind(this)},
        ]
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor="rgba(0,0,0, 0.9)"
          color="black"
          barStyle="light-content" />
        {this.shouldRenderPlaceholderView() ?
          this.renderPlaceholderView() :
          <GruberNavigator />}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
