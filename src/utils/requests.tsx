import axios, { AxiosResponse } from 'axios';
import { CATEGORY, LISTS, ITEMS } from './constants';
import { newItem } from './types/basicTypes.d';

// Requests for Categories

export const getAllCategories = (): Promise<AxiosResponse> => {
  try {
    return axios.get(CATEGORY);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSingleCategory = (id: string): Promise<AxiosResponse> => {
  try {
    return axios.get(`${CATEGORY}/${id}`);
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

// Requests for Lists

export const getAllLists = (): Promise<AxiosResponse> => {
  try {
    return axios.get(`${LISTS}?order=DESC`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSingleList = (id: string): Promise<AxiosResponse> => {
  try {
    return axios.get(`${LISTS}/${id}`);
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

// Requests for Items

export const getAllItems = (): Promise<AxiosResponse> => {
  try {
    return axios.get(`${ITEMS}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addItem = (item: newItem): Promise<AxiosResponse> => {
  try {
    return axios.post(ITEMS, item);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateItem = (
  id: string,
  item: newItem
): Promise<AxiosResponse> => {
  try {
    return axios.put(`${ITEMS}/${id}`, item);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteItem = (id: string): Promise<AxiosResponse> => {
  try {
    return axios.delete(`${ITEMS}/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
