// @flow


'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image
} from 'react-native';
import PureListView from '../../common/PureListView';
import GruberHeader from '../../common/GruberHeader';
import GruberColors from '../../common/GruberColors';


class VehicleTypesView extends React.Component {
  static contextTypes = {
    openDrawer: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    (this: any).handleShowMenu = this.handleShowMenu.bind(this);
  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  render() {
    const leftItem = {
      title: 'Menu',
      icon: require('../../../images/icon_menu.png'),
      onPress: this.handleShowMenu
    };
    return (
      <View style={styles.container}>
        <GruberHeader
          title="Спецтехника"
          leftItem={leftItem}>
            <Text style={styles.headerTitle}>
              Спецтехника
            </Text>
        </GruberHeader>
        <Text style={styles.text}>
          Test
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: GruberColors.darkText,
    fontSize: 14
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


export default VehicleTypesView;


