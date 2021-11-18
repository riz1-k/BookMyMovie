import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export default function EditMovModal(props) {
  const [cats, setCats] = useState([]);
  const [cinemas, setcinemas] = useState([]);

  const {
    movid,
    movname,
    category,
    rating,
    showdate,
    cinema,
    showtiming,
    summary,
    posterfilename,
    price,
    onHide,
  } = props;
  const [photofilename, setPhotofilename] = useState(posterfilename);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'categories')
      .then(response => response.json())
      .then(data => {
        setCats(data);
      });
    fetch(process.env.REACT_APP_API + 'cinemas')
      .then(response => response.json())
      .then(data => {
        setcinemas(data);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'movies', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MovieId: event.target.MovieId.value,
        MovieName: event.target.MovieName.value,
        Category: event.target.Category.value,
        Cinema: event.target.Cinema.value,
        ShowDate: event.target.ShowDate.value,
        ShowTiming: event.target.ShowTiming.value,
        PosterFileName: photofilename,
        Rating: event.target.Rating.value,
        Summary: event.target.Summary.value,
        Price: event.target.Price.value,
      }),
    })
      .then(res => res.json())
      .then(
        result => {
          alert(result);
        },
        error => {
          alert('Failed');
        }
      );
  };
  const handleFileSelected = event => {
    event.preventDefault();
    setPhotofilename(event.target.files[0].name);
    const formData = new FormData();
    formData.append(
      'myFile',
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + 'Movies/SaveFile', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(
        result => {},
        error => {
          alert('Failed');
        }
      );
  };

  return (
    <div className='container'>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit Movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='MovieId'>
                  <Form.Label>Movie Id</Form.Label>
                  <Form.Control
                    type='text'
                    name='MovieId'
                    required
                    disabled
                    defaultValue={movid}
                    placeholder='Movie Name'
                  />
                </Form.Group>
                <Form.Group controlId='MovieName'>
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='MovieName'
                    required
                    placeholder='Movie Name'
                    defaultValue={movname}
                  />
                </Form.Group>
                <Form.Group controlId='Category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as='select' defaultValue={category}>
                    {cats.map(cat => (
                      <option key={cat.CategoryId}>{cat.CategoryName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='Cinema'>
                  <Form.Label>Cinema</Form.Label>
                  <Form.Control defaultValue={cinema} as='select'>
                    {cinemas.map(cin => (
                      <option key={cin.CinemaId}>
                        {cin.CinemaName},{cin.CinemaAddress}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='ShowDate'>
                  <Form.Label>ShowDate</Form.Label>
                  <Form.Control
                    type='date'
                    name='ShowDate'
                    required
                    defaultValue={showdate}
                    placeholder='Day of the show'
                  />
                </Form.Group>
                <Form.Group controlId='ShowTiming'>
                  <Form.Label>Show Timing</Form.Label>
                  <Form.Control
                    type='time'
                    name='ShowTiming'
                    defaultValue={showtiming}
                    required
                    placeholder='Show Timing'
                  />
                </Form.Group>
                <Form.Group controlId='Rating'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type='number'
                    name='Rating'
                    min='1'
                    max='10'
                    required
                    defaultValue={rating}
                    placeholder='Rating'
                  />
                </Form.Group>
                <Form.Group controlId='Summary'>
                  <Form.Label>Summary</Form.Label>
                  <Form.Control
                    type='text'
                    name='Summary'
                    required
                    placeholder='Summary'
                    defaultValue={summary}
                  />
                </Form.Group>

                <Form.Group controlId='Price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    name='Price'
                    required
                    placeholder='Price'
                    min='50'
                    step='20'
                    defaultValue={price}
                  />
                </Form.Group>

                <Form.Group>
                  <Button variant='primary' type='submit'>
                    Update Movie
                  </Button>
                </Form.Group>
              </Form>
            </Col>

            <Col sm={6}>
              <Image
                width='200px'
                height='200px'
                src={process.env.REACT_APP_PHOTOPATH + photofilename}
                defaultValue={photofilename}
              />
              <input onChange={handleFileSelected} type='File' />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='danger' onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
