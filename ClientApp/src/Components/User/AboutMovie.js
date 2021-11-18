import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay } from 'swiper';
import { ImTicket } from 'react-icons/im';
import BackDrop from '../BackDrop';
import BookMovie from './BookMovie';
SwiperCore.use([Autoplay]);

function Movie() {
  const [movieInfo, setmovieInfo] = useState([]);
  const [payment, setpayment] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetch(process.env.REACT_APP_API + `movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setmovieInfo(data);
      });
  };

  var price = '';
  var moviename = '';
  var cinema = '';
  var showdata = '';
  var showtime = '';

  movieInfo.forEach(mov => {
    moviename = mov.MovieName;
    cinema = mov.Cinema;
    showdata = mov.ShowDate;
    showtime = mov.ShowTiming;
    price = mov.Price;
  });

  const posterImg = filename => {
    return process.env.REACT_APP_PHOTOPATH + filename;
  };

  return (
    <>
      {payment && (
        <BackDrop loading={false}>
          <BookMovie
            setpayment={setpayment}
            MovieName={moviename}
            Cinema={cinema}
            ShowData={showdata}
            ShowTime={showtime}
            price={price}
          />
        </BackDrop>
      )}
      <div className='h-screen bg-gray-800'>
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
                  <div className='flex justify-self-start bottom-20  left-72 absolute z-30'></div>
                  <p className='bottom-20 overflow-hidden left-72 text-lg font-sans font-medium text-left absolute z-30'>
                    {infos.Summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button className=' m-4 block font-poster font-medium rounded-lg py-2  px-6   shadow focus:shadow-outline focus:outline-none text-white text-md   bg-blue-500 hover:bg-blue-600 cursor-pointer '>
            <ImTicket />
            <div onClick={() => setpayment(true)} className='ml-1'>
              {' '}
              Buy Ticket ₹{price}{' '}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
