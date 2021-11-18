import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AddMovModal from '../../Models/AddMovModal';
import EditMovModal from '../../Models/EditMovModal';
require('dotenv').config();

export default function Movie() {
  const [cinemas, setCinemas] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalData, setEditModalData] = useState({
    cinId: '',
    cinName: '',
    cinAddress: '',
  });

  const { cinId, cinName, cinAddress } = editModalData;

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'cinemas')
      .then(response => response.json())
      .then(data => {
        setCinemas(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, [cinemas]);

  const deleteCin = cinId => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'cinemas/' + cinId, {
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
      <section class='container mx-auto p-6 font-mono'>
        <div class='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
          <div class='w-full overflow-x-auto no-scrollbar'>
            <table class='w-full '>
              <thead>
                <tr class='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                  <th class='px-4 py-3'>Id</th>
                  <th class='px-4 py-3'>Cinema Name</th>
                  <th class='px-4 py-3'>Cinema Address</th>
                </tr>
              </thead>
              <tbody class='bg-white'>
                {cinemas.map(cin => (
                  <tr
                    class='text-gray-700 hover:bg-gray-100  '
                    key={cin.CinemaId}
                  >
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>{cin.CinemaId}</p>
                        </div>
                      </div>
                    </td>
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {cin.CinemaName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {cin.CinemaAddress}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class='px-1 py-3 text-sm border'>
                      <div className='flex justify-start mx-2'>
                        <button
                          className='py-1 text-white  px-2 bg-green-500 mx-1 rounded-full hover:scale-105'
                          onClick={() => {
                            setEditModalShow(true);
                            setEditModalData({
                              cinId: cin.CinemaId,
                              cinName: cin.CinemaName,
                              cinAddress: cin.cinAddress,
                            });
                          }}
                        >
                          <i class='bx bxs-edit-alt text-xl'></i>
                        </button>
                        <button
                          className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                          onClick={() => deleteCin(cin.cinId)}
                        >
                          <i class='bx bxs-calendar-x  '></i>
                        </button>
                      </div>

                      <EditMovModal
                        show={editModalShow}
                        onHide={editModalClose}
                        cinId={cinId}
                        cinName={cinName}
                        cinAddress={cinAddress}
                      />
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
