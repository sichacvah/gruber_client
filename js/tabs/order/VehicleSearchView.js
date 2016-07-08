// TODO: add flow

'use strict';


import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Slider
} from 'react-native';

import GruberColors from '../../common/GruberColors';
import {Text} from '../../common/GruberText';
import GruberHeader from '../../common/GruberHeader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createEntity, deleteEntity, readEndpoint} from 'redux-json-api';

function select(store) {
  return {
    order: store.order
  };
}

function actions(dispatch) {
  return bindActionCreators({
    createEntity,
    readEndpoint,
    deleteEntity
  }, dispatch);
}



class VehicleSearchView extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let order = this.props.order;
    order.type = "client/orders";
    // TODO: CHANGE REDUCERS;
    order.attributes.time = order.attributes.date;
    order.attributes.aproximate_hours = order.attributes.duration;
    delete order.attributes.date;
    delete order.attributes.duration;
    this.props.createEntity(order)
      .then((res) => {
        console.log(res);

      })

  }

  render() {
    const leftItem = {
      title: 'Back',
      icon: require('../../../images/back.png') ,
      onPress: () => this.props.navigator.pop()
    };
    const title = "Поиск";
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
          <View>
            <ActivityIndicator animating={true} color={GruberColors.appColor} style={{padding: 20}} size="large"/>
            <Text style={styles.title}>
              На линии 165 единиц спецтехники.{"\n"}
              Идёт поиск ближайшей к вам.{"\n\n"}
              Подождите 5 - 10 минут.
            </Text>
          </View>
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
  },
  title: {
    color: GruberColors.darkText,
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
 
});

export default connect(select, actions)(VehicleSearchView);
