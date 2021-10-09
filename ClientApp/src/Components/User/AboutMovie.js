import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay } from 'swiper';
import { FaYoutube } from 'react-icons/fa';
import { ImTicket } from 'react-icons/im';

SwiperCore.use([Autoplay]);

function Movie({ movieid }) {
  const [movieInfo, setmovieInfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    fetch(process.env.REACT_APP_API + `movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setmovieInfo(data);
      });
  };

  const posterImg = filename => {
    return process.env.REACT_APP_PHOTOPATH + filename;
  };

  return (
    <>
      <div className='h-full w-10/12 mx-auto'>
        <div className='h-auto w-full bg-black'>
          <div className=' '>
            {movieInfo.map(infos => (
              <div
                key={infos.MovieId}
                className='container relative h-movieposter w-8/12 text-center text-white mx-auto z-10  '
              >
                <img
                  src={posterImg(infos.PosterFileName)}
                  alt='poster'
                  className='h-full w-11/12 absolute  z-10'
                />
                <div className=' h-full w-11/12 absolute left-0 bg-gradient-to-r from-black to-transparent z-20  '></div>
                <div className=' h-full w-6/12 absolute right-0 bg-gradient-to-l from-black to-transparent z-20  '></div>
                <div className=' h-3/6 w-full absolute bottom-0 bg-gradient-to-t from-black to-transparent z-20  '></div>
                <img
                  src={posterImg(infos.PosterFileName)}
                  className=' absolute z-30 h-72 w-64 bottom-20 rounded-lg  my-auto mx-auto shadow-4xl  '
                  alt='poster'
                />
                <p className='top-64 left-72 text-3xl font-poster font-semibold absolute z-30 '>
                  {infos.MovieName}
                </p>
                <p className='top-80 left-72 text-xl font-poster font-semibold absolute z-30 '>
                  <i className='bx bxs-star mr-1 text-yellow-400 text-xl'></i>
                  {infos.Rating}
                </p>
                <div className='flex justify-self-start bottom-20  left-72 absolute z-30'>
                  <button className='  block font-poster font-medium rounded-lg py-2  px-6   shadow focus:shadow-outline focus:outline-none text-white text-md   bg-blue-500 hover:bg-blue-600 cursor-pointer '>
                    <ImTicket />
                    <div className='ml-1'> Buy Ticket</div>
                  </button>
                  <button className='  block font-poster font-medium rounded-lg py-2  px-6   shadow focus:shadow-outline focus:outline-none text-white text-md   bg-red-500 hover:bg-red-600 cursor-pointer ml-5   '>
                    <FaYoutube className='text-xl' />
                    <div className='ml-2'>Trailer</div>
                  </button>
                </div>
                {/* <p className='bottom-14 left-72 text-lg font-sans font-medium text-left absolute z-30'>
                  {infos.Summary}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Movie;
