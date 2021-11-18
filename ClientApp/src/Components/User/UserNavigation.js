import React, { useState, useEffect } from 'react';
import { Link as LinkS } from 'react-scroll';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import SignUp from './SignUp';
import BackDrop from '../BackDrop';
import Booked from './Booked';
import createHistory from 'history/createBrowserHistory';
import { IoCart } from 'react-icons/io5';

function UserNavigation() {
  const [signup, setsignup] = useState(false);
  const [cart, setCart] = useState(false);
  const [category, setCategory] = useState([]);
  const history = createHistory();

  const refreshRow = () => {
    fetch(process.env.REACT_APP_API + 'categories')
      .then(response => response.json())
      .then(data => {
        setCategory(data);
      });
  };

  const userExists = localStorage.getItem('userName:' && 'userEmail:');

  useEffect(() => {
    refreshRow();
  }, []);

  const buttonHandler = () => {
    localStorage.removeItem('userName:');
    localStorage.removeItem('userEmail:');
    alert('You have been logged out');
    history.go(0);
  };

  return (
    <>
      {signup && (
        <BackDrop loading={false}>
          <SignUp setsignup={setsignup} />
        </BackDrop>
      )}
      {cart && (
        <BackDrop loading={false}>
          <Booked setCart={setCart} />
        </BackDrop>
      )}

      <div className='navbar w-full bg-gray-700 '>
        <div className='navbar mb-2 shadow-lg bg-neutral bg-gray-800 rounded-lg text-neutral-content rounded-box w-11/12 mx-auto '>
          <div className='px-2 mx-2 navbar-start'>
            <Link to='/'>
              <span className='text-lg text-white font-bold cursor-pointer'>
                BookMyMovie
              </span>
            </Link>
          </div>
          <div className='hidden px-2 mx-2 navbar-center lg:flex'>
            <div className='flex items-stretch'>
              {category.map(cat => (
                <LinkS
                  className='btn btn-ghost btn-md text-white font-poster rounded-btn'
                  to={cat.CategoryName}
                  key={cat.CategoryId}
                >
                  {cat.CategoryName}
                </LinkS>
              ))}
            </div>
          </div>
          <div className='navbar-end mr-4'>
            {userExists ? (
              <div>
                <button
                  onClick={() => setCart(true)}
                  className='btn btn-square btn-ghost  '
                >
                  <IoCart className='text-2xl text-white font-medium ' />
                </button>
                <button
                  onClick={() => buttonHandler()}
                  className='btn btn-square btn-ghost  '
                >
                  <FiLogOut className='text-xl text-white font-medium ' />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setsignup(true)}
                className='px-3.5 py-1.5 transition-all duration-300 ease-in-out  text-xs font-semibold text-gray-800 font-poster rounded-md border-opacity-50  bg-white border-2 border-gray-800'
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNavigation;
