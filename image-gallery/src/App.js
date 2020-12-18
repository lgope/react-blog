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

  // api call
  componentDidMount() {
    axios
      .get('https://www.breakingbadapi.com/api/characters?limit=20')
      .then(res => this.setState({ imageList: res.data }))
      .catch(err => console.log('err ', err.response));
  }

  deleteItem = char_id => {
    const image = this.state.imageList.filter(
      img => img.char_id === char_id
    )[0];
    // console.log('cid ', char_id);
    // console.log('img ', image);

    if (this.state.selectedImages.length < 12) {
      this.setState({
        selectedImages: this.state.selectedImages.concat(image),
      });

      localStorage.setItem(
        'selectedImages',
        JSON.stringify(this.state.selectedImages)
      );

      // console.log('llss ', localStorage.getItem('selectedImages'));
    } else alert('Limit is over!');
    // console.log('ssssi ', image);
    // console.log('arr ', this.state.selectedImages);
    // this.setState(prevState => {
    //   return {
    //     items: prevState.items.filter(item => item.char_id !== id),
    //   };
    // });
  };

  deleteImage(char_id) {
    console.log('cid ', char_id);
    // this.setState({
    //   selectedImages: this.state.selectedImages.filter(
    //     image => image.char_id !== char_id
    //   ),
    // });

    // this.setState(prevState => {
    //   return {
    //     selectedImages: prevState.selectedImages.filter(image => image.char_id !== char_id),
    //   };
    // });
    let images = JSON.parse(localStorage.getItem('selectedImages') || '[]');

    images = images.filter(image => image.char_id !== char_id);
    console.log('updsi ', images);

    localStorage.setItem('selectedImages', JSON.stringify(images));

    this.setState({selectedImages: images});
    // localStorage.setItem(
    //   'selectedImages',
    //   JSON.stringify(this.state.selectedImages)
    // );
  }

  moveCard = (dragIndex, hoverIndex) => {
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

    localStorage.setItem(
      'selectedImages',
      JSON.stringify(this.state.selectedImages)
    );
  };

  // console.log('lls ', localStorage.getItem('selectedImages'));
  render() {
    return (
      <div className='app-container'>
        <div className='media-panel'>
          <p className='media-text'>Media Panel</p>
          {this.state.imageList.map(image => (
            <MediaPanel
              key={image.char_id}
              image={image}
              handleDrop={char_id => this.deleteItem(char_id)}
            />
          ))}
        </div>

        {/* selected image panel */}
        <Target
          selectedImages={this.state.selectedImages}
          deleteImage={char_id => this.deleteImage(char_id)}
          moveCard={this.moveCard}
        />

        <div className='selected-image-container'>
          {/* {this.state.selectedImages.map((image, i) => (
              <Card
                key={image.char_id}
                index={i}
                id={image.char_id}
                imgUrl={image.img}
                moveCard={this.moveCard}
              />
            ))} */}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
