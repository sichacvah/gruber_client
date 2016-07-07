// @flow


'use strict';

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import PureListView from '../../common/PureListView';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';
import VehicleTypeCell  from './VehicleTypeCell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readEndpoint} from 'redux-json-api';
import JobTypeFiltersLink from './JobTypeFiltersLink';
import GruberEmptyListView from '../../common/GruberEmptyListView';

function vehicleTypes(types: ?Array<Object>, selectedJobType: ?string) {
  if (!types) {
    return [];
  };
  if (!selectedJobType) {
    return types.data;
  }
  
  return types.data.filter((type) => {
    return !!type.relationships['job-types'].data.find((jobType) => jobType.id === selectedJobType);
  });
}

function select(store) {
  const selected = store.jobTypesFilter.selectedJobType;
  let selectedJobType;
  if (store.api["job-types"]) {
    selectedJobType = store.api['job-types'].data.find((i) => {
      return i.id === selected;
    });
  }
  selectedJobType = (selectedJobType ? selectedJobType.attributes.name : null);
  return {
    vehicleTypes: vehicleTypes(store.api["vehicle-types"], selected),
    isLoading: store.api.isReading > 0,
    selectedJobType: selectedJobType,
  };
}

function actions(dispatch) {
  return bindActionCreators({
    readEndpoint
  }, dispatch);
}


class VehicleTypesView extends React.Component {
  static contextTypes = {
    openDrawer: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    (this: any).handleShowMenu = this.handleShowMenu.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderListView = this.renderListView.bind(this);
  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  renderRow(vehicleType) {
    return (
      <VehicleTypeCell
        onPress={() => this.props.navigator.push({vehicleType})}
        key={vehicleType.id}
        lastId={this.props.vehicleTypes[this.props.vehicleTypes.length - 1].id}
        firstId={this.props.vehicleTypes[0].id}
        vehicleType={vehicleType}  />
    );
  }

  renderListView() {
    const listView = (
      <PureListView
        data={this.props.vehicleTypes}
        renderEmptyList={this.renderEmptyList}
        renderRow={this.renderRow} />
    );
    return listView;
  }

  renderEmptyList() {
    return (
      <GruberEmptyListView onPress={() => this.props.readEndpoint('vehicle_types')} />
    );
  }

  renderPlaceholderView() {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: "center"}]}>
        <ActivityIndicator size="large" animating={true} color={GruberColors.appColor} />
      </View>
    )
  }

  openFilters() {
    this.props.navigator.push({jobTypesFilter: true});
  }

  render() {
    const leftItem = {
      title: 'Menu',
      icon: require('../../../images/icon_menu.png'),
      onPress: this.handleShowMenu
    };

    const title = "Спецтехника";
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
          <JobTypeFiltersLink selectedJobType={this.props.selectedJobType} onPress={this.openFilters.bind(this)} />
          {this.props.isLoading ?  this.renderPlaceholderView() : this.renderListView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({   
  text: {
    color: GruberColors.darkText,
    fontSize: 14
  },
  content: {
    padding: 10,
    flex: 1
  },
  container:{
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  }
  



});


export default connect(select, actions)(VehicleTypesView);


