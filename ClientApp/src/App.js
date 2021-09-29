import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Category from './Components/Category';
import Movie from './Components/Movie';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <div className='container'>
                    <h3 className='m-2 d-flex justify-content-center'>BookMyMovie</h3>
                    <Navigation />
                    <Switch>
                        <Route path='/admin' component={Home} exact />
                        <Route path='/admin/categories' component={Category} />
                        <Route path='/admin/movies' component={Movie} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
