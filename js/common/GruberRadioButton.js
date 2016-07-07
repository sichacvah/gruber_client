// @flow

'use strict';

import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  requireNativeComponent,
  Platform
} from 'react-native';
import GruberColors from './GruberColors';
import GruberTouchable from './GruberTouchable';
var NativeMethodsMixin = require('NativeMethodsMixin');


var window = Dimensions.get('window');

var styles = StyleSheet.create({
  outerCircle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2 / window.scale,
    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: GruberColors.appColor,
  },

  container: {
    alignItems: 'center',
    marginTop: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 0.7,
    borderColor: "#999",
    borderRadius: 1,
    elevation: 0.1
  },
});

class CircleIOS extends React.Component { 
  props: {
    value: boolean;
  };

  render() {
    let innerCircle;
    let color;
    if (this.props.value) {
      innerCircle = <View style={styles.innerCircle} />;
      color = GruberColors.appColor;
    } else {
      innerCircle = null;
      color = GruberColors.darkText;
    }

    return (
      <View style={{ padding: 10 }}>
        <View style={[styles.outerCircle, { borderColor: color }]}>
          {innerCircle}
        </View>
      </View>
    )
  }
  
}

class RadioButton extends React.Component {
  props: {
    onPress: () => void;
    value: boolean;
  }


  render() {
    return (
      <GruberTouchable onPress={this.props.onPress}>
        <View style={styles.container}>
          {Platform.OS === 'ios' ?  <CircleIOS value={this.props.value} /> : <RadioButtonAndroid value={this.props.value} /> }
          <View style={{flex: 1, paddingLeft: 10}}>
            {this.props.children}
          </View>
        </View>
      </GruberTouchable>
    );
  }
}

class RadioButtonAndroid extends React.Component {
  constructor(props) {
    super(props);
    this._rctRadioButton = {};
    this.name = 'RadioButtonAndroid';
  }

  _onChange(event) {
    if (Platform.OS === 'android') {
      const pass = () => (this.refs['RCTRadioButton'].setNativeProps({on: this.props.value}));
      setTimeout(pass, 0);
    }

    this.props.onChange && this.props.onChange(event);
    this.props.onValueChange && this.props.onValueChange(event.nativeEvent.value);
  }


  render() {
    var props = {...this.props};
    props.onStartShouldSetResponder = () => false;
    props.onResponderTerminationRequest = () => false;
    props.on = this.props.value;
    props.style = this.props.style;

    return (
      <RCTRadioButton {...props} ref={'RCTRadioButton'} onChange={this._onChange.bind(this)} />
    )
  }
}

RadioButtonAndroid.mixins = [NativeMethodsMixin];

RadioButtonAndroid.defaultProps = {
  value: false
}

RadioButtonAndroid.propTypes = {
  value: React.PropTypes.bool,
  text: React.PropTypes.string,
  onValueChanged: React.PropTypes.func,
  ...View.propTypes
};

if (Platform.OS === 'android') {
  var RCTRadioButton = requireNativeComponent('RCTRadioButtonAndroid', RadioButtonAndroid, {
    nativeOnly: { onChange: true, on: true }
  });
}




export default RadioButton;
