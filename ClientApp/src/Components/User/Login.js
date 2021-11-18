import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

function Login({ setlogin }) {
  const history = useHistory();

  function handleClick() {
    history.push('/admin');
  }
  const [userInfo, setuserInfo] = useState([]);
  const [Users, setUsers] = useState([]);
  const ref = useRef(null);

  const changeHandler = e => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const refreshList = () => {
    fetch(process.env.REACT_APP_API + 'users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const findUser = Users.filter(
      user =>
        user.UserEmail === userInfo.UserEmail &&
        user.UserPassword === userInfo.UserPassword
    );

    var userName = '';
    findUser.forEach(e => {
      userName = e.UserName;
    });

    if (findUser.length > 0) {
      console.log('logged in');
      alert('Successfully Logged In');
      localStorage.setItem('userName:', userName);
      localStorage.setItem('userEmail:', userInfo.UserEmail);
      if (userInfo.UserEmail === 'admin@gmail.com') {
        handleClick();
      }
      setlogin(false);
    } else {
      alert('Login failed :( Please check your credentials ');
      console.log('login failed');
    }
  };

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <div className='py-12 px-12 bg-white rounded-2xl shadow-xl z-20 animate__animated animate__fadeInDown animate__faster '>
      <div onClick={() => setlogin(false)} className='flex justify-end h-12  '>
        <IoClose className='text-2xl text-gray-600  cursor-pointer' />
      </div>
      <div>
        <h1 className='text-3xl font-bold text-center mb-4 cursor-pointer'>
          Log in
        </h1>
      </div>
      <form onSubmit={handleSubmit} ref={ref}>
        <div className='space-y-4'>
          <input
            type='email'
            placeholder='Email'
            name='UserEmail'
            onChange={changeHandler}
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
          />
          <input
            type='password'
            placeholder='Password'
            name='UserPassword'
            onChange={changeHandler}
            className='block text-sm py-3 px-4 rounded-lg w-full border outline-none'
          />
        </div>
        <div className='text-center mt-6'>
          <button
            type='submit'
            className='block transition-all duration-300 ease-linear mx-auto shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white text-lg font-medium py-3 px-8 rounded-full'
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
