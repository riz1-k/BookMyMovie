import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDepModal from '../Models/AddCatModal';
import EditCatModal from '../Models/EditCatModal';
require('dotenv').config();

export default function Category() {
    const [cats, setCats] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editModalData, setEditModalData] = useState({
        catid: '',
        catname: '',
        category: '',
        rating: 0,
        releasedate: null,
        summary: '',
    });
    const { catid, catname } = editModalData;
    const refreshList = () => {
        fetch(process.env.REACT_APP_API + 'categories')
            .then(response => response.json())
            .then(data => {
                setCats(data);
            });
    };

    useEffect(() => {
        refreshList();
    }, [cats]);

    const deleteCat = catid => {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'categories/' + catid, {
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
                            <th>Category Id</th>
                            <th>Category Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.map(cat => (
                            <tr key={cat.CategoryId}>
                                <td>{cat.CategoryId}</td>
                                <td>{cat.CategoryName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className='mr-2'
                                            variant='info'
                                            onClick={() => {
                                                setEditModalShow(true);
                                                setEditModalData({
                                                    catid: cat.CategoryId,
                                                    catname: cat.CategoryName,
                                                });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className='mr-2'
                                            variant='danger'
                                            onClick={() => deleteCat(cat.CategoryId)}
                                        >
                                            Delete
                                        </Button>
                                        <EditCatModal
                                            show={editModalShow}
                                            onHide={editModalClose}
                                            catid={catid}
                                            catname={catname}
                                        />
                                    </ButtonToolbar>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={() => setAddModalShow(true)}>
                        Add Department
                    </Button>
                    <AddDepModal show={addModalShow} onHide={addModalClose}></AddDepModal>
                </ButtonToolbar>
            </div>
        </>
    );
}
