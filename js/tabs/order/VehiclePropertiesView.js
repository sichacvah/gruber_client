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
import GruberButton from '../../common/GruberButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {readEndpoint} from 'redux-json-api';
import {selectVehicle, changePropertyValue} from '../../actions';
import PropertyTypeCell from './PropertyTypeCell';



function select(store) {
  return {
    selectedVehicleType: store.order.relationships["vehicle-type"].data,
    propertyTypes: store.order.attributes["vehicle-properties"],
    isLoading: store.api.isLoading > 0
  };
}

function action(disptach) {
  return bindActionCreators({
    selectVehicle,
    changePropertyValue,
    readEndpoint
  }, disptach);
}

class VehiclePropertiesView extends React.Component {
  constructor(props) {
    super(props);
    (this: any).renderRow = this.renderRow.bind(this);
    (this: any).renderEmptyList = this.renderEmptyList.bind(this);
    (this: any).handlePropertyTypeChange = this.handlePropertyTypeChange.bind(this);
  }

  renderEmptyList() {
    return (<GruberEmptyListView onPress={() => this.props.readEndpoint('vehicle_types')}/>);
  }

  componentWillMount() {
    this.props.selectVehicle(this.props.vehicleType, this.props.included);
  }

  renderPlaceholderView() {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: "center"}]}>
        <ActivityIndicator size="large" animating={true} color={GruberColors.appColor} />
      </View>
    )
  }

  handlePropertyTypeChange(id, value) {
    this.props.changePropertyValue(id, value);
  }

  renderRow(propertyType) {
    let onPress = null;
    if (propertyType["value-type"] === 'boolean') {
      onPress = () => this.props.navigator.push({propertyType, onChange: (value) => this.handlePropertyTypeChange(propertyType.id, value)})
    }
    return (
      <PropertyTypeCell
        key={propertyType.id}
        propertyType={propertyType}
        onChange={(value) => this.handlePropertyTypeChange(propertyType.id, value)}
        onPress={onPress}
        />
    );
  }

  renderListView() {
    const { vehicleType } = this.props;
    return (
      <View style={{flex: 1}}>
        <PureListView
          data={this.props.propertyTypes}
          renderRow={this.renderRow}
          renderEmptyList={this.renderEmptyList}
        />
          
        <View style={styles.buttonWrapper}>
          <GruberButton 
            style={styles.button} 
            caption="Продолжить" 
            onPress={() => this.props.navigator.push({orderDetails: true})} />
        </View>
      </View>
    );
  }


  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png'),
      onPress: this.props.navigator.pop
    };

    const title = "Параметры";
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
            {!this.props.selectedVehicleType || this.props.isLoading ? this.renderPlaceholderView() : this.renderListView()}

          
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10
  },
  container: {
    flex: 1
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  },
  buttonWrapper: {
    height: 50,
    marginBottom: 10
  }
});


export default connect(select, action)(VehiclePropertiesView);
