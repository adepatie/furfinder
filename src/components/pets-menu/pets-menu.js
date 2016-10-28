import React, { Component } from 'react';
import PetFilter from '../pet-filter/pet-filter.js';

class PetsMenu extends PetFilter {
  constructor(props) {
    super(props);
    this.state = {
      locationFilter: props.locationFilter,
      animalFilter: props.animalFilter
    };
  }

  render() {
    return (
      <aside className="menu">
        <p className="menu-label">
          Location
        </p>
        <p className="control">
          <input
            className="input"
            type="text"
            placeholder="City or Zipcode  (e.g. 'Charlotte, NC' or '28205')"
            value={ this.state.locationFilter }
            onChange={this.handleLocationChange}
            required />
        </p>
        <p className="menu-label">
          Animals
        </p>
        { this.animalChecklist }
      </aside>
    )
  }
}

export default PetsMenu;
