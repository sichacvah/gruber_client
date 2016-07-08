//@flow


'use strict';

import React from 'react';
import Qs from 'qs';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';

import {Text} from '../../common/GruberText';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';
import GruberCell from '../../common/GruberCell';
import GruberButton from '../../common/GruberButton';
import {setCenter} from '../../actions';
import AddressAutoComplete from './AddressAutoComplete';
import MapView  from 'react-native-maps';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


function select(store) {
  return {
    isLoggedIn: !!store.api.endpoint.accessToken,
    address: store.order.attributes.address,
    region: {
      latitude: store.map.lat,
      longitude: store.map.lng,
      latitudeDelta: store.map.latDelta,
      longitudeDelta: store.map.lngDelta,
    },
  };
}

const defaultRegion = {
    latitude: 54.736965,
    longitude: 55.970451000000025,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

function action(disptach) {
  return bindActionCreators({
    setCenter
  }, disptach);
}

class OrderMapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetchingAddress: false, address: "" };
    this.fetchAddress = this.fetchAddress.bind(this);
  }

  componentDidMount() {
    const { region } = this.props;
    if (region && region.latitude && !this.state.fetchingAddress) {
      this.fetchAddress(region);
    }
  }

  fetchAddress(region) {
    const latlng = `${region.latitude}, ${region.longitude}`;
    this.setState({fetchingAddress: true});
    const query = Qs.stringify({
      key: 'AIzaSyDJ6Sqsp0VvanyG_R7gHXt8LNV6WjLBEDs',
      language: 'ru',
      latlng,
      type: 'geocode'
    });
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?' + query;

    fetch(url)
      .then((res) => {
        return res.json();
      }).then((json) => {
        if (json.results && json.results.length > 0) {
          this.setState({
            fetchingAddress: false, 
            address: parseAddress(json.results[0].address_components)
          });
          
        } else {
          this.setState({fetchingAddress: false});

        }
      })
      .catch((e) => {
        this.setState({ fetchingAddress: false, address: "" })
      });
  }

  onRegionChange(region) {
    this.props.setCenter({lat: region.latitude, lng: region.longitude, latDelta: region.latitudeDelta, lngDelta: region.longitudeDelta});
    if (!this.state.fetchingAddress) {
      this.fetchAddress(region);
    }
  }

  redirect() {
    if (!this.props.isLoggedIn) {
      this.props.navigator.push({registraion: true});
    } else {
      this.props.navigator.push({findVehicle: true});
    }
  }

  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };

    const { height, width } = Dimensions.get('window');
    const title = "Уточните местонахождение";
    if (!this.props.region.latitude) { 
      return null 
    }
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          showsCompass={true}
          onRegionChange={this.onRegionChange.bind(this)}
          region={this.props.region} />
        <GruberHeader
          title={title}
          leftItem={leftItem}>
          <Text style={styles.headerTitle}>
            {title}
          </Text>
        </GruberHeader>
        <GruberCell
          style={[styles.cell, {top: height/ 2 - 120}]}
          textStyles={{textAlign: 'center'}}
          text={this.state.address || "Не опредлён"} />

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../../../images/pin_house.png')} style={styles.pin} resizeMode="contain"/>
        </View>
        <View style={styles.buttonWrapper}>
          <GruberButton 
            style={styles.button} 
            caption="Продолжить" 
            onPress={this.redirect.bind(this)} />    
        </View>
      </View>
    );

  }
}


const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 60
  },
  pin: {
    marginBottom: 60, 
    height: 60, 
    width: 60
  },
  cell: {
    position: 'absolute', 
    right: 40, 
    left: 40, 
    borderRadius: 35, 
    height: 70, 
    alignItems: 'center', 
    padding: 5, 
    justifyContent: 'center', 
    elevation: 1
  },
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
  },
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
 
});

function parseAddress(addressComponents) {
  const road = (addressComponents[0] && addressComponents[0].short_name !== "Unnamed Road" ? addressComponents[0].short_name + ", " : "");
  const city = (addressComponents[1] ? addressComponents[1].short_name + "\n" : "");
  const region = (addressComponents[2] ? addressComponents[2].short_name + ", " : "");
  const country = (addressComponents[3] ? addressComponents[3].long_name : "");
  return `${road}${city}${region}${country}`;

}

export default connect(select, action)(OrderMapView);
