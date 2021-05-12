import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { validateForm } from '../utils/helpers';
import {
  addItem,
  getAllItems,
  getSingleCategory,
  getSingleList,
  updateItem,
} from '../utils/requests';
import { Category, Item, List, newItem } from '../utils/types/basicTypes';

const ListDetails = (): JSX.Element => {
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  const [list, setList] = useState<List | null>(null);
  const [listItems, setListItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category | null>(null);
  const [newItemSaved, setNewItem] = useState<boolean>(false);

  const getListItems = async () => {
    const allItems: Item[] = await getAllItems().then(
      (response) => response.data
    );
    const listId = parseInt(id);
    const itemsFiltered = allItems.filter((item) => item.listId === listId);
    setListItems(itemsFiltered);
  };

  useEffect(() => {
    const getListInfo = async () => {
      const listInfo: List = await getSingleList(id).then(
        (response) => response.data
      );
      setList(listInfo);
    };

    getListInfo();
    getListItems();
  }, []);

  useEffect(() => {
    getListItems();
  }, [newItemSaved]);

  useEffect(() => {
    const getCategory = async () => {
      if (list && 'categoryId' in list) {
        const singleCategory: Category = await getSingleCategory(
          String(list.categoryId)
        ).then((response) => response.data);
        setCategory(singleCategory);
        setLoading(false);
      }
    };
    getCategory();
  }, [list]);

  const submitItem = async () => {
    const validDescription = validateForm('item-error', 'item-input');
    if (validDescription) {
      const inputElement = document.getElementById(
        'item-input'
      ) as HTMLInputElement;
      const description = inputElement.value.trim();
      const itemToSave: newItem = {
        description,
        listId: parseInt(id),
        done: false,
      };
      try {
        await addItem(itemToSave);
        inputElement.value = '';
        setNewItem(!newItemSaved);
      } catch (error) {
        window.alert('We were not able to save the new item, please try later');
      }
    }
  };

  const updateCurrentItem = async (
    e: React.MouseEvent<HTMLElement>,
    item: Item
  ) => {
    const checkbox = e.target as HTMLInputElement;
    const checked = checkbox.checked;
    const updatedItem: newItem = {
      description: item.description,
      done: checked,
      listId: item.listId,
    };
    try {
      await updateItem(String(item.id), updatedItem);
    } catch (error) {
      window.alert('We were not able to update the new item, please try later');
    }
  };

  return (
    <div className='details'>
      {loading ? (
        <div className='loader' />
      ) : (
        <>
          {list !== null && (
            <>
              <br />
              <div className='return'>
                <Link to='/'>Return</Link>
              </div>
              <h1>{list.name}</h1>
              <p>
                <strong>Category:</strong> {category?.name}
              </p>
              <p>
                <strong>Created:</strong> {list.createdAt}
              </p>
              <h3>Items</h3>
              <div className='full-form'>
                <div className='item-form'>
                  <input
                    className='form-element'
                    id='item-input'
                    type='text'
                    onInput={() => validateForm('item-error', 'item-input')}
                  />
                  <div className='add-item form-element' onClick={submitItem}>
                    Add Item
                  </div>
                </div>
                <span className='error' id='item-error'></span>
              </div>
              {listItems.length > 0 ? (
                <>
                  <div className='all-items'>
                    {listItems.map((item) => {
                      const checked = item.done;
                      return (
                        <>
                          <p key={item.id}>
                            <input
                              type='checkbox'
                              name='done'
                              id=''
                              defaultChecked={checked}
                              onClick={(e: React.MouseEvent<HTMLElement>) =>
                                updateCurrentItem(e, item)
                              }
                            />
                            {item.description} - {item.id}
                            <span className='delete-item'>X</span>
                          </p>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div>
                  <p>No items yet</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ListDetails;
