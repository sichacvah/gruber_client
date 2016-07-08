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
import {setDate, setDuration, setComment, setAddress} from '../../actions';
import GruberDateTimePicker from '../../common/GruberDateTimePicker';
import GruberTextInput from '../../common/GruberTextInput';
import GruberCell from '../../common/GruberCell';
import GruberButton from '../../common/GruberButton';

function select(store) {
  return {
    date: store.order.attributes.time,
    duration: store.order.attributes.aproximate_hours,
    comment: store.order.attributes.comment,
    address: store.order.attributes.address,
  };
}

function actions(dispatch) {
  return bindActionCreators({
    setDate,
    setDuration,
    setComment,
    setAddress
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
            {" "}ч.
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
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <GruberCell 
              onPress={() => this.props.navigator.push({orderAddress: true})}
              style={{height: 70}}
              label={"Адрес (куда проехать?)"}
              text={(this.props.address ? this.props.address : " ")} />
            <GruberDateTimePicker
              onDateChange={this.props.setDate}
              date={this.props.date}/>
            {this.renderSlider()}
            <GruberTextInput 
              label="Комментарий"
              textInputProps={{
                multiline: true,
                underlineColorAndroid: 'white',
                onChangeText: this.props.setComment,
                value: this.props.comment,
              }} />
          </View>
          <View style={styles.buttonWrapper}>
            <GruberButton 
              style={styles.button} 
              caption="Продолжить" 
              onPress={() => this.props.navigator.push({mapView: true})} />
          </View>   
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
  },
  buttonWrapper: {
    height: 50,
    marginBottom: 10
  },
  content: {
    padding: 10,
    flex: 1
  }
 
});

export default connect(select, actions)(OrderDetails);
