// @flow

'use strict';


import GruberColors from './GruberColors';
import GruberTouchable from './GruberTouchable';
import {Text} from './GruberText';
import React from 'react';
import {View,StyleSheet,Image, TextInput} from 'react-native';


// TODO: Add flow type check
class GruberTextInput extends React.Component {

  render() {
    var textInput = (
      <View style={[styles.container, this.props.containerStyles]}>
        <TextInput style={[styles.textInput, this.props.style]} {...this.props.textInputProps} />
        <Text style={[styles.label, this.props.labelStyles]}>{this.props.label}</Text>
      </View>
    );

    if (this.props.onPress) {
      return (
          <GruberTouchable onPress={this.props.onPress}>
            {textInput}
          </GruberTouchable>
      );
    }

    return textInput;
  }
}

const HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    height: 70,
    elevation: 1,
    marginBottom: 1.8,
    paddingHorizontal: 17,
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: "#999",
    backgroundColor: 'white',
    position: 'relative'
  },
  textInput: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    padding: 17
  },
  label: {
    position: 'absolute',
    left: 17,
    top: 3,
    fontSize: 14,
    color: GruberColors.lightText,
  }  
});


export default GruberTextInput;
