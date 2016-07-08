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


function sliderCell(propertyType, onChange) {
  // We need add addinitional 0 as minimum
  const minimumValue = 0;
  const step = parseFloat(propertyType.min);
  const maximumValue = parseFloat(propertyType.max);
  const value = parseFloat(propertyType.value);

  return (
    <View style={styles.cell}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            {propertyType.name}{" - "}
            <Text style={{color: GruberColors.darkText}}>{(value ? value : 'Неважно')}</Text>
            {(value ? propertyType.unit : "")}
          </Text>
        </View>
          <Slider
              style={{flex: 1}}
              maximumValue={maximumValue}
              step={step}
              minimumValue={minimumValue}
              value={value}
              onValueChange={(value) => onChange(value.toString())}
            />
      </View>
  );
}

function pressCell(propertyType, onPress) {
  const value = parseFloat(propertyType.value);
  let valueText;
  if (value === 0) {
    valueText = 'Нет';
  } else if (value === 1) {
    valueText = "Да";
  } else {
    valueText = 'Неважно';
  }

  return (
    <GruberTouchable onPress={onPress}>
        <View style={styles.pressCell}>
          <View style={styles.linkToJobTypesText}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.pressHeaderText}>{propertyType.name}</Text>
              <Text style={styles.pressValueText}>{valueText}</Text>
            </View>
          </View>
          <View>
            <Icon name="ios-arrow-forward-outline" size={24} color={GruberColors.lightText} />
          </View>
        </View>      
    </GruberTouchable>
  );  
}


// TODO: add flow 
export default class PropertyTypeCell extends React.Component { 
  render() {
    const propertyType = this.props.propertyType;
    if (this.props.onPress) {
      return pressCell(propertyType, this.props.onPress);
    }

    return sliderCell(propertyType, this.props.onChange);
  }
}


const styles = StyleSheet.create({
  pressCell: {
    height: 60,
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 17
  },
  pressHeaderText: {
    color: GruberColors.lightText,
    fontSize: 14,
    
  },
  pressValueText: {
    color: GruberColors.darkText,
    fontSize: 12,
  },
  icon: {
    flex: 1,
    width: 50
  },
  cell: {
    marginBottom: 1.8,
    elevation: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    color: GruberColors.lightText,
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 20
  }

  
});

