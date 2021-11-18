import React, { useState, useEffect, useRef } from 'react';
import { FiGift } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function Gift({ setGift }) {
  const [u, setU] = useState([]);
  const ref = useRef();

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setU(data);
      });
  };
  useEffect(() => {
    refreshList();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'booked', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BookedId: event.target.BookedId.value,
        UserName: event.target.UserName.value,
        UserEmail: event.target.UserEmail.value,
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          alert(result);
        },
        error => {
          console.log(error);
          alert('Failed');
        }
      );
  };

  return (
    <div>
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster '>
        <div onClick={() => setGift(false)} className='flex justify-end h-12  '>
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Gift it your friend!
          </h1>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='number'
              placeholder='Id'
              name='BookedId'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
            <select
              name='UserName'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            >
              {u.map(user => (
                <option value={user.UserName}>{user.UserName}</option>
              ))}
            </select>
            <input
              type='email'
              placeholder='User Email'
              name='UserEmail'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='flex transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
            >
              Gift <FiGift className='text-white text-lg ml-2 mt-1' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Gift;
