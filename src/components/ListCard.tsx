import React from 'react';
import { Link } from 'react-router-dom';
import { List } from '../utils/types/basicTypes';

const ListCard = ({
  list,
  category,
}: {
  list: List;
  category: string;
}): JSX.Element => {
  return (
    <>
      <div className='list-card'>
        <Link to={`/list/${list.id}`}>
          <h3>{list.name}</h3>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Created:</strong> {list.createdAt}
          </p>
        </Link>
      </div>
    </>
  );
};

export default ListCard;
