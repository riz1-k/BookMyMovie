import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddMovModal from '../Models/AddMovModal';
import EditMovModal from '../Models/EditMovModal';
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
    releasedate: null,
    posterFileName: '',
    summary: '',
  });
  const {
    movid,
    category,
    movname,
    rating,
    releasedate,
    posterFileName,
    summary,
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
      <div>
        <Table className='mt-4' stripped='true' bordered hover size='sm'>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Movie Id</th>
              <th>Movie Name</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Release Date</th>
              <th>Summary</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {movs.map(mov => (
              <tr key={mov.MovieId}>
                <img
                  src={posterImg(mov.PosterFileName)}
                  height='200px'
                  width='200px'
                  alt='img'
                />
                <td>{mov.MovieId}</td>
                <td>{mov.MovieName}</td>
                <td>{mov.Category}</td>
                <td>{mov.Rating}</td>
                <td>{moment(mov.ReleaseDate).format('ll')}</td>
                <td>{mov.Summary}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className='mr-2'
                      variant='info'
                      onClick={() => {
                        setEditModalShow(true);
                        setEditModalData({
                          movid: mov.MovieId,
                          movname: mov.MovieName,
                          category: mov.category,
                          rating: mov.rating,
                          releasedate: mov.releasedate,
                          posterFileName: mov.posterFileName,
                          summary: mov.summary,
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className='mr-5'
                      variant='danger'
                      onClick={() => deleteMov(mov.MovieId)}
                    >
                      Delete
                    </Button>
                    <EditMovModal
                      show={editModalShow}
                      onHide={editModalClose}
                      movid={movid}
                      movname={movname}
                      category={category}
                      rating={rating}
                      releasedate={releasedate}
                      posterFileName={posterFileName}
                      summary={summary}
                    />
                  </ButtonToolbar>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button variant='primary' onClick={() => setAddModalShow(true)}>
            Add Movie
          </Button>
          <AddMovModal show={addModalShow} onHide={addModalClose}></AddMovModal>
        </ButtonToolbar>
      </div>
    </>
  );
}
