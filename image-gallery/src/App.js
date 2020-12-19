import React, { Component } from 'react';
import './App.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import { Provider } from 'react-redux';
import store from './redux/store';
// components
// import Canvas from './components/canvas/Canvas.component';
// import MediaPanel from './components/MediaPanel.component';
// import DEFAULT_OPTIONS from './components/filter/defaultFilterOptions';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContext } from 'react-dnd';
// const update = require('immutability-helper');

// pages
import Home from './pages/Home.page';

class App extends Component {
  // state = {
  //   imageList: [],
  //   selectedImages: JSON.parse(localStorage.getItem('selectedImages') || '[]'),
  // };

  // api call => fetching image
  // componentDidMount() {
  //   fetch('https://www.breakingbadapi.com/api/characters?limit=20')
  //     .then(res => res.json())
  //     .then(res => this.setState({ imageList: res }))
  //     .catch(err => console.log('err ', err.response));
  // }

  // adding image to canvas functionality
  // addImageToCanvas = char_id => {
  //   const image = this.state.imageList.filter(
  //     img => img.char_id === char_id
  //   )[0];

  // by default filter is empty
  // image.filter = DEFAULT_OPTIONS;
  // console.log('new image ', image);

  // checking total length
  // checking already image exits or not
  // then adding the image
  //   if (this.state.selectedImages.length > 12) {
  //     return alert('Limit is over!');
  //   } else if (this.state.selectedImages.some(img => img.img === image.img)) {
  //     return alert('Already added this image. Please try different');
  //   } else {
  //     // updating the state
  //     this.setState({
  //       selectedImages: this.state.selectedImages.concat(image),
  //     });

  //     // updating the localstorage
  //     localStorage.setItem(
  //       'selectedImages',
  //       JSON.stringify(this.state.selectedImages)
  //     );
  //   }
  // };

  // delete image from canvas area
  // deleteImage(char_id) {
  //   let images = JSON.parse(localStorage.getItem('selectedImages') || '[]');

  //   images = images.filter(image => image.char_id !== char_id);
  //   console.log('updsi ', images);

  //   localStorage.setItem('selectedImages', JSON.stringify(images));

  //   this.setState({ selectedImages: images });
  // }

  // updating new sequence after image sort or moved
  // updateNewSequence = async (dragIndex, hoverIndex) => {
  //   const { selectedImages } = this.state;
  //   const dragCard = selectedImages[dragIndex];
  //   this.setState(
  //     update(this.state, {
  //       selectedImages: {
  //         $splice: [
  //           [dragIndex, 1],
  //           [hoverIndex, 0, dragCard],
  //         ],
  //       },
  //     })
  //   );

  //   let selectedImageOldData = JSON.parse(
  //     localStorage.getItem('selectedImages')
  //   );
  //   // console.log('oldID ', selectedImageOldData);

  //   selectedImageOldData = this.state.selectedImages;
  //   // updating local storage
  //   localStorage.setItem(
  //     'selectedImages',
  //     JSON.stringify(selectedImageOldData)
  //   );
  //   // updating local storage
  //   // localStorage.setItem(
  //   //   'selectedImages',
  //   //   JSON.stringify(this.state.selectedImages)
  //   // );
  // };

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>

      // <div className='app-container'>
      //   <div className='media-panel'>
      //     <p className='media-text'>Media Panel</p>
      //     {this.state.imageList.map(image => (
      //       <MediaPanel
      //         key={image.char_id}
      //         image={image}
      //         handleDrop={char_id => this.addImageToCanvas(char_id)}
      //       />
      //     ))}
      //   </div>

      //   {/* selected image panel */}
      //   <Canvas
      //     selectedImages={this.state.selectedImages}
      //     deleteImage={char_id => this.deleteImage(char_id)}
      //     updateNewSequence={char_id => this.updateNewSequence(char_id)}
      //   />
      // </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
