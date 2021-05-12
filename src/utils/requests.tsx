import axios from 'axios';
import { CATEGORY } from './constants';

export const addCategory = (category: { name: string }): Promise<Response> => {
  try {
    return axios.post(CATEGORY, category);
  } catch (error) {
    throw new Error(error.message);
  }
};
