// @flow

'use strict';



import React from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GruberTouchable from '../common/GruberTouchable';
import {Text} from '../common/GruberText';
import GruberColors from '../common/GruberColors';


class MenuItem extends React.Component {
  props: {
    icon: number;
    title: string;
    onPress: () => void;
    badge: ?string;
  };

  render() {
    let badge;
    if (this.props.badge) {
      badge = (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {this.props.badge}
          </Text>
        </View>
      );
    }

    return (
      <GruberTouchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <Image style={styles.icon} source={this.props.icon} resizeMode='contain' />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>
              {this.props.title}
            </Text>
          </View>
        </View>
      </GruberTouchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imageWrapper: {
    marginRight: 20
  },
  icon: {
    flex: 1,
    width: 20,
    height: 20
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: GruberColors.darkText,
  },
  badge: {
    backgroundColor: GruberColors.appColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10
  },
  badgeText: {
    fontSize: 12,
    color: GruberColors.darkText,
  },
});


export default MenuItem;
