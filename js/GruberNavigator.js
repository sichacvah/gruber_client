// @flow

'use strict';

import React from 'react';
import {
  BackAndroid,
  Platform,
  Navigator,
  StyleSheet,
  Text
} from 'react-native';


import GruberTabsView from './tabs/GruberTabsView';
// import GruberHistoryView from './history/GruberHistoryView';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectTab} from './actions';
import GruberColors from './common/GruberColors';



class GruberNavigator extends React.Component {

  constructor(props: any, context: any) {
    super(props, context);
    this._handlers = ([]: Array<() => boolean>);
    (this: any).handleBackButton = this.handleBackButton.bind(this);
    (this: any).addBackButtonListener = this.addBackButtonListener.bind(this);
    (this: any).removeBackButtonListener = this.removeBackButtonListener.bind(this);
  }


  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
   this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }



  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    const {navigator} = this.refs;
    for (let i = this._handlers.length -1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    if (this.props.tab !== 'order') {
      this.props.selectTab('order');
      return true;
    }
    return false;
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => {
          if (Platform.OS === 'android') {
            return Navigator.SceneConfigs.FloatFromBottomAndroid;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        initialRoute={{}}
        renderScene={this.renderScene.bind(this)} />
    );
  }

  renderScene(route, navigator) {
    return (<GruberTabsView navigator={navigator} />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GruberColors.backgroundColor,
  },
});

function stateToProps(state) {
  return {
    tab: state.navigation.tab
  };
}

function dispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab
  }, dispatch);
}

GruberNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func
};

export default connect(stateToProps, dispatchToProps)(GruberNavigator)