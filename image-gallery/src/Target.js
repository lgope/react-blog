import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import imageIcon from './asstes/image_icon.png';

function collect(connect, monitor) {
  console.log('item ', monitor.getItem());
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  };
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    console.log('object ', this.props.item);
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className='selected-images-panel'>
        <div className='drop-field' style={{ backgroundColor }}>
          <img
            src={imageIcon}
            alt='greenField'
            style={{ paddingTop: '30px', marginTop: '30px' }}
          />
          <p>Drop an image from Media Panel</p>
        </div>
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
