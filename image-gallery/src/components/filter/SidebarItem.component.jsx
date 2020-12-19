import React, { Component } from 'react';
import './filter.styles.css'

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

// import React from 'react';

// export default function SidebarItem({ name, active, handleClick }) {
//   return (
//     <button
//       className={`sidebar-item ${active ? 'active' : ''}`}
//       onClick={handleClick}
//     >
//       {name}
//     </button>
//   );
// }
