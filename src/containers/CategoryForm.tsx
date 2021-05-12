import React from 'react';
import { useHistory } from 'react-router';
import { validateForm } from '../utils/helpers';
import { addCategory } from '../utils/requests';

const CategoryForm = (): JSX.Element => {
  const { push } = useHistory();

  const submitCategory = async () => {
    const validName = validateForm('name-error', 'category-name-input');
    if (validName) {
      const inputElement = document.getElementById(
        'category-name-input'
      ) as HTMLInputElement;
      const name = inputElement.value.trim();
      const newCategory = { name };
      try {
        await addCategory(newCategory);
        push('/');
        window.alert('Category Saved');
      } catch (error) {
        window.alert(
          'We were not able to save the new category, please try later'
        );
      }
    }
  };

  return (
    <div id='add-category'>
      <form>
        <h1>Add a Category</h1>
        <div className='input-group'>
          <label id='category-name-lbl' htmlFor='name'>
            Name
          </label>
          <input
            name='name'
            id='category-name-input'
            type='text'
            onInput={() => validateForm('name-error', 'category-name-input')}
          />
        </div>
        <span className='error' id='name-error'></span>
        <div id='submit-category' onClick={submitCategory}>
          Add
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
