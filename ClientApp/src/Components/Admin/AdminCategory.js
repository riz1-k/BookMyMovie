import React, { useState, useEffect } from 'react';
import AddCatModal from '../../Models/AddCatModal';
import EditCatModal from '../../Models/EditCatModal';
require('dotenv').config();

export default function Category() {
  const [cats, setCats] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalData, setEditModalData] = useState({
    catid: '',
    catname: '',
  });
  const { catid, catname } = editModalData;
  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'categories')
      .then(response => response.json())
      .then(data => {
        setCats(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, [cats]);

  const deleteCat = catid => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'categories/' + catid, {
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
                  <th class='px-4 py-3'>Category Name</th>
                  <th class='px-4 py-3'>Options</th>
                </tr>
              </thead>
              <tbody class='bg-white'>
                {cats.map(cat => (
                  <tr
                    class='text-gray-700 hover:bg-gray-100  '
                    key={cat.CategoryId}
                  >
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {cat.CategoryId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {cat.CategoryName}
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
                              catid: cat.CategoryId,
                              catname: cat.CategoryName,
                            });
                          }}
                        >
                          <i class='bx bxs-edit-alt text-xl'></i>
                        </button>
                        <button
                          className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                          onClick={() => deleteCat(cat.CategoryId)}
                        >
                          <i class='bx bxs-calendar-x  '></i>
                        </button>
                      </div>

                      <EditCatModal
                        show={editModalShow}
                        onHide={editModalClose}
                        catid={catid}
                        catname={catname}
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
            <i class='bx bx-plus'></i>
          </button>
          <AddCatModal show={addModalShow} onHide={addModalClose}></AddCatModal>
        </div>
      </section>
    </>
  );
}
