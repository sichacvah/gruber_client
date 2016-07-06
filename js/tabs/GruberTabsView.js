// @flow

'use strict';

import React from 'react';
import GruberDrawerLayout from '../common/GruberDrawerLayout';
import GruberColors from '../common/GruberColors';
import {Text} from '../common/GruberText';
import MenuItem from './MenuItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import VehicleTypesView from './order/VehicleTypesView';
import HistoryView from './history/HistoryView';
import {selectTab} from '../actions';

// TYPES
import type {Tab} from '../reducers/navigation';

import {
  View,
  StyleSheet,
  Navigator,
  Linking,
  Image
} from 'react-native';


// TODO: set real phone
const OPERATOR_PHONE = "tel:89277777777";


class GruberTabsView extends React.Component {
  constructor(props, context) {
    super(props, context);
    (this: any).renderNavigationView = this.renderNavigationView.bind(this);
    (this: any).openDrawer = this.openDrawer.bind(this);
    (this: any).onTabSelect = this.onTabSelect.bind(this);
    //(this: any).callOperator = this.callOperator.bind(this);
    (this: any).renderContent = this.renderContent.bind(this);
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
    };
  }

  renderNavigationView() {
    return (
    <View style={styles.drawer}>
      <View style={styles.drawerHeader}>
        <View style={styles.drawerWrapper}>
          <Image style={styles.drawerTitle} source={require('../../images/Gruber.png')} resizeMode="contain" />
        </View>
      </View>
      <MenuItem 
        title='Заказать'
        onPress={() => this.onTabSelect('order')}
        icon={require('../../images/icon_menu_zakaz.png')} />
      <MenuItem
        title="Мои заказы"
        onPress={() => this.onTabSelect('history')}
        icon={require('../../images/icon_menu_zakaz.png')} />
      <MenuItem
        title="Связаться с диспетчером"
        onPress={(f) => (f)}
        icon={require('../../images/icon_menu_operator.png')} />
    </View>);
  }

  renderContent() {
    switch (this.props.tab) {
      case 'order': 
        return (
          <VehicleTypesView
            navigator={this.props.navigator} />
        );
      case 'history':
        return (
          <HistoryView
            navigator={this.props.navigator} />
        );
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab: Tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  render() {
    return (
       <GruberDrawerLayout 
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </GruberDrawerLayout>

    );
  }
}


GruberTabsView.childContextTypes = {
  openDrawer: React.PropTypes.func
};


function select(store) {
  return {
    tab: store.navigation.tab
  };
}


function actions(dispatch) {
  return bindActionCreators({
    onTabSelect: selectTab 
  }, dispatch);
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: GruberColors.backgroundColor
  },
  content: {
    flex: 1,
    backgroundColor: GruberColors.backgroundColor
  },
  drawerHeader: {
    backgroundColor: GruberColors.appColor,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    
  },
  drawerWrapper: {
    padding: 10,
    paddingLeft: 0,
    height: 50,
    width: 120
  },
  drawerTitle: {
    flex: 1,
    width: undefined,
    height: undefined,    
  }
});

export default connect(select, actions)(GruberTabsView);
