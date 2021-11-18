import React from 'react';
import { FiLock } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function BookMovie({
  setpayment,
  MovieName,
  Cinema,
  ShowData,
  ShowTime,
  price,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API + 'booked', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MovieName: MovieName,
        Cinema: Cinema,
        ShowData: ShowData,
        ShowTime: ShowTime,
        UserName: localStorage.getItem('userName:'),
        UserEmail: localStorage.getItem('userEmail:'),
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          alert('Your movie has been booked Successfully!');
        },
        error => {
          console.log(error);
          alert('Something went wrong');
        }
      );
  };

  return (
    <div>
      <div class='w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 max-w-{600px} '>
        <div class='w-full pt-1 pb-5'>
          <div class='bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center'>
            <FiLock class='mdi mdi-credit-card-outline text-3xl text-white' />
          </div>
        </div>
        <div
          onClick={() => setpayment(false)}
          className='flex justify-end h-12  '
        >
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div class='mb-10'>
          <h1 class='text-center font-bold text-xl uppercase'>
            Secure payment info
          </h1>
        </div>
        <div class='mb-3 flex -mx-2'>
          <div class='px-2'>
            <label for='type1' class='flex items-center cursor-pointer'>
              <input
                type='radio'
                class='form-radio h-5 w-5 text-indigo-500'
                name='type'
                id='type1'
                checked
              />
              <img
                src='https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png'
                class='h-8 ml-3'
              />
            </label>
          </div>
          <div class='px-2'>
            <label for='type2' class='flex items-center cursor-pointer'>
              <input
                type='radio'
                class='form-radio h-5 w-5 text-indigo-500'
                name='type'
                id='type2'
              />
              <img
                src='https://www.sketchappsources.com/resources/source-image/PayPalCard.png'
                class='h-8 ml-3'
              />
            </label>
          </div>
        </div>
        <div class='mb-3'>
          <label class='font-bold text-sm mb-2 ml-1'>Name on card</label>
          <div>
            <input
              class='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='John Smith'
              type='text'
              required
            />
          </div>
        </div>
        <div class='mb-3'>
          <label class='font-bold text-sm mb-2 ml-1'>Card number</label>
          <div>
            <input
              class='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='0000 0000 0000 0000'
              type='text'
              required
            />
          </div>
        </div>
        <div class='mb-3 -mx-2 flex items-end'>
          <div class='px-2 w-1/2'>
            <label class='font-bold text-sm mb-2 ml-1'>Expiration date</label>
            <div>
              <select
                required
                class='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'
              >
                <option value='01'>01 - January</option>
                <option value='02'>02 - February</option>
                <option value='03'>03 - March</option>
                <option value='04'>04 - April</option>
                <option value='05'>05 - May</option>
                <option value='06'>06 - June</option>
                <option value='07'>07 - July</option>
                <option value='08'>08 - August</option>
                <option value='09'>09 - September</option>
                <option value='10'>10 - October</option>
                <option value='11'>11 - November</option>
                <option value='12'>12 - December</option>
              </select>
            </div>
          </div>
          <div class='px-2 w-1/2'>
            <select
              required
              class='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'
            >
              <option value='2020'>2020</option>
              <option value='2021'>2021</option>
              <option value='2022'>2022</option>
              <option value='2023'>2023</option>
              <option value='2024'>2024</option>
              <option value='2025'>2025</option>
              <option value='2026'>2026</option>
              <option value='2027'>2027</option>
              <option value='2028'>2028</option>
              <option value='2029'>2029</option>
            </select>
          </div>
        </div>
        <div class='mb-10'>
          <label class='font-bold text-sm mb-2 ml-1'>Security code</label>
          <div>
            <input
              class='w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='000'
              type='text'
              required
            />
          </div>
        </div>
        <div class='mb-2'>
          <label class='font-bold text-sm  ml-1  '>User name :</label>
          <div>
            <input
              class='w-auto  px-3 py-2  border-2 cursor-not-allowed  border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='000'
              type='text'
              value={localStorage.getItem('userName:')}
              readOnly
            />
          </div>
        </div>
        <div class='mb-2'>
          <label class='font-bold text-sm  ml-1  '>Email</label>
          <div>
            <input
              class='w-auto  px-3 py-2  border-2 cursor-not-allowed  border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='000'
              type='text'
              value={localStorage.getItem('userEmail:')}
              readOnly
            />
          </div>
        </div>
        <div class='mb-2'>
          <label class='font-bold text-sm  ml-1  '>Price</label>
          <div>
            <input
              class='w-auto  px-3 py-2  border-2 cursor-not-allowed  border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
              placeholder='000'
              type='text'
              value={price}
              readOnly
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            class='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookMovie;
