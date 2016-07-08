//@flow

'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform
} from 'react-native';

import {Text} from '../common/GruberText';
import GruberHeader from '../common/GruberHeader';
import GruberColors from '../common/GruberColors';
import GruberTextInput from '../common/GruberTextInput';
import GruberCell from '../common/GruberCell';
import GruberButton from '../common/GruberButton';
import {createEntity, setAccessToken} from 'redux-json-api';
import {setCode, setPhone, setPhoneSended, unlockPhone, resetErrors} from '../actions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function select(store) {
  return {
    phone: store.user.phone,
    code: store.user.code,
    phoneSended: store.user.phoneSended,
    isCreating: store.api.isCreating > 0,
    error: store.errors.error
  };
}

function actions(dispatch) {
  return bindActionCreators({
    setCode,
    setPhone,
    setPhoneSended,
    unlockPhone,
    createEntity,
    setAccessToken,
    resetErrors
  }, dispatch);
}

class RegistraionView extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.showError = this.showError.bind(this);
  }

  showError(errorMsg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(errorMsg, ToastAndroid.LONG);
      this.props.resetErrors();
    } else {
      Alert.alert('Ошибка', errorMsg, [{text: "OK", onPress: this.props.resetErrors}]);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.error) {
      this.showError(newProps.error.title)
    }
  }

  sendRequest() {
    let user = {};
    user.data = {
      type: 'user',
      attributes: {
        phone: this.props.phone
      }
    };

    if (!this.props.phoneSended) {
      user.type = "users/verification"
      this.props.createEntity(user)
      .then(() => this.props.setPhoneSended())
      .catch((e) => {
        if (!e.title) {
          this.showError("Ошибка авторизации");
        }
      });
    } else {
      user.data.attributes.confirmation_code = this.props.code;
      user.type = "users"
      this.props.createEntity(user)
        .then((json) => {
          this.props.setAccessToken(json.data.attributes["auth-token"])
          this.props.navigator.replace({findVehicle: true});
        })
        .catch((e) => {
          if (!e.title) {
            this.showError("Ошибка авторизации");
          }
        });
    }
  }


  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };

    const title = "Регистрация";
    const { lat, lng, latDelta, lngDelta } = this.props;
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
          <View style={{flex: 1}}>
            <GruberCell
              style={{height: 80}}
              text={"Для регистрации вам необходимо указать \nсвои номер телефона и подтвердить \nего присланым смс-кодом"} />
            <GruberTextInput
                label="Введите номер телефона" 
                style={{fontSize: 17, paddingBottom: 10}}
                textInputProps={{
                  underlineColorAndroid: 'white',
                  onChangeText: (text) => this.props.setPhone(text),
                  value: this.props.phone,
                  keyboardType: 'numeric'
                }} />
             {this.props.phoneSended && 
                <GruberTextInput
                  label="СМС-код" 
                  style={{fontSize: 17, paddingBottom: 10}}
                  textInputProps={{
                    underlineColorAndroid: 'white',
                    onChangeText: (text) => this.props.setCode(text),
                    value: this.props.code,
                    keyboardType: 'numeric'
                  }} />
             }
             {this.props.phoneSended &&
                <TouchableOpacity onPress={this.props.unlockPhone}>
                  <Text style={{color: GruberColors.blueColor, textAlign: 'center', marginTop: 10}}>Изменить телефон</Text>
                </TouchableOpacity>
            }
           </View>
           <View style={styles.buttonWrapper}>
            <GruberButton 
              style={styles.button} 
              caption="Отправить" 
              enabled={!this.props.isCreating}
              onPress={this.sendRequest.bind(this)} />
            </View> 
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
  },
  buttonWrapper: {
    height: 50,
    marginBottom: 10
  }
});

export default connect(select, actions)(RegistraionView);
