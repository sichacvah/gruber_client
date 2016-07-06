// @flow

'use strict';


import GruberColors from './GruberColors';
import GruberTouchable from './GruberTouchable';
import {Text} from './GruberText';

import React from 'react';
import {View,StyleSheet,Image, ActivityIndicator} from 'react-native';



class GruberButton extends React.Component {
  props: {
    enabled: boolean;
    icon?: string;
    caption: string;
    style?: any;
    onPress: () => mixed;
  };

  static defaultProps = {
    enabled: true
  };

  render() {
    const caption = this.props.caption;

    let icon;
    if (this.props.icon) {
      icon = <Image source={this.props.icon} style={styles.icon} />
    }

    let content;
    if (this.props.enabled) {
      content = (
        <View style={[styles.button,
                (this.props.enabled ? styles.enabled : styles.disabled), 
        ]}>
          {icon}
          <Text style={[styles.caption, styles.font]}>
            {caption}
          </Text>
        </View>
      );
    } else {
      content = (
        <View style={[styles.button,
                (this.props.enabled ? styles.enabled : styles.disabled), 
        ]}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    return (
      <GruberTouchable
        accessibilityTraits="button"
        onPress={this.props.onPress}
        style={[styles.container, 
                this.props.style]}>
         {content}
      </GruberTouchable>
    );
  }
}

const HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    borderRadius: 5,
    height: HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    flex: 1
  },
  enabled: {
    backgroundColor: GruberColors.appColor,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width:0
    },
    opacity: 1
  },
  disabled: {
    opacity: 0.8,
  },
  font: {
    color: 'black'
    
  },
  caption: {
    letterSpacing: 1,
    fontSize: 20,
  }
});


export default GruberButton;
