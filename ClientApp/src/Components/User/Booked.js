import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { IoClose } from 'react-icons/io5';
import { FiGift } from 'react-icons/fi';
import Backdrop from '../BackDrop';
import Gift from './Gift';

function Booked({ setCart }) {
  const [book, setBook] = useState([]);
  const [gift, setGift] = useState(false);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'booked')
      .then(response => response.json())
      .then(data => {
        setBook(
          data.filter(d => d.UserName === localStorage.getItem('userName:'))
        );
      });
  };

  useEffect(() => {
    refreshList();
  }, [book]);

  const deleteMov = bookid => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'booked/' + bookid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  return (
    <div>
      {gift && (
        <Backdrop loading={false}>
          <Gift setGift={setGift} />
        </Backdrop>
      )}
      <div onClick={() => setCart(false)} className='flex justify-end h-12  '>
        <IoClose className='text-2xl text-gray-600  cursor-pointer' />
      </div>
      <table class='w-full '>
        <thead>
          <tr class='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
            <th class='px-4 py-3'>Id</th>
            <th class='px-4 py-3'>MovieName</th>
            <th class='px-4 py-3'>Cinema </th>
            <th class='px-4 py-3'>Show Date</th>
            <th class='px-4 py-3'>Show Time</th>
            <th class='px-4 py-3'>Cancel</th>
            <th class='px-4 py-3'>Gift</th>
          </tr>
        </thead>
        <tbody class='bg-white'>
          {book.map(mov => (
            <tr
              className='text-gray-700 hover:bg-gray-100  '
              key={mov.BookedId}
            >
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.BookedId}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.MovieName}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.Cinema}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {moment(mov.ShowData).format('L')}
              </td>
              <td className='px-4 py-3 text-ms font-semibold border'>
                {mov.ShowTime}
              </td>
              <td className='px-1 py-3 text-sm border'>
                <div className='flex justify-start mx-2'>
                  <button
                    className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                    onClick={() => deleteMov(mov.BookedId)}
                  >
                    <i className='bx bxs-calendar-x  '></i>
                  </button>
                </div>
              </td>
              <td className='px-1 py-3 text-sm border'>
                <div className='flex justify-start mx-2'>
                  <button
                    onClick={() => setGift(true)}
                    className='py-1 text-white text-xl  px-2 bg-blue-500 mx-1 rounded-full  '
                  >
                    <FiGift />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booked;
