import React, { Component } from 'react';
import './pet-image.css';

class PetImage extends Component {
  constructor() {
    super();
    this.resizeImage = this.resizeImage.bind(this);
    this.state = {
      imageClasses: ''
    }
  }

  resizeImage() {
    let imageNode = this.refs['image'];
    let imageSizeRatio = imageNode.width / imageNode.height;

    this.setState({ imageClasses: imageSizeRatio < 1.25 ? 'portrait' : 'landscape' });
  }

  render() {
    return (
      <div className="card-image">
        <figure className="image-container">
          <img className={ this.state.imageClasses } src={ this.props.imageUrl } ref="image" onLoad={ this.resizeImage } />
        </figure>
      </div>
    )
  }
}

export default PetImage;
