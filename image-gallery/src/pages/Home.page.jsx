import React, { Component } from 'react';
// components
import Canvas from '../components/canvas/Canvas.component';
import MediaPanel from '../components/MediaPanel.component';

// redux staff
import { connect } from 'react-redux';
import { getImages, addImageToCanvas } from '../redux/actions/imageActions';

class Home extends Component {
  // api call => fetching image
  componentDidMount() {
    this.props.getImages();
  }

  render() {
    return (
      <div className='app-container'>
        <div className='media-panel'>
          <p className='media-text'>Media Panel</p>
          {this.props.images &&
            this.props.images.map(image => (
              <MediaPanel key={image.char_id} image={image} />
            ))}
        </div>

        {/* selected image panel */}
        <div className='selected-images-panel'>
          <Canvas />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
});

export default connect(mapStateToProps, { getImages, addImageToCanvas })(Home);
// export default Home;
