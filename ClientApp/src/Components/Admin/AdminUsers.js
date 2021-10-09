import React, { useState, useEffect } from 'react';
require('dotenv').config();

export default function User() {
  const [users, setUsers] = useState([]);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  useEffect(() => {
    refreshList();
  }, [users]);

  const deleteUser = userid => {
    if (window.confirm('Are you sure?')) {
      fetch(process.env.REACT_APP_API + 'users/' + userid, {
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
      <section class='container mx-auto p-6 font-mono'>
        <div class='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
          <div class='w-full overflow-x-auto no-scrollbar'>
            <table class='w-full '>
              <thead>
                <tr class='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600 '>
                  <th class='px-4 py-3'>Id</th>
                  <th class='px-4 py-3'>Name</th>
                  <th class='px-4 py-3'>Email</th>
                  <th class='px-4 py-3'>Action</th>
                </tr>
              </thead>
              <tbody class='bg-white'>
                {users.map(user => (
                  <tr
                    class='text-gray-700 hover:bg-gray-100  '
                    key={user.UserId}
                  >
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>{user.UserId}</p>
                        </div>
                      </div>
                    </td>
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {user.UserName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class='px-4 py-3 border'>
                      <div class='flex items-center text-sm'>
                        <div>
                          <p class='font-semibold text-black'>
                            {user.UserEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class='px-1 py-3 text-sm border'>
                      <div className='flex justify-start mx-2'>
                        <button
                          className='py-1 text-white text-xl  px-2 bg-red-500 mx-1 rounded-full  '
                          onClick={() => deleteUser(user.UserId)}
                        >
                          <i class='bx bxs-calendar-x  '></i>
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
