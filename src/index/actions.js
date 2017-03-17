import { SELECT_PET } from './constants';

export function selectPet(pet) {
  return {
    type: SELECT_PET,
    pet
  }
}
