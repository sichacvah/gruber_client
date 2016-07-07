// @flow

'use strict';


import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import PureListView from '../../common/PureListView';
import GruberColors from '../../common/GruberColors';
import {Text} from '../../common/GruberText';
import GruberEmptyListView from '../../common/GruberEmptyListView';
import GruberHeader from '../../common/GruberHeader';
import GruberRadioButton from '../../common/GruberRadioButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readEndpoint} from 'redux-json-api';
import {selectJobType} from '../../actions';

function select(store) {
  return {
    jobTypes: (store.api["job-types"] ? store.api["job-types"].data.map((i) => {
      return {
        ...i,
        selected: i.id === store.jobTypesFilter.selectedJobType
      }
    }) : []),
    isLoading: store.api.isReading > 0,
    selectedJobType: store.jobTypesFilter.selectedJobType,
  };
}

function actions(dispatch) {
  return bindActionCreators({
    selectJobType,
    readEndpoint
  }, dispatch);
}

class Filter extends React.Component {
  constructor(props) {
    super(props);

    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).renderListView = this.renderListView.bind(this);    
  }

  renderEmptyList() {
    return (
      <GruberEmptyListView onPress={() => this.props.readEndpoint('job_types')}  />
    );
  }

  renderPlaceholderView() {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: "center"}]}>
        <ActivityIndicator size="large" animating={true} color={GruberColors.appColor} />
      </View>
    )
  }

  renderRow(jobType) {
    return(
      <GruberRadioButton 
        key={jobType.id}
        onPress={() => this.props.selectJobType(jobType.id)}
        value={jobType.id === this.props.selectedJobType}>
        <Text style={{color: GruberColors.darkText}}>
          {jobType.attributes.name}
        </Text>
      </GruberRadioButton>
    );
  }

  renderListView() {
    return (
      <PureListView
        data={this.props.jobTypes}
        renderEmptyList={this.renderEmptyList}
        renderRow={this.renderRow} />
    );
  }


  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };
    const title = "Вид работы";
    return (
      <View style={styles.container}>
        <GruberHeader
          title={title}
          leftItem={leftItem}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </GruberHeader>
        <View style={{flex: 1, padding: 10, paddingTop: 8}}>
          {this.props.isLoading ? this.renderPlaceholderView() : this.renderListView()}
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
  }
 
});

export default connect(select, actions)(Filter);
