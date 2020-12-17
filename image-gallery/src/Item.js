import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import axios from 'axios';

const itemSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.item.char_id);
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Item extends Component {
  state = {
    imageList: [],
  };
  componentDidMount() {
    axios
      .get('https://www.breakingbadapi.com/api/characters?limit=20')
      .then(res => this.setState({ imageList: res.data }))
      .catch(err => console.log('err ', err.response));
  }
  render() {
    const { isDragging, connectDragSource, item } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className='images'>
        {/* <span>{'item.name'}</span> */}
        {/* {this.state.imageList.map(image => ( */}
          <img style={{width: "333px",
height: "250px"}} src={item.img} alt={item.name} />
        {/* ))} */}
      </div>
    );
  }
}

export default DragSource('item', itemSource, collect)(Item);

// this.setState({ imageList: res.data })
