import React, { Component } from 'react';

class Slider extends Component {
  render() {
    //   console.log('pp ', this.props);
    return (
      <div className='slider-container'>
        <input
          type='range'
          className='slider'
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={event => this.props.handleChange(event)}
        />
        {`${this.props.value} ${this.props.unit}`}
      </div>
    );
  }
}

// TODO: Detect mouse out side click
export default Slider;

// import React from 'react'

// export default function Slider({ min, max, value, handleChange}) {
//   return (
//     <div className="slider-container">
//       <input
//         type="range"
//         className="slider"
//         min={min}
//         max={max}
//         value={value}
//         onChange={handleChange}
//       />
//       {value}%
//     </div>
//   )
// }
