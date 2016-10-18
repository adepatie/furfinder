import React, { createClass } from 'react';
import { render } from 'react-dom';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import PetItem from '../../components/pet-item/pet-item.js';
import PetsHero from '../../components/pets-hero/pets-hero.js'

let Pets = createClass({

  //
  getInitialState() {
    return {
      data: [],
      animalFilter: [],
      locationFilter: '',
      petsArray: [],
      showHero: true
    };
  },

  hideHero() {
    this.setState({showHero: false});
  },

  loadPetData() {
    let animalList = this.state.animalFilter;


    let requests = animalList.map((animalType) => {
      const requestUrl = 'http://api.petfinder.com/pet.find?key=52df70200e91359260ab77142b806d7f&format=json&location=' + this.state.locationFilter + '&animal=' + animalType;

      return request.get(requestUrl).use(jsonp({timeout: 5000}));
    });

    return Promise.all(requests);
  },

  submitPetSearch(location, animals) {
    this.setState({ locationFilter: location, animalFilter: animals }, () => {
      this.loadPetData().then((responses) => {
        let newPetsArray = [];
        responses.forEach((response) => {
          newPetsArray = newPetsArray.concat(response.body.petfinder.pets.pet.filter((pet) => {
            return pet.media.photos;
          }));
        });

        this.setState({ petsArray: newPetsArray });
        this.hideHero();
      }).catch((err) => {
        console.log(err);
      });
    });
  },
  render() {
    let nav = null; //TODO
    let hero = this.state.showHero ? <PetsHero dismiss={ this.hideHero } search={ this.submitPetSearch } /> : null;
    let petList = null;
    if(this.state.petsArray.length) {
      petList = this.state.petsArray.map((pet) => {
        return (
          <PetItem pet={pet} key={pet.id['$t']}/>
        )
      });
    }

    return (
      <div className="pets-route">
        {nav}
        {hero}
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-6-desktop is-offset-3-desktop is-8-tablet is-offset-2-tablet">
              {petList}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Pets;
