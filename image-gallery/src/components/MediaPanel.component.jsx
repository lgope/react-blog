import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const imageSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.image;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.image.char_id);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class MediaPanel extends Component {
  render() {
    const { isDragging, connectDragSource, image } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className='images'>
        <img
          style={{ width: '333px', height: '250px' }}
          src={image.img}
          alt={image.name}
        />
      </div>
    );
  }
}

export default DragSource('image', imageSource, collect)(MediaPanel);

// this.setState({ imageList: res.data })
