﻿import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function Navigation() {
    return (
        <>
            <Navbar bg='dark' expand='lg'>
                <Navbar.Toggle aria-controls='basic navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav />
                    <NavLink
                        className='d-inline p-2 bg-dark text-white'
                        to='/admin/movies'
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        className='d-inline p-2 bg-dark text-white'
                        to='/admin/categories'
                    >
                        Categories
                    </NavLink>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Navigation;
