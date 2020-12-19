import React, { Component } from 'react';
import './filter.styles.css';

export default class SidebarItem extends Component {
  render() {
    return (
      <button
        className={`sidebar-item ${this.props.active ? 'active' : ''}`}
        onClick={() => this.props.handleClick()}
      >
        {this.props.name}
      </button>
    );
  }
}
