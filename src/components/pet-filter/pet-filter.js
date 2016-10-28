import React, { Component } from 'react';

class PetFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationFilter: '',
      animalFilter: [],
    };
    this.animalTypes = [
      'barnyard', 'bird', 'cat', 'dog', 'horse', 'pig', 'reptile', 'smallfurry'
    ];
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.onAnimalSelection = this.onAnimalSelection.bind(this);
    this.search = this.search.bind(this);
  }

  handleLocationChange(e) {
    this.setState({ locationFilter: e.target.value });
  }

  onAnimalSelection(e) {
    const selectedAnimal = e.target.value;

    this.setState((state, props) => {
      const selectedAnimalIndex = state.animalFilter.indexOf(selectedAnimal);
      let newState = state;

      if (selectedAnimalIndex === -1) {
        newState.animalFilter.push(selectedAnimal);
      } else {
        newState.animalFilter.splice(selectedAnimalIndex, 1);
      }
      return newState;
    });
  }

  animalChecklist() {
    return this.animalTypes.map((animalType) => {
      return (
        <p className="control"  key={ animalType }>
          <label className="checkbox">
            <input
              type="checkbox"
              onChange={ this.onAnimalSelection }
              value={ animalType }
              />
            { animalType }
          </label>
        </p>
      )
    });
  }

  search() {
    this.props.search(this.state.locationFilter, this.state.animalFilter.length > 0 ? this.state.animalFilter : this.animalTypes);
  }
}

export default PetFilter;
