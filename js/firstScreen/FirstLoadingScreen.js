// @flow


'use strict';

import React from 'react';
import { 
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import {Text} from '../common/GruberText';
import GruberButton from '../common/GruberButton';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GruberColors from '../common/GruberColors';
import GruberTouchable from '../common/GruberTouchable';
import { firstLoad } from '../actions';


class FirstLoadingScreen extends React.Component {
  render() {
    return (
      <Image style={styles.container} source={require('../../images/map_bg.png')}>
        <Image style={styles.logo} source={require('../../images/logo-and-fon.png')} resizeMode="contain">
        </Image>
        <View style={styles.buttonContainer}>
          <Text style={styles.topText}>Ежедневно на линни более</Text>
          <Text style={styles.bottomText}>350 единиц спецтехники</Text>
          <View style={styles.buttonWrapper}>
            <GruberButton 
              style={styles.button} 
              caption="Продолжить" 
              onPress={this.props.firstLoad} />
          </View>
        </View>

      </Image>
    );
  }
}

const stateToProps = (state) => {
  return {};
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    firstLoad
  }, dispatch);
}


const ORIGINAL_LOGO_WIDTH = 720;
const ORIGINAL_LOGO_HEIGHT = 480;
const LOGO_WIDTH = Dimensions.get('window').width - 50;
const LOGO_HEIGHT = Dimensions.get('window').height / 4;


const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,

  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0
  },
  logo: {
    width: LOGO_WIDTH,
    height: Math.round(LOGO_HEIGHT),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  topText: {
    color: 'white',
    fontSize: 20
  },
  bottomText: {
    color: GruberColors.appColor,
    fontSize: 20
  },
  buttonContainer: {
    elevation: 1,
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: LOGO_HEIGHT,
    alignItems: 'center',
    padding: 10,
  },
});

export default connect(stateToProps, dispatchToProps)(FirstLoadingScreen);
