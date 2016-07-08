// @flow

'use strict';


import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Slider
} from 'react-native';

import GruberColors from '../../common/GruberColors';
import {Text} from '../../common/GruberText';
import GruberHeader from '../../common/GruberHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readEndpoint} from 'redux-json-api';
import {setDate, setDuration} from '../../actions';
import GruberDateTimePicker from '../../common/GruberDateTimePicker';
import GruberTextInput from '../../common/GruberTextInput';

function select(store) {
  return {
    date: store.order.attributes.date,
    duration: store.order.attributes.duration,
  };
}

function actions(dispatch) {
  return bindActionCreators({
    setDate,
    setDuration
  }, dispatch);
}



class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.renderSlider = this.renderSlider.bind(this);
  }

  renderSlider() {
    return (
      <View style={styles.cell}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Продолжительность работ {" - "}
            <Text style={{color: GruberColors.darkText}}>{this.props.duration}</Text>
            {" "}часов
          </Text>
        </View>
          <Slider
              style={{flex: 1}}
              maximumValue={24}
              step={1}
              minimumValue={1}
              value={this.props.duration}
              onValueChange={(value) => this.props.setDuration(value)}
            />
      </View>
    );
  }

  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };
    const title = "Детали заказа";
    return (
      <View style={styles.container}>
        <GruberHeader
          title={title}
          leftItem={leftItem}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </GruberHeader>
        <View style={{flex: 1, padding: 10}}>
          <GruberDateTimePicker
            onDateChange={this.props.setDate}
            date={this.props.date}/>
          {this.renderSlider()}
          <GruberTextInput 
            label="Комментарий"
            textInputProps={{
              multiline: true,
              underlineColorAndroid: 'white'
            }} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  },
  cell: {
    marginBottom: 2,
    elevation: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: 60,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: "#999"
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

export default connect(select, actions)(OrderDetails);
