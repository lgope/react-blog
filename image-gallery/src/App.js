import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import Target from './Target';
import Card from './Card';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
const update = require('immutability-helper');

class App extends Component {
  state = {
    items: [
      {
        char_id: 1,
        name: 'Walter White',
        birthday: '09-07-1958',
        occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
        img:
          'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
        status: 'Presumed dead',
        nickname: 'Heisenberg',
        appearance: [1, 2, 3, 4, 5],
        portrayed: 'Bryan Cranston',
        category: 'Breaking Bad',
        better_call_saul_appearance: [],
      },
      {
        char_id: 3,
        name: 'Skyler White',
        birthday: '08-11-1970',
        occupation: [
          'House wife',
          'Book Keeper',
          'Car Wash Manager',
          'Taxi Dispatcher',
        ],
        img:
          'https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg',
        status: 'Alive',
        nickname: 'Sky',
        appearance: [1, 2, 3, 4, 5],
        portrayed: 'Anna Gunn',
        category: 'Breaking Bad',
        better_call_saul_appearance: [],
      },
    ],
    cards: [
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ],

    selectedImages: [
      {
        char_id: 3,
        name: 'Skyler White',
        birthday: '08-11-1970',
        occupation: [
          'House wife',
          'Book Keeper',
          'Car Wash Manager',
          'Taxi Dispatcher',
        ],
        img:
          'https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg',
        status: 'Alive',
        nickname: 'Sky',
        appearance: [1, 2, 3, 4, 5],
        portrayed: 'Anna Gunn',
        category: 'Breaking Bad',
        better_call_saul_appearance: [],
      },
      {
        char_id: 1,
        name: 'Walter White',
        birthday: '09-07-1958',
        occupation: ['High School Chemistry Teacher', 'Meth King Pin'],
        img:
          'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
        status: 'Presumed dead',
        nickname: 'Heisenberg',
        appearance: [1, 2, 3, 4, 5],
        portrayed: 'Bryan Cranston',
        category: 'Breaking Bad',
        better_call_saul_appearance: [],
      },
    ],
  };

  deleteItem = char_id => {
    const image = this.state.items.filter(img => img.char_id === char_id)[0];
    console.log('cid ', char_id);
    // this.state.selectedImages.push(image);
    this.setState({ selectedImages: this.state.selectedImages.concat(image) });
    console.log('ssssi ', image);
    console.log(
      'arr ',
      this.state.selectedImages.map(image => image)
    );
    // this.setState(prevState => {
    //   return {
    //     items: prevState.items.filter(item => item.char_id !== id),
    //   };
    // });
  };

  moveCard = (dragIndex, hoverIndex) => {
    const { selectedImages } = this.state;
    const dragCard = selectedImages[dragIndex];

    console.log('old il ', this.state.selectedImages);
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

    console.log('new il ', this.state.selectedImages);
  };

  render() {
    return (
          <div className='app-container'>
            <div className='media-panal'>
              <p className="media-text">Media Panel</p>
              {this.state.items.map(item => (
                <Item
                  key={item.char_id}
                  item={item}
                  handleDrop={char_id => this.deleteItem(char_id)}
                />
              ))}
            </div>

            {/* selected image panal */}
            <Target selectedImages={this.state.selectedImages} />
       
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
