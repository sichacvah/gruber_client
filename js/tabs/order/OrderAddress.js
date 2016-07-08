//@flow

'use strict';

import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import {Text} from '../../common/GruberText';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';
import GruberRadioButton from '../../common/GruberRadioButton';
import {setAddress, setCenter} from '../../actions';
import AddressAutoComplete from './AddressAutoComplete';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function select(store) {
  return {
    address: store.order.attributes.address,
    lat: store.map.lat,
    lng: store.map.lng,
    latDelta: store.map.latDelta,
    lngDelta: store.map.lngDelta
  };
}

function action(disptach) {
  return bindActionCreators({
    setAddress,
    setCenter
  }, disptach);
}

class OrderAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };

    const title = "Адрес";
    const { lat, lng, latDelta, lngDelta } = this.props;
    return (
      <View style={styles.container}>
        <GruberHeader
          title={title}
          leftItem={leftItem}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </GruberHeader>
        <AddressAutoComplete 
          navigator={this.props.navigator}
          setAddress={this.props.setAddress}
          setCenter={this.props.setCenter}
          lat={lat}
          lng={lng}
          latDelta={latDelta}
          lngDelta={lngDelta}
          address={this.props.address} />


      </View>
    );

  }
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,    
  },
  container: {
    flex: 1,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal'
  }
 
});

export default connect(select, action)(OrderAddress);
