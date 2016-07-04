// @flow

'use strict';

import React from 'react';
import {
  View,
  ProgressBarAndroid,
  ActivityIndicator,
  Platform
} from 'react-native';


function GruberProgressBarIOS(props: Object): ReactElement {
  return (<ActivityIndicator animating={true} {...props} />);
};


const GruberProgressBar = (Platform.OS === 'android'
  ? ProgressBarAndroid
  : GruberProgressBarIOS);


export default GruberProgressBar;
