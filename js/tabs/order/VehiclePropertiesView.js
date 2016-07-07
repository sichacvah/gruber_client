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
import {selectVehicle, changePropertyValue} from '../../actions';


function select(store) {
  return {
    selectedVehicleType: store.order.relationships.data["vehicle-type"],

    propertyTypes: store.api["vehicle-property-types"].data,
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
    return (
      <PropertyTypeCell
        key={propertyType.id}
        propertyType={propertyType}
        onChange={(value) => this.handlePropertyTypeChange(propertyType.id, value)}
        />
      <View>
        <Text>{propertyType.attributes.name}</Text>
      </View>
    );
  }

  renderListView() {
    const { vehicleType } = this.props;
    const availableProperties = vehicleType.relationships["vehicle-property-types"].data.map(i => i.id);
    const propertyTypes = this.props.propertyTypes.filter((i) => (availableProperties.includes(i.id)));
    return (
      <PureListView
        data={propertyTypes}
        renderRow={this.renderRow}
        renderEmptyList={this.renderEmptyList}
      />
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
        {!this.props.selectedVehicleType || this.props.isLoading ? this.renderPlaceholderView() : this.renderListView()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  },
});


export default connect(select, action)(VehiclePropertiesView);
