// @flow


'use strict';


import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import {Text} from '../../common/GruberText';
import GruberColors from '../../common/GruberColors';
import GruberTouchable from '../../common/GruberTouchable';

import {
  View,
  StyleSheet
} from 'react-native';


type Props = {
  selectedJobType: ?string;
  onPress: () => void;
};

export default class JobTypeFiltersLink extends React.Component {
  props: Props;

  render() {
    let selectedJobType = (this.props.selectedJobType ? this.props.selectedJobType : 'Выберите тип работ');
    return (
      <GruberTouchable onPress={this.props.onPress}>
        <View style={styles.linkToJobTypes}>
          <View style={styles.linkToJobTypesText}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.jobTypes}>Вид работы</Text>
              <Text style={styles.selectedJobType}>{selectedJobType}</Text>
            </View>
          </View>
          <View>
            <Icon name="ios-arrow-forward-outline" size={24} color={GruberColors.lightText} />
          </View>
        </View>
      </GruberTouchable>
    );
  }
}


const styles = StyleSheet.create({
  linkToJobTypes: {
    height: 60,
    borderWidth: 0.5,
    borderColor: '#999999',
    borderRadius: 2,
    backgroundColor: 'white',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 17
  },
  jobTypes: {
    color: GruberColors.darkText,
    fontSize: 14,
    
  },
  selectedJobType: {
    color: GruberColors.lightText,
    fontSize: 12,
  },
})
