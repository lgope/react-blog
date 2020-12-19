import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Target from './Target';
// components
import MediaPanel from './components/MediaPanel.component';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const update = require('immutability-helper');

class App extends Component {
  state = {
    imageList: [],
    selectedImages: JSON.parse(localStorage.getItem('selectedImages') || '[]'),
  };

  // api call => featching image
  componentDidMount() {
    axios
      .get('https://www.breakingbadapi.com/api/characters?limit=20')
      .then(res => this.setState({ imageList: res.data }))
      .catch(err => console.log('err ', err.response));
  }

  // adding image to canvas functionality
  addImageToCanvas = char_id => {
    const image = this.state.imageList.filter(
      img => img.char_id === char_id
    )[0];

    // by default filter is empty
    image.filter = "";
    console.log('new image ', image);

    // checking total length
    // checking already image exits or not
    // then adding the image
    if (this.state.selectedImages.length > 12) {
      
      return alert('Limit is over!');
      
    } else if (this.state.selectedImages.some(img => img.img === image.img)) {

      return alert('Already added this image. Please try different');

    } else {
      // updating the state
      this.setState({
        selectedImages: this.state.selectedImages.concat(image),
      });

      // updating the localstorage
      localStorage.setItem(
        'selectedImages',
        JSON.stringify(this.state.selectedImages)
      );
    }
  };

  // delete image from canvas area
  deleteImage(char_id) {
    let images = JSON.parse(localStorage.getItem('selectedImages') || '[]');

    images = images.filter(image => image.char_id !== char_id);
    console.log('updsi ', images);

    localStorage.setItem('selectedImages', JSON.stringify(images));

    this.setState({ selectedImages: images });
  }

  // updating new sequence after image sort or moved
  updateNewSequence = (dragIndex, hoverIndex) => {
    const { selectedImages } = this.state;
    const dragCard = selectedImages[dragIndex];
    this.setState(
      update(this.state, {
        selectedImages: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        },
      })
    );

    // updating local storage
    localStorage.setItem(
      'selectedImages',
      JSON.stringify(this.state.selectedImages)
    );
  };

  render() {
    return (
      <div className='app-container'>
        <div className='media-panel'>
          <p className='media-text'>Media Panel</p>
          {this.state.imageList.map(image => (
            <MediaPanel
              key={image.char_id}
              image={image}
              handleDrop={char_id => this.addImageToCanvas(char_id)}
            />
          ))}
        </div>

        {/* selected image panel */}
        <Target
          selectedImages={this.state.selectedImages}
          deleteImage={char_id => this.deleteImage(char_id)}
          updateNewSequence={this.updateNewSequence}
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
