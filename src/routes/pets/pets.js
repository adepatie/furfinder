import React, { createClass } from 'react';
import { render } from 'react-dom';
import request from 'superagent';
import jsonp from 'superagent-jsonp';
import Sidebar from 'react-sidebar';
import ScrollArea from 'react-scrollbar';

import PetItem from '../../components/pet-item/pet-item.js';
import PetsHero from '../../components/pets-hero/pets-hero.js';
import PetsNav from '../../components/pets-nav/pets-nav.js';
import PetsMenu from '../../components/pets-menu/pets-menu.js';
import './pets.css';

let Pets = createClass({
  //
  getInitialState() {
    return {
      data: [],
      animalFilter: [],
      locationFilter: '',
      petsArray: [],
      showHero: true,
      showNavMenu: false,
      showMenu: false,
      lastOffset: '0',
      petList: null,
      isInfiniteLoading: false,
    };
  },

  buildPetList() {
    let petList = null;
    if(this.state.petsArray.length) {
      petList = this.state.petsArray.map((pet, ind) => {
        return (
          <div className="column is-4-desktop is-6-tablet is-3-widescreen" key={ind}>
            <PetItem pet={pet} />
          </div>
        )
      });
      this.setState({petList: petList});
    }
  },

  loadMoreItems() {
    this.loadPetData().then((responses) => {
      let newPetsArray = [];
      let offset = responses[0].body.petfinder.lastOffset.$t;

      responses.map((response) => {
        newPetsArray = newPetsArray.concat(response.body.petfinder.pets.pet.filter((pet) => {
          return pet.media.photos;
        }));
      });

      newPetsArray = this.shuffleArray(newPetsArray);
      this.setState({ petsArray: this.state.petsArray.concat(newPetsArray), showMenu: false, lastOffset: offset});
      this.buildPetList();
    });
  },

  hideHero() {
    this.setState({ showHero: false });
  },

  loadPetData() {
    let animalList = this.state.animalFilter;
    let lastOffsetParam = '&offset=' + this.state.lastOffset;
    let countParam = '&count=' + Math.floor(80/this.state.animalFilter.length);

    let requests = animalList.map((animalType) => {
      const requestUrl = 'http://api.petfinder.com/pet.find?key=52df70200e91359260ab77142b806d7f&format=json&location=' + this.state.locationFilter + '&animal=' + animalType + lastOffsetParam;

      return request.get(requestUrl).use(jsonp({timeout: 5000}));
    });

    return Promise.all(requests);
  },

  showNavMenu() {
    this.setState({ showNavMenu: true });
  },

  shuffleArray(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  },

  submitPetSearch(location, animals) {
    this.setState({ locationFilter: location, animalFilter: animals, lastOffset: 0 }, () => {
      this.loadPetData().then((responses) => {
        let newPetsArray = [];
        let offset = responses[0].body.petfinder.lastOffset.$t;

        responses.map((response) => {
          newPetsArray = newPetsArray.concat(response.body.petfinder.pets.pet.filter((pet) => {
            return pet.media.photos;
          }));
        });

        newPetsArray = this.shuffleArray(newPetsArray);
        this.setState({ petsArray: newPetsArray, showMenu: false, lastOffset: offset });
        this.buildPetList();
        this.hideHero();
        this.showNavMenu();
      }).catch((err) => {
        console.log(err);
      });
    });
  },

  toggleMenu(open) {
    this.setState({ showMenu: open || !this.state.showMenu });
  },

  render() {
    let menu = <PetsMenu locationFilter={this.state.locationFilter} animalFilter={this.state.animalFilter} />
    let hero = this.state.showHero ? <PetsHero dismiss={ this.hideHero } search={ this.submitPetSearch } /> : null;
    let loadButton = this.state.showHero ? null : (<div className="columns">
      <p className="column is-12 load-button">
        <button className="button is-large" onClick={this.loadMoreItems}>Load More Pets...</button>
      </p>
    </div>);

    let mainContent = (
      <div className="pets-route">
        <PetsNav toggleMenu={ this.toggleMenu } showNavMenu = { this.state.showNavMenu } />
        {hero}
        <ScrollArea
          speed={0.8}
          className="container is-fluid pets-list"
          horizontal={false}>
          <div className="container is-fluid pets-list">
            <div className="columns is-multiline">
              {this.state.petList}
            </div>
            {loadButton}
          </div>
        </ScrollArea>

      </div>
    )

    return (
      <Sidebar sidebar={ menu }
               children={ mainContent}
               open={ this.state.showMenu }
               onSetOpen={ this.toggleMenu } />
    )
  }
})

module.exports = Pets;
