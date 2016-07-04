// @flow


'use strict';


import React from 'react';
import ReactNative, { StyleSheet, Dimensions } from 'react-native';

import GruberColors from './GruberColors';


export function Text({style, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, style]} {...props} />;
}


export function Paragraph({styles, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, style.p, style]} {...props} />;
}


export function Heading1({styles, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, styles.h1, style]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = StyleSheet.create({
  font: {
    fontFamily: require('../env').fontFamily,
  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    color: GruberColors.darkText,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
    color: GruberColors.lightText,
  },
});



