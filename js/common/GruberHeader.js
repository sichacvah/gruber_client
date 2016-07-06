// @flow

'use strict';

import Icon from 'react-native-vector-icons/Ionicons';


import React from 'react';
import {
  View,
  Platform,
  ToolbarAndroid,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import { Text } from './GruberText';
import GruberColors from './GruberColors';

export type Layout = 
    'default'
  | 'icon'
  | 'title';


export type Foreground = 'light' | 'dark';


export type Item = {
  title?: string;
  icon?: number;
  layout?: Layout;
  onPress?: () => void;
};

export type Props = {
  title?: string;
  leftItem?: Item;
  rightItem?: Item;
  extraItems?: Array<Item>;
  foreground?: Foreground;
  style?: any;
  children?: any;
};


class GruberHeaderAndroid extends React.Component {
  static height: number;
  props: Props;

  render() {
    const { leftItem, rightItem, extraItems } = this.props;
    let actions = [];
    if (rightItem) {
      const {title, icon, layout} = rightItem;
      actions.push({
        icon: layout !== 'title' ? icon : undefined,
        title: title,
        show: 'always',
      });
    }

    if (extraItems) {
      actions = actions.concat(extraItems.map((item) => ({
        title: item.title,
        show: 'never'
      })));
    }

    let content;
    if (React.Children.count(this.props.children) > 0) {
      content = (
        <View collapsable={false} style={{flex: 1, justifyContent: 'center'}}>
          {this.props.children}
        </View>
      );
    }

    return (
      <View style={[styles.toolbarContainer, this.props.style]}>
        <ToolbarAndroid
          navIcon={leftItem && leftItem.icon}
          onIconClicked={leftItem && leftItem.onPress}
          title={this.props.title}
          titleColor={"black"}
          actions={actions}
          onActionSelected={this.handleActionSelected.bind(this)}
          style={styles.toolbar}>
          {content}
        </ToolbarAndroid>
      </View>
    );
  }

  handleActionSelected(position: number) {
    let items = this.props.extraItems || [];
    if (this.props.rightItem) {
      items = [this.props.rightItem, ...items];
    }
    const item = items[position];
    item && item.onPress && item.onPress();
  }
}


class GruberHeaderIOS extends React.Component {
  static height: number;
  props: Props;

  render() {
    const {leftItem, title, rightItem, foreground} = this.props;
    let content;
    if (React.Children.count(this.props.children) === 0) {
      content = <Text style={[styles.titleText]} >
                  {this.props.children}
                </Text>
    } else {
      content = this.props.children;
    }

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS item={leftItem} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={title}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS item={rightItem} />
        </View>
      </View>
    );
  }
}

class ItemWrapperIOS extends React.Component {
  props: {
    item: Item;
  };

  render() {
    const { item } = this.props;
    if (!item) {
      return null;
    }

    let content;
    const { title, icon, layout, onPress } = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return(
      <TouchableOpacity 
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}


const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  toolbarContainer: {
  },
  toolbar: {
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    backgroundColor: GruberColors.appColor,
    elevation: 3,
  },
  header: {
    backgroundColor: GruberColors.appColor,
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end'
  },
  itemWrapper: {
    padding: 11
  },
  itemText: {
    letterSpacing: 11,
    fontSize: 12
  }
});


const GruberHeader = Platform.OS === 'ios' ? GruberHeaderIOS : GruberHeaderAndroid;


export default GruberHeader;

