// @flow


'use strict';

import React from 'react';

import {Text} from './GruberText';
import GruberColors from './GruberColors';
import GruberTouchable from './GruberTouchable';

import {
  View,
  StyleSheet
} from 'react-native';


// TODO: add flow type check
export default class GruberCell extends React.Component {

  render() {
    let selectedJobType = (this.props.selectedJobType ? this.props.selectedJobType : 'Выберите тип работ');
    let { label } = this.props;
    if (label && label.length > 0) {
      label = <Text style={[styles.label, this.props.labelStyles]}>{label}</Text>;
    }
    let cell = (
        <View style={[styles.cell, this.props.style]}>
          <View>
            <View style={{justifyContent: 'center'}}>
              {label}
              <Text style={[styles.text, this.props.textStyles]}>{this.props.text}</Text>
            </View>
          </View>
        </View>
    );

    if (this.props.onPress) {
      return (
        <GruberTouchable onPress={this.props.onPress}>
          {cell}
        </GruberTouchable>
      );  
    }

    return cell; 
  }
}


const styles = StyleSheet.create({
  cell: {
    height: 60,
    borderWidth: 0.5,
    borderColor: '#999999',
    backgroundColor: 'white',
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 17
  },
  label: {
    color: GruberColors.lightText,
    fontSize: 12,
  },
  text: {
    color: GruberColors.darkText,
    fontSize: 14,
  },
})
