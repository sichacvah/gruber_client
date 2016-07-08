//@flow

'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import {Text} from '../../common/GruberText';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';
import GruberRadioButton from '../../common/GruberRadioButton';
import {selectVehicle, changePropertyValue} from '../../actions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function select(store) {
  return {
    propertyTypes: store.order.attributes["vehicle-properties"],
  };
}

function action(disptach) {
  return bindActionCreators({
    changePropertyValue,
  }, disptach);
}

class PropertiesSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };

    const title = this.props.propertyType.name;
    const propertyType = this.props.propertyTypes.find((i) => (i.id === this.props.propertyType.id))
    const { value } = propertyType;
    return (
      <View style={styles.container}>
        <GruberHeader
          title={title}
          leftItem={leftItem}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </GruberHeader>
        <View style={styles.content}>
          <GruberRadioButton value={value === "1"} onPress={() => this.props.changePropertyValue(propertyType.id, (value === "1" ? null : "1"))}> 
            <Text style={{color: GruberColors.darkText}}>
              Да
            </Text>
          </GruberRadioButton>
          <GruberRadioButton value={value === "0"} onPress={() => this.props.changePropertyValue(propertyType.id, (value === "0" ? null : "0"))}> 
            <Text style={{color: GruberColors.darkText}}>
              Нет
            </Text>
          </GruberRadioButton>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,    
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  }
 
});

export default connect(select, action)(PropertiesSelect);
