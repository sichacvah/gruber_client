// @flow


'use strict';


import React from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {Text} from './GruberText';
import GruberColors from './GruberColors';



export default class GruberEmptyListView extends React.Component {
  props: {
    onPress?: () => void;
  };

  render() {
    return (
      <View style={styles.emptyList}>
          <Text style={styles.emptyListText}>
            Возникли проблемы с соединением
            проверьте подключение и
          </Text>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={styles.emptyListLink}>
              попробуйте ещё раз
            </Text>
          </TouchableOpacity>
        </View>
     );
  }

};

const styles = StyleSheet.create({
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  emptyListText: {
    textAlign: 'center',
    color: GruberColors.darkText,
  },
  emptyListLink: {
    color: GruberColors.blueColor
  }
});
