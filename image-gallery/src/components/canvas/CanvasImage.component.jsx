import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

// redux stuff
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateNewOrder } from '../../redux/actions/imageActions';

const imageSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const imageTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    // console.log('di ', dragIndex);
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // const hoverMiddleX = (hoverBoundingRect.left + hoverBoundingRect.right) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // const hoverClientX = clientOffset.y - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // left, right
    // if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //   return;
    // }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // right, left
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }

    // Time to actually perform the action
    props.updateNewOrder(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class CanvasImage extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
  };

  getImageStyle() {
    const filters = this.props.image.filter.map(option => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    console.log('ff ', filters);

    return filters.join(' ');
  }

  render() {
    const {
      image,
      isDragging,
      connectDragSource,
      connectDropTarget,
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    // console.log('img ', this.props.imgUrl);

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className='images'>
            <img
              src={image.img}
              alt={image.name}
              style={{
                filter: this.getImageStyle(),
                opacity,
                width: '333px',
                height: '250px',
                borderRadius: '10px',
              }}
            />
          </div>
        )
      )
    );
  }
}

export default compose(
  connect(null, { updateNewOrder }),
  flow(
    DragSource('card', imageSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })),
    DropTarget('card', imageTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
    }))
  )
)(CanvasImage);
