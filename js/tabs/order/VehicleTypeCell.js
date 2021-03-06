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
  Image
} from 'react-native';

type VehicleType = {
  attributes: Object;
  relationships: Object;
};


export default class VehicleTypeCell extends React.Component {
  props: {
    vehicleType: VehicleType;
    lastId: string;
    firstId: string;
    onPress: ?() => void;
    style: any;
  };
  
  render() {
    const defaultIcon = require("../../../images/defaultVehicleTypeImg.png");
    const vehicleType = this.props.vehicleType;
    let boundaryStyle;
    if (this.props.firstId === vehicleType.id) {
      boundaryStyle = { borderTopLeftRadius: 2, borderTopRightRadius: 2,  borderWidth: 0.4 };
    }
    if (this.props.lastId === vehicleType.id) {
      boundaryStyle = { borderBottomLeftRadius: 2, borderBottomRightRadius: 2, borderWidth: 0.4 };
    }


    var cell = (
      <View style={[styles.cell, boundaryStyle]}>

        <View style={styles.titleSection}>
          <View>
            <Image source={defaultIcon} style={styles.icon} resizeMode="contain"/>
          </View>
          <Text style={styles.title}>
            {vehicleType.attributes.name}
          </Text>
        </View>
        <View style={styles.forwardSection}>
          <Icon name="ios-arrow-forward-outline" size={24} color={GruberColors.lightText}/>
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

