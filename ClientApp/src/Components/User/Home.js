import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import moment from 'moment';
import SwiperCore, { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay]);

function Home() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState([]);

  const refreshRow = () => {
    fetch(process.env.REACT_APP_API + 'categories')
      .then(response => response.json())
      .then(data => {
        setCategory(data);
      });
    fetch(process.env.REACT_APP_API + 'movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });
  };

  useEffect(() => {
    refreshRow();
  }, []);

  const posterImg = filename => {
    return process.env.REACT_APP_PHOTOPATH + filename;
  };

  return (
    <>
      <div className='h-full bg-gray-700 pt-5'>
        {category.map(cat => {
          return (
            <div
              className='h-auto py-6 w-11/12 mx-auto border-b-2 border-gray-500 mt-8 '
              key={cat.CategoryId}
              id={cat.CategoryName}
            >
              <div className='text-white font-bold h-8 text-xl ml-7  flex mb-3 items-center '>
                {cat.CategoryName}
              </div>

              <Swiper spaceBetween={70} slidesPerView={6} navigation>
                {movies
                  .filter(movie => movie.Category === cat.CategoryName)
                  .map(movie => (
                    <SwiperSlide className='mx-3' key={movie.MovieId}>
                      <Link to={`/movie/${movie.MovieId}`}>
                        <div className=' hover:mt-3 ease-in-out rounded-lg h-80 w-56 flex cursor-pointer shadow-lg  relative  '>
                          <img
                            src={posterImg(movie.PosterFileName)}
                            alt='poster'
                            className=' h-80 w-56 rounded-lg z-10 hover:mb-6  '
                          />
                          <div className='h-4/5 w-56 absolute bottom-0 bg-gradient-to-t from-black to-transparent z-20 rounded-lg'></div>
                          <p className='bottom-7 text-base text-white font-sans font-semibold absolute z-30 left-2'>
                            {movie.MovieName}
                          </p>

                          <div className=''>
                            <p className='bottom-1 left-2 text-white text-md font-sans font-semibold absolute z-30 '>
                              <i className='bx bxs-star  mr-1 text-yellow-400'></i>
                              {movie.Rating}
                            </p>
                            <p className='bottom-1 right-4 text-white text-md font-sans font-semibold absolute z-30'>
                              <i className='bx bxs-calendar mr-1 text-blue-400'></i>
                              {moment(movie.ShowDate).format('ll')}
                            </p>
                            <p className='bottom-0 left-12 text-md font-sans font-semibold absolute z-30'></p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
