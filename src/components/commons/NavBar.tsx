import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../img/logo2.png';

const NavBar = (): JSX.Element => {
  return (
    <header>
      <div className='menu'>
        <div className='menu-item'>
          <Link id='logo' to='/'>
            <img src={logo} alt='logo' width='35' height='70' />
          </Link>
        </div>
        <div className='menu-item' id='link-create-post'>
          <Link id='create-post' to='/categories'>
            Add a Category
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
