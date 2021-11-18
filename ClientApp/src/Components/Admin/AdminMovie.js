import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AddMovModal from '../../Models/AddMovModal';
import EditMovModal from '../../Models/EditMovModal';
require('dotenv').config();

export default function Movie() {
  const [movs, setMovs] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalData, setEditModalData] = useState({
    movid: '',
    movname: '',
    category: '',
    rating: 0,
    showdate: null,
    Cinema: '',
    ShowTiming: null,
    posterFileName: '',
    summary: '',
    price: '',
  });
  const classNames = (...classes) => classes.filter(Boolean).join(' ');
  const {
    movid,
    category,
    movname,
    rating,
    showdate,
    cinema,
    showtiming,
    posterFileName,
    summary,
    price,
  } = editModalData;
  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'movies')
      .then(response => response.json())
      .then(data => {
        setMovs(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, [movs]);

  const posterImg = filename => {
    return process.env.REACT_APP_PHOTOPATH + filename;
  };

  const deleteMov = movid => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'movies/' + movid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  const addModalClose = () => setAddModalShow(false);
  const editModalClose = () => setEditModalShow(false);
  return (
    <>
      <section className='container mx-auto p-6 font-mono'>
        <div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
          <div className='w-full overflow-x-auto no-scrollbar'>
            <table className='w-full'>
              <thead>
                <tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                  <th className='px-4 py-3'>Movie</th>
                  <th className='px-4 py-3'>Rating</th>
                  <th className='px-3 py-3'>Category</th>
                  <th className='px-4 py-3'>Cinema</th>
                  <th className='px-4 py-3'>Show Date</th>
                  <th className='px-4 py-3'>Show Timing</th>
                  <th className='px-4 py-3'>Price</th>
                  <th className='px-1 py-3'>Options</th>
                </tr>
              </thead>

              <tbody className='bg-white'>
                {movs.map(mov => (
                  <tr
                    className='text-gray-700 hover:bg-gray-100  '
                    key={mov.MovieId}
                  >
                    <td className='px-4 py-3 border'>
                      <div className='flex items-center text-sm'>
                        <div className='relative w-16 h-14 mr-3  md:block'>
                          <img
                            className='object-cover w-full h-full rounded-sm'
                            src={posterImg(mov.PosterFileName)}
                            alt={mov.PosterFileName}
                            loading='lazy'
                          />
                          <div
                            className='absolute inset-0 rounded-full shadow-inner'
                            aria-hidden='true'
                          ></div>
                        </div>
                        <div>
                          <p className='font-semibold text-black'>
                            {mov.MovieName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-ms font-semibold border'>
                      {mov.Rating}
                    </td>
                    <td className={'px-4 py-3 text-xs border'}>
                      <span
                        className={classNames(
                          `px-2 py-1 font-semibold leading-tight`,
                          mov.Category === 'Sci-Fi' &&
                            `text-green-600 bg-green-100`,
                          mov.Category === 'Horror' &&
                            `text-red-600 bg-red-100`,
                          mov.Category === 'Thriller' &&
                            `text-blue-600 bg-blue-100`,
                          mov.Category === 'Fantasy' &&
                            `text-purple-600 bg-purple-200`,
                          mov.Category === 'Comedy' &&
                            `text-yellow-500 bg-yellow-100`,
                          mov.Category === 'Drama' &&
                            `text-indigo-400 bg-indigo-100`,
                          mov.Category === 'Romance' &&
                            `text-pink-400 bg-pink-100`
                        )}
                      >
                        {mov.Category}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-sm border'>{mov.Cinema}</td>

                    <td className='px-4 py-3 text-sm border'>
                      {moment(mov.ShowDate).format('LL')}
                    </td>
                    <td className='px-4 py-3 text-sm border'>
                      {mov.ShowTiming}
                      {console.log(mov.ShowTiming)}
                    </td>
                    <td className='px-4 py-3 text-sm border'>{mov.Price}</td>

                    <td className='px-1 py-3 text-sm border'>
                      <div className='flex justify-start mx-2'>
                        <button
                          className='py-1 text-white  px-2 bg-green-500 mx-1 rounded-full hover:scale-105'
                          onClick={() => {
                            setEditModalShow(true);
                            setEditModalData({
                              movid: mov.MovieId,
                              movname: mov.MovieName,
                              category: mov.Category,
                              rating: mov.Rating,
                              showdate: mov.ShowDate,
                              cinema: mov.Cinema,
                              showtiming: mov.ShowTiming,
                              photofilename: mov.photofilename,
                              summary: mov.Summary,
                              price: mov.Price,
                            });
                          }}
                        >
                          <i className='bx bxs-edit-alt text-xl'></i>
                        </button>
                        <button
                          className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                          onClick={() => deleteMov(mov.MovieId)}
                        >
                          <i className='bx bxs-calendar-x  '></i>
                        </button>
                      </div>

                      <EditMovModal
                        show={editModalShow}
                        onHide={editModalClose}
                        movid={movid}
                        movname={movname}
                        category={category}
                        rating={rating}
                        showdate={showdate}
                        cinema={cinema}
                        showtiming={showtiming}
                        posterFileName={posterFileName}
                        summary={summary}
                        price={price}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button
            className='py-1 text-white text-xl  px-2 bg-blue-500 mx-1 rounded-full '
            onClick={() => setAddModalShow(true)}
          >
            <i className='bx bx-plus'></i>
          </button>
          <AddMovModal show={addModalShow} onHide={addModalClose}></AddMovModal>
        </div>
      </section>
    </>
  );
}
