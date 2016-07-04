// @flow

'use strict';


import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';


function GruberTouchableIOS(props: Object): ReactElemetn {
  return (
    <TouchableHighlight
      accessibilityTraits="button"
      underlayColor="rgba(0,0,0, 0.8)"
      {...props} />
  );
}


const GruberTouchable = (Platform.OS === 'android'
  ? TouchableNativeFeedback
  : GruberTouchableIOS);

export default GruberTouchable;
