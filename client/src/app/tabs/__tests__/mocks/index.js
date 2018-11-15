import React, { Component } from 'react';

export class Editor extends Component {

  constructor(props) {
    super(props);

    const {
      xml
    } = this.props;

    this.state = {
      lastXML: xml
    };
  }

  render() {
    return <div></div>;
  }

  getXML() {
    return this.state.lastXML;
  }

  setXML(xml) {
    this.setState({
      lastXML: xml
    });
  }

}

export const providers = [{
  type: 'editor',
  editor: Editor,
  defaultName: 'Editor'
}, {
  type: 'fallback',
  editor: Editor,
  defaultName: 'Fallback',
  isFallback: true
}];

export const tab = {
  name: 'foo.bar',
  type: 'bar'
};