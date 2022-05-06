import { FETCH_CITIES } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getCities = () => async (dispatch) => {
    try {
      const { data } = await api.fetchCities();
  
      dispatch({ type: FETCH_CITIES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };