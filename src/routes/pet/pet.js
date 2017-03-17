import React, { Component } from 'react';
import request from 'superagent';
import jsonp from 'superagent-jsonp';

class Pet extends Component {
  constructor() {
    super();
    this.state = {
       petImageUrl: ''
    }
  }

  componentDidMount() {
    const { selectedPet, params } = this.props;
    if (selectedPet) {
      this.setState({ pet: selectedPet });
      this.processPetImageUrl();
    } else if (params.id) {
      this.loadPet(params.id);
    } else {
      // DO SOMETHING HERE
    }
  }

  loadPet(id) {
    request.get('http://api.petfinder.com/pet.get?key=52df70200e91359260ab77142b806d7f&format=json&id=' + id)
      .use(jsonp({timeout: 5000}))
      .then((response) => {
        this.setState({ pet: response.body.petfinder.pet });
        this.processPetImageUrl();
      })
  }

  processPetImageUrl() {
    let imageUrl = this.state.pet.media.photos.photo.filter((photoObj) => {
      return photoObj['@size'] === 'x';
    })[0].$t;

    this.setState({
      petImageUrl: imageUrl
    });
  }

  render() {
    const { pet } = this.state;
    return (
        <div className="pet container">
        { pet &&
          <div className="columns">
            <div className="pet-info column is-5-tablet">
              <h3 className="title is-3">{pet.name.$t}</h3>
              <p className="subtitle is-4">{pet.animal.$t} {pet.breeds.breed.$t && `- ${pet.breeds.breed.$t}`}</p>
              <p className="">{pet.description.$t}</p>
            </div>
            <div className="pet-image-viewer column is-7-tablet">
              <figure className="image is-4by3">
                <img src={ this.state.petImageUrl } alt="" />
              </figure>
            </div>
          </div>
        }
        </div>
    )
  }
}

export default Pet;
