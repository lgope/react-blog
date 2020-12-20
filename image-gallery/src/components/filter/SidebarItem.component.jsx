import React, { Component } from 'react';
import './filter.styles.css';
import saturation from '../../asstes/saturation.png'
import blur from '../../asstes/blur-option.png'
import brightness from '../../asstes/brightnessIcon.png';
import contrast from '../../asstes/contrast.png'

export default class SidebarItem extends Component {
  render() {
    console.log('id ', this.props.option.id);
    const icons = [saturation, blur, brightness, contrast]
    return (
      <button
        className={`sidebar-item ${this.props.active ? 'active' : ''}`}
        onClick={() => this.props.handleClick()}
      >
        {/* {this.props.name} */}
        <img src={icons[this.props.option.id]} alt={this.props.option.name}/>
      </button>
    );
  }
}
