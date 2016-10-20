import React, { Component } from 'react';
import PetFilter from '../pet-filter/pet-filter.js';

class PetsHero extends PetFilter {
  constructor() {
    super();
    this.dismiss = this.dismiss.bind(this);
  }

  componentDidMount() {
    this.refs['submitButton'].addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 13) {
        this.refs['submitButton'].click();
      }
    });
  }
  dismiss() {
    this.props.dismiss();
  }

  handleLocationChange(e) {
    this.setState({ locationFilter: e.target.value });
  }

  render() {
    let animalChecklist = this.animalTypes.map((animalType) => {
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

    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <h3 className="title">Hi! Please take a moment to tell us what you're looking for...</h3>
            <p className="control">
              <input
                className="input"
                type="text"
                placeholder="City or Zipcode  (e.g. 'Charlotte, NC' or '28205')"
                value={ this.state.locationFilter }
                onChange={this.handleLocationChange}
                required />
            </p>
            <h4 className="subtitle">Select some species (If none are selected then all will be displayed)</h4>
            {animalChecklist}
            <button type="submit" onClick={this.search} ref="submitButton">Find me a friend!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PetsHero;
