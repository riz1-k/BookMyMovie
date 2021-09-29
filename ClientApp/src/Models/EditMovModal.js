import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export default function EditMovModal(props) {
    const [cats, setCats] = useState([]);
    const [photofilename, setPhotofilename] = useState('anonymous.png');
    const { movid, movname, category, rating, releasedate, summary, onHide } =
        props;

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'categories')
            .then(response => response.json())
            .then(data => {
                setCats(data);
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
                PosterFileName: photofilename,
                Rating: event.target.Rating.value,
                ReleaseDate: event.target.ReleaseDate.value,
                Summary: event.target.Summary.value,
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
                result => { },
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
                <Modal.Header clooseButton>
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
                                <Form.Group controlId='Rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control
                                        type='number'
                                        name='Rating'
                                        required
                                        placeholder='Rating'
                                        defaultValue={rating}
                                    />
                                </Form.Group>
                                <Form.Group controlId='ReleaseDate'>
                                    <Form.Label>Release Date</Form.Label>
                                    <Form.Control
                                        type='date'
                                        name='DateOfJoining'
                                        required
                                        placeholder='DateOfJoining'
                                        defaultValue={releasedate}
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
