import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import imageIcon from './asstes/image_icon.png';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function collect(connect, monitor) {
  console.log('image ', monitor.getItem());
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    image: monitor.getItem(),
  };
}

class Target extends Component {
  // state = {
  //   actionBtnVisibility: 'hidden',
  // };

  render() {
    const {
      connectDropTarget,
      hovered,
      selectedImages,
      image,
      moveCard,
      deleteImage,
    } = this.props;
    // console.log('lls ', selectedImages  );
    console.log('object ', this.props.image);
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    const visibility = selectedImages.length === 12 ? 'hidden' : 'visible';
    console.log('hovered ', hovered);
    const actionBtnVisibility = !hovered ? 'visible':'hidden';
    console.log('abv ', actionBtnVisibility);
    return connectDropTarget(
      <div className='selected-images-panel'>
        <div className='selected-images'>
          {selectedImages.map((image, i) => (
            <div
              className='image-container'
              // onMouseEnter={() =>
              //   this.setState({ actionBtnVisibility: 'visible' })
              // }
              // onMouseLeave={() =>
              //   this.setState({ actionBtnVisibility: 'hidden' })
              // }
            >
              <Card
                key={image.char_id}
                index={i}
                id={image.char_id}
                imgUrl={image.img}
                moveCard={moveCard}
              />
              <div
                className='action-btn'
                // style={{ visibility: actionBtnVisibility }}
              >
                <button onClick={() => deleteImage(image.char_id)} title="Delete">
                  <FontAwesomeIcon icon={faEdit} />
                </button>{' '}
                |{' '}
                <button onClick={() => deleteImage(image.char_id)} title="Update">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}

          {/* image drop field */}
          <div className='drop-field' style={{ backgroundColor, visibility }}>
            <img
              src={imageIcon}
              alt='greenField'
              style={{ paddingTop: '30px', marginTop: '30px' }}
            />
            <p>Drop an image from Media Panel1</p>
          </div>
        </div>
        {/* )} */}
      </div>
    );
  }
}

export default DropTarget('image', {}, collect)(Target);
