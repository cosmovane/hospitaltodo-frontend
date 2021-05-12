import React, { useEffect, useState } from 'react';

import ListCard from '../components/ListCard';
import { setFormMessage } from '../utils/helpers';
import { addList, getAllCategories, getAllLists } from '../utils/requests';
import { Category, List } from '../utils/types/basicTypes.d';

const Lists = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newList, setNewList] = useState<boolean>(false);

  useEffect(() => {
    const getCategories = async () => {
      const allCategories = await getAllCategories().then(
        (response) => response.data
      );
      setCategories(allCategories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getLists = async () => {
      const allLists = await getAllLists().then((response) => response.data);
      setLists(allLists);
      setLoading(false);
    };

    getLists();
  }, [newList]);

  const validateForm = (): boolean => {
    const spanElement = document.getElementById(
      'name-list-error'
    ) as HTMLSpanElement;
    const inputElement = document.getElementById(
      'name-input'
    ) as HTMLInputElement;
    const name = inputElement.value.trim();
    const validName = name !== '';
    setFormMessage(validName, spanElement, inputElement, 'Name cannot be null');
    return validName;
  };

  const saveList = async () => {
    const validForm = validateForm();
    if (validForm) {
      const inputElement = document.getElementById(
        'name-input'
      ) as HTMLInputElement;
      const name = inputElement.value.trim();
      const selectElement = document.getElementById(
        'categories-select'
      ) as HTMLSelectElement;
      const categoryId = parseInt(selectElement.value);
      const newList = {
        name,
        categoryId,
      };
      try {
        await addList(newList);
        window.alert('List Saved');
        setNewList(true);
      } catch (error) {
        window.alert(
          'We were not able to save the new category, please try later'
        );
      }
    }
  };

  return (
    <div>
      <h1 className='add-list'>Add a List</h1>
      <div className='list-form'>
        <div className='list-info list-name-div'>
          <label htmlFor='name'>List name</label>
          <br />
          <input id='name-input' type='text' onInput={validateForm} />
          <br />
          <span className='error' id='name-list-error'></span>
        </div>
        <div className='list-info'>
          <label htmlFor='category'>Category</label>
          <br />
          <select name='categories' id='categories-select'>
            {categories.length > 0 ? (
              categories.map((category) => (
                <>
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                </>
              ))
            ) : (
              <>Loading...</>
            )}
          </select>
          <br />
          <span className='error' id='category-list-error'></span>
        </div>
        <div className='submit-list' onClick={saveList}>
          Submit List
        </div>
      </div>
      <div className='all-lists'>
        {loading ? (
          <div className='loader' />
        ) : (
          <>
            {categories.length > 0 &&
              lists.map((list) => {
                const category = categories.filter(
                  (cat) => cat.id === list.categoryId
                );
                return (
                  <>
                    <ListCard
                      key={list.id}
                      list={list}
                      category={category[0].name}
                    />
                  </>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Lists;
