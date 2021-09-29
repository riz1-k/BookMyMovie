import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default function AddCatModal(props) {
    const handleSubmit = event => {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'categories', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CategoryName: event.target.CategoryName.value,
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
                        Add a Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId='CategoryName'>
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='CategoryName'
                                        required
                                        placeholder='CategoryName'
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Add Category
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='danger' onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
