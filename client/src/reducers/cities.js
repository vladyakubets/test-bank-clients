import {FETCH_CITIES } from '../constants/actionTypes';

export default (cities = [], action) => {
  switch (action.type) {
    case FETCH_CITIES:
      return action.payload;
    default:
      return cities;
  }
};

