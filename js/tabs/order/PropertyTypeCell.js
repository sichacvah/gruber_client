// @flow

'use strict';

import React from 'react';
import {Text} from '../../common/GruberText';
import GruberColors from '../../common/GruberColors';
import GruberTouchable from '../../common/GruberTouchable';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  StyleSheet,
  Image,
  Slider
} from 'react-native';

// TODO: add flow 
export default class PropertyTypeCell extends React.Component { 
  render() {
    const propertyType = this.props.propertyType;
    var cell = (
      <View style={styles.cell}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            {vehicleType.attributes.name}
          </Text>
        </View>
        {!this.props.onPress && 
        <View>
          <Slider 
            minimumValue={parseFloat(propertyType.attributes.min)}
            maximumValue={parseFloat(propertyType.attributes.max)}
        </View>}
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
  icon: {
    flex: 1,
    width: 50
  },
  cell: {
    marginBottom: 1.8,
    elevation: 1,
    paddingLeft: 17,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: "#999"
  },
  forwardSection: {
    paddingRight: 20
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  title: {
    color: GruberColors.darkText,
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 20
  }

  
});

