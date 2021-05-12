export enum Paths {
  HOME = '/',
  ADD_CATEGORY = '/categories',
}

export type Category = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};

export interface List {
  id: number;
  name: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
