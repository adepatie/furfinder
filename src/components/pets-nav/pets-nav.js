import React, { Component } from 'react';
import PetFilter from '../pet-filter/pet-filter.js';

class PetsNav extends Component {
  constructor() {
    super();
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.props.toggleMenu();
  }

  render() {
    let menuIcon = this.props.showNavMenu ? (<a className="nav-item" onClick={this.toggleMenu}>
      <span className="icon">
        <i className="icon-filter"></i>
      </span>
    </a>) : null;
    
    return (
      <div className="nav has-shadow">
        <div className="nav-left" >
          { menuIcon }
          <h2 className=" nav-item title">FurFinder</h2>
        </div>
        <div className="nav-center" ></div>
        <div className="nav-center" ></div>
      </div>
    )
  }
}

export default PetsNav;
