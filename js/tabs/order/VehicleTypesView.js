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
  TouchableOpacity
} from 'react-native';
import PureListView from '../../common/PureListView';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';
import VehicleTypeCell  from './VehicleTypeCell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readEndpoint} from 'redux-json-api';

function select(store) {
  return {
    vehicleTypes: (store.api["vehicle-types"] ? store.api["vehicle-types"].data : [])
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
  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  renderRow(vehicleType) {
    return (
      <VehicleTypeCell
        key={vehicleType.id}
        lastId={this.props.vehicleTypes[this.props.vehicleTypes.length - 1].id}
        vehicleType={vehicleType}  />
    );
  }

  renderEmptyList() {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>
          Возникли проблемы с соединением
          проверьте подключение и
        </Text>
        <TouchableOpacity onPress={() => this.props.readEndpoint('vehicle_types')}>
          <Text style={styles.emptyListLink}>
            попробуйте ещё раз
          </Text>
        </TouchableOpacity>
      </View>
    );
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
          <View style={styles.linkToJobTypes}>
            <View style={styles.linkToJobTypesText}>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.jobTypes}>Вид работы</Text>
                <Text style={styles.selectedJobType}>Обустройство...</Text>
              </View>
            </View>
            <View>
              <Icon name="ios-arrow-forward-outline" size={24} color={GruberColors.lightText} />
            </View>
          </View>
          <View style={styles.list}>
            <PureListView
              data={this.props.vehicleTypes}
              renderEmptyList={this.renderEmptyList}
              renderRow={this.renderRow} />
           </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 2,
    flex: 1,
    marginBottom: 10
  },
  linkToJobTypes: {
    height: 60,
    borderWidth: 1,
    borderColor: '#CCC',
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
  text: {
    color: GruberColors.darkText,
    fontSize: 14
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1
  },
  container:{
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: GruberColors.darkText,
  },
  emptyListLink: {
    color: GruberColors.blueColor
  }



});


export default connect(select, actions)(VehicleTypesView);


