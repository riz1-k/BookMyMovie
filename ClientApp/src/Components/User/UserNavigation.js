import React, { useState, useEffect } from 'react';
import { Link as LinkS } from 'react-scroll';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import SignUp from './SignUp';
import BackDrop from '../BackDrop';

function UserNavigation() {
  const [signup, setsignup] = useState(false);
  const [category, setCategory] = useState([]);

  const refreshRow = () => {
    fetch(process.env.REACT_APP_API + 'categories')
      .then(response => response.json())
      .then(data => {
        setCategory(data);
      });
  };

  useEffect(() => {
    refreshRow();
  }, []);

  return (
    <>
      {signup && (
        <BackDrop loading={false}>
          <SignUp setsignup={setsignup} />
        </BackDrop>
      )}

      <div className='navbar w-full  '>
        <div className='navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box w-11/12 mx-auto '>
          <div className='px-2 mx-2 navbar-start'>
            <Link to='/'>
              <span className='text-lg font-bold cursor-pointer'>
                BookMyMovie
              </span>
            </Link>
          </div>
          <div className='hidden px-2 mx-2 navbar-center lg:flex'>
            <div className='flex items-stretch'>
              {category.map(cat => (
                <LinkS
                  className='btn btn-ghost btn-md font-poster rounded-btn'
                  to={cat.CategoryName}
                  key={cat.CategoryId}
                >
                  {cat.CategoryName}
                </LinkS>
              ))}
            </div>
          </div>
          <div className='navbar-end mr-4'>
            <button
              onClick={() => setsignup(true)}
              className='px-3.5 py-1.5 transition-all duration-300 ease-in-out  text-xs font-semibold text-gray-800 font-poster rounded-md border-opacity-50  bg-white border-2 border-gray-800'
            >
              Sign Up
            </button>
            <Link to='/login'>
              <button className='btn btn-square btn-cross px-3.5 py-1.5 transition-all duration-300 ease-in-out  text-xs font-semibold text-gray-800 font-poster rounded-md border-opacity-50  bg-white border-2 border-gray-800'>
                Login
              </button>
            </Link>
            <Link to='/admin'>
              <button className='btn btn-square btn-ghost'>
                <FiLogOut className='text-xl font-medium ' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNavigation;
