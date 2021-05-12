export enum Paths {
  HOME = '/',
  ADD_CATEGORY = '/categories',
  LIST_DETAILS = '/list/:id',
}

export interface Category {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
}

export interface List {
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  id: number;
  description: string;
  listId: number;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface newItem {
  description: string;
  listId: number;
  done: boolean;
}
