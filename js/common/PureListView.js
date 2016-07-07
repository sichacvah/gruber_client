//@flow


'use strict';


import React from 'react';

import {
  ListView,
  Platform,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

type Rows = Array<Object>;
type RowsAndSections = {
  [sectionID: string]: Object;
};

export type Data = Rows | RowsAndSections;
type RenderElement = () => ?ReactElement;

type Props = {
  data: Data;
  renderEmptyList?: ?RenderElement;
  minContentHeight: number;
  contentInset: { top: number; bottom: number; };
};

type State = {
  contentHeight: number;
  dataSource: ListView.DataSourcer;
};


class PureListView extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    data: [],
    contentInset: { top: 0, bottom: 0 },
    minContentHeight: Dimensions.get('window').height
  };

  constructor(props: Props) {
    super(props);
    console.log(props);
    let dataSource = new ListView.DataSource({
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChange: (s1, s2) => s1 !== s2,
    });

    this.state = {
      contentHeight: 0,
      dataSource: cloneWithData(dataSource, props.data),
    };

    (this: any).renderFooter = this.renderFooter.bind(this);
    (this: any).onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data)
      });
    }
  }


  render() {
    const {contentInset} = this.props;
    const bottom = contentInset.bottom + Math.max(0, this.props.minContentHeight - this.state.contentHeight);
    return (
      <ListView
        initialListSize={10}
        enableEmptySections={true}
        {...this.props}
        ref="listview"
        dataSource={this.state.dataSource}
        renderFooter={this.renderFooter}
        contentInset={{bottom, top: contentInset.top}}
        onContentSizeChange={this.onContentSizeChange} />
    );
  }

  onContentSizeChange(contentWidth: number, contentHeight: number) {
    if (this && contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight});
    }
  }

  scrollTo(...args: Array<any>) {
    this.refs.listview.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this.refs.listview.getScrollResponder();
  }

  renderFooter(): ?ReactElement {
    if (this.state.dataSource.getRowCount() === 0) {
      return this.props.renderEmptyList && this.props.renderEmptyList();
    }

    return this.props.renderFooter && this.props.renderFooter();
  }
}



function cloneWithData(dataSource: ListView.DataSource, data: ?Data) {
  if (!data) {
    return dataSource.cloneWithRows([]);
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data)
  }
  return dataSource.cloneWithRowsAndSections(data);
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#eeeeee',
    height: 1
  }
})

export default PureListView;

