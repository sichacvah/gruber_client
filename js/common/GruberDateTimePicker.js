// @flow


'use strict';


import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import GruberCell from './GruberCell';


import {
  View,
  StyleSheet,
  DatePickerAndroid,
  TimePickerAndroid,
  Modal,
  TouchableOpacity,
  Platform
} from 'react-native';


type Props = {
  onDateChange: () => void;
  date: Date;
};

const TIMEZONE_OFFSET = (-1) * (new Date()).getTimezoneOffset() / 60;

function formatDate(date: Date): string {
  const days = date.getDate();
  // because month begin with 0 - Jan.
  const month = date.getMonth() + 1;
  const year  = date.getFullYear();
  return `${days}.${month}.${year}`;
}

function formatTime(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}


class DateTimePickerIOS extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = { timePickerVisible: false, datePickerVisible: false, date: props.date };
    this.renderDatePicker = this.renderDatePicker.bind(this);
    this.renderTimePicker = this.renderTimePicker.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.date !== this.props.date) {
      this.setState({date: newProps.date});
    }
  }

  renderPicker(mode: string) {
    return (
     <DatePickerIOS
          date={this.state.date}
          mode={mode}
          timeZoneOffsetInMinutes={TIMEZONE_OFFSET * 60}
          onDateChange={(date) => this.setState({date: date})}
          minimumDate={new Date(Date.now())}
     /> 
    );
  }

  selectDate() {
    this.setState({timePickerVisible: false, datePickerVisible: false});
    this.props.onDateChange(this.state.date);
  }

  render() {
    return (
      <View>
        <GruberCell 
          onPress={() => this.setState({datePickerVisible: true})}
          label="Укажите дату"
          text={formatDate(this.props.date)}
        />
        <GruberCell 
          onPress={() => this.setState({timePickerVisible: true})}
          label="Укажите время"
          text={formatTime(this.props.date)}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.timePickerVisible || this.state.datePickerVisible}
        >
          <View style={styles.containerIOS}>
            <View style={styles.innerContainerIOS}>
              <View style={styles.row}>
                {this.state.timePickerVisible && this.renderPicker('time')}
                {this.state.datePickerVisible && this.renderPicker('date')}
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={this.setState({timePickerVisible: false, datePickerVisible: false})}>
                  <View style={styles.buttonIOS}>Отмена</View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.selectDate.bind(this)}>
                  <View style={styles.buttonIOS}>ОК</View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>

      </View>
      
    );
  }
}



class DateTimePickerAndroid extends React.Component {
  props: Props;

  showDatePicker() {
    DatePickerAndroid.open({
      date: this.props.date,
      minDate: new Date(Date.now()),
    }).then(({action, year, month, day}) => {
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day, this.props.date.getHours(), this.props.date.getMinutes());
        this.props.onDateChange(newDate);
      }
    }).catch(e => (console.warn(e.message)));
  }

  showTimePicker() {
    TimePickerAndroid.open({
      hour: this.props.date.getHours(),
      minute: this.props.date.getMinutes(),
      is24Hour: true
    }).then(({action, hour, minute}) => {
      if (action !==  TimePickerAndroid.dismissedAction) {
        const { date } = this.props;
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        this.props.onDateChange(newDate);
      }
    }).catch(e => (console.warn(e.message)));


  }



  render () {
    return (
      <View>
        <GruberCell 
          onPress={this.showDatePicker.bind(this)}
          label="Укажите дату"
          text={formatDate(this.props.date)}
        />
        <GruberCell 
          label="Укажите время"
          onPress={this.showTimePicker.bind(this)}
          text={formatTime(this.props.date)}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainerIOS: {
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20
  },
  buttonIOS: {
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})

const GruberDateTimePicker = (Platform.OS === 'ios' ? DateTimePickerIOS : DateTimePickerAndroid);

export default GruberDateTimePicker;
