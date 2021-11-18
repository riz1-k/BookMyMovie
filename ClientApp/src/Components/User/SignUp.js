import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Login from './Login';
import BackDrop from '../BackDrop';

function SignUp({ setsignup }) {
  const [login, setlogin] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    refreshList();
    const accExists = Users.filter(user => user.UserEmail === userInfo.Email);
    console.log(accExists);
    if (accExists.length <= 0) {
      fetch(process.env.REACT_APP_API + 'users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserName: userInfo.UserName,
          UserEmail: userInfo.Email,
          UserPassword: userInfo.Password,
        }),
      })
        .then(res => res.json())
        .then(
          result => {
            localStorage.setItem('userName:', userInfo.UserName);
            localStorage.setItem('userEmail:', userInfo.UserEmail);
            alert('Account created');
            setsignup(false);
            console.log(result);
          },
          error => {
            alert('Failed while tring  to create an account');
            console.log(error);
          }
        );
    } else {
      alert('Email has already been registered!');
    }
  };

  const ref = useRef(null);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <>
      {login && (
        <BackDrop loading={false}>
          <Login setlogin={setlogin} />
        </BackDrop>
      )}
      <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster'>
        <div
          onClick={() => setsignup(false)}
          className='flex justify-end h-12 '
        >
          <IoClose className='text-2xl text-gray-600  cursor-pointer' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
            Create An Account
          </h1>
          <p className='w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-default'>
            Create an account to enjoy all the services without any ads!
          </p>
        </div>
        <form onSubmit={handleSubmit} ref={ref}>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name'
              required
              aria-required='true'
              name='UserName'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              onChange={changeHandler}
            />
            <input
              type='email'
              placeholder='Email'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              aria-required='true'
              name='Email'
              onChange={changeHandler}
            />
            <input
              type='password'
              placeholder='Password'
              name='Password'
              className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
              required
              onChange={changeHandler}
              aria-required='true'
            />
          </div>
          <div className='text-center mt-6'>
            <button
              type='submit'
              className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-lg'
            >
              Create Account
            </button>

            <p
              onClick={() => {
                setlogin(true);
              }}
              className='mt-4 text-md  font-medium '
            >
              Already Have An Account?
              <span className='hover:underline cursor-pointer'> Sign In</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
