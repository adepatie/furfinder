import React, { Component } from 'react';
import PetImage from '../pet-image/pet-image.js';
import './pet-item.css';

class PetItem extends Component {
  constructor() {
    super();
    this.state = {
       petImageUrl: ''
    }
  }
  componentWillMount() {
    this.processPetImageUrl();
  }
  processPetImageUrl() {
    let imageUrl = this.props.pet.media.photos.photo.filter((photoObj) => {
      return photoObj['@size'] === 'x';
    })[0].$t;

    this.setState({
      petImageUrl: imageUrl
    });
  }

  render() {
    return (
      <div className="card is-fullwidth pet-card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={ this.state.petImageUrl } alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-5">{this.props.pet.name.$t}</p>
              <p className="subtitle is-6">{this.props.pet.animal.$t} - {this.props.pet.breeds.breed.$t}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PetItem;


//      <PetImage imageUrl={ this.state.petImageUrl } />
