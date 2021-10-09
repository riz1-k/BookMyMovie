import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <div className='navbar w-full  '>
        <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box w-11/12 mx-auto '>
          <div className='px-2 mx-2 navbar-start'>
            <NavLink to='/'>
              <span className='text-lg font-bold cursor-pointer'>
                BookMyMovie
              </span>
            </NavLink>
          </div>
          <div className='hidden px-2 mx-2 navbar-center lg:flex'>
            <div className='flex items-stretch'>
              <NavLink
                className='btn btn-ghost btn-md font-poster rounded-btn'
                to='/admin/'
                activeClassName='border-4 border-opacity-25 border-gray-400'
              >
                Users
              </NavLink>
              <NavLink
                className='btn btn-ghost btn-md font-poster rounded-btn'
                to='/admin/movies'
                activeClassName='border-4 border-opacity-25 border-gray-400'
              >
                Movies
              </NavLink>
              <NavLink
                className='btn btn-ghost btn-md font-poster rounded-btn '
                to='/admin/categories'
                activeClassName='border-4 border-opacity-25 border-gray-400'
              >
                Categories
              </NavLink>
            </div>
          </div>
          <div className='navbar-end mr-4'>
            <button className='btn btn-square btn-ghost'>
              <i className='bx bxs-user-check text-3xl'></i>
            </button>
            <button className='btn btn-square btn-ghost'>
              <i className='bx bx-conversation text-2xl'></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
