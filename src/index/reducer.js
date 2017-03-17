import { combineReducers } from 'redux';
import { SELECT_PET } from './constants';

function petsList(state = [], action) {
  switch (action.type) {
    default:
    return state;
  }
}

function selectedPet(state = {}, action) {
  switch (action.type) {
    case SELECT_PET:
      return action.pet;
    default:
      return state;
  }
}

export default combineReducers({
  petsList,
  selectedPet
});
