import React, { useEffect, useState } from 'react';
import moment from 'moment';
require('dotenv').config();

export default function Movie() {
  const [book, setBook] = useState([]);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'booked')
      .then(response => response.json())
      .then(data => {
        setBook(data);
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
    <>
      <section className='container mx-auto p-6 font-mono'>
        <div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
          <div className='w-full overflow-x-auto no-scrollbar'>
            <table className='w-full'>
              <thead>
                <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                  <th className='px-4 py-3'>Booked ID</th>
                  <th className='px-4 py-3'>User Name</th>
                  <th className='px-4 py-3'>Movie</th>
                  <th className='px-4 py-3'>Cinema</th>
                  <th className='px-4 py-3'>Show Date</th>
                  <th className='px-4 py-3'>Show Timing</th>
                  <th className='px-1 py-3'>Options</th>
                </tr>
              </thead>

              <tbody className='bg-white'>
                {book.map(mov => (
                  <tr
                    className='text-gray-700 hover:bg-gray-100  '
                    key={mov.BookedId}
                  >
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.BookedId}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.UserName}
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.UserEmail}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
