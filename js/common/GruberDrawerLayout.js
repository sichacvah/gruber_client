// @flow

'use strict';

import React from 'react';

import DrawerLayout from 'react-native-drawer-layout';

class GruberDrawerLayout extends React.Component {

  constructor(props, context) {
    super(props, context);

    (this: any).openDrawer = this.openDrawer.bind(this);
    (this: any).closeDrawer = this.closeDrawer.bind(this);
    (this: any).onDrawerOpen = this.onDrawerOpen.bind(this);
    (this: any).onDrawerClose = this.onDrawerClose.bind(this);
    (this: any).handleBackButton = this.handleBackButton.bind(this);
  }

  render() {
    const {drawerPosition, ...props} = this.props;
    const {Right, Left} = DrawerLayout.positions;
    return (
      <DrawerLayout
        ref="drawer"
        {...props}
        drawerPosition={drawerPosition === 'right' ? Right : Left}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}  />
    );
  }

  componentWillUnmount() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.refs.drawer = null;
  }

  handleBackButton(): boolean {
    this.closeDrawer();
    return true;
  }

  onDrawerOpen() {
    this.context.addBackButtonListener(this.handleBackButton);
    this.props.onDrawerOpen && this.props.onDrawerOpen();
  }

  onDrawerClose() {
    this.context.removeBackButtonListener(this.handleBackButton);
    this.props.onDrawerClose && this.props.onDrawerClose();
  }

  closeDrawer() {
    this.refs.drawer && this.refs.drawer.closeDrawer();
  }

  openDrawer() {
    this.refs.drawer && this.refs.drawer.openDrawer();
  }
}


GruberDrawerLayout.contextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};


export default GruberDrawerLayout;
