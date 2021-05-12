import axios, { AxiosResponse } from 'axios';
import { CATEGORY, LISTS } from './constants';

export const getAllCategories = (): Promise<AxiosResponse> => {
  try {
    return axios.get(CATEGORY);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addCategory = (category: {
  name: string;
}): Promise<AxiosResponse> => {
  try {
    return axios.post(CATEGORY, category);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllLists = (): Promise<AxiosResponse> => {
  try {
    return axios.get(`${LISTS}?order=DESC`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addList = (list: {
  name: string;
  categoryId: number;
}): Promise<AxiosResponse> => {
  try {
    return axios.post(LISTS, list);
  } catch (error) {
    throw new Error(error.message);
  }
};
