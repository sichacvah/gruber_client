// TODO: add flow;

'use strict';



import React from 'react';


import {
  View,
  StyleSheet
} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GruberColors from '../../common/GruberColors';



class AddressAutoComplete extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder={"Введите аддрес или опишите как проехать"}
        minLength={2}
        autoFocus={true}
        enableEmptySections={true}
        fetchDetails={true}
        textInputProps={{
          multiline: true,
          onChangeText: (text) => {
            this.props.setAddress(text);
          }
        }}
        onPress={(data, details = null) => {
          this.props.setAddress(data.description);
          this.props.navigator.pop();
          if (details && details.geometry) {
            const { location } = details.geometry;
            if (location) {
              console.log(location);
              const region = {
                lat: location.lat,
                lng: location.lng,
                latDelta: this.props.latDelta,
                lngDelta: this.props.lngDelta
              }
              this.props.setCenter(region);
            }

          }
        }}
        styles={styles}
        

        enablePoweredByContainer={false}
        getDefaultValue={() => {
          return this.props.address;
        }}
        isCurrentLocation={true}
        query={{
          key: 'AIzaSyA0hgVRV05IaFsJKCQKBcu18Rgi5mDsQ1Y',
          language: 'ru', 
          types: 'geocode'
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        predefinedPlaces={[]} />
        
        

    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 0,
    flex: 1,
    backgroundColor: 'transparent'
  },
  textInputContainer: {
    height: 70,
    borderWidth: 0.5,
    borderColor: '#999999',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 0,
    elevation: 1,
    borderRadius: 2,
    padding: 2
    
  },
  description: {
    color: GruberColors.darkText,
    fontSize: 12,
  },
  textInput: {
    alignSelf: 'stretch',
    color: GruberColors.darkText,
    fontSize: 14,
    padding: 0,
    margin: 0,
    flex: 1,

    height: undefined,
    width: undefined,
    borderRadius: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  separator: {
    height: 0

  },
  row: {
    height: 50,
    borderWidth: 0.5,
    borderColor: '#999999',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    margin: 0,
    elevation: 1,
    borderRadius: 2,
    marginTop: 3,
    borderBottomWidth: 0,

  } 
})

export default AddressAutoComplete;
