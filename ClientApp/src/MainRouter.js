import React, { useState } from 'react';
import Navigation from './Components/Admin/AdminNavigation';
import AdminCategory from './Components/Admin/AdminCategory';
import AdminMovie from './Components/Admin/AdminMovie';
import AdminUsers from './Components/Admin/AdminUsers';
import UserNavigation from './Components/User/UserNavigation';
import AboutMovie from './Components/User/AboutMovie';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './Components/User/Home';
import Login from './Components/User/Login';
import SignUp from './Components/User/SignUp';

const MainRouter = () => {
  const history = useHistory();
  const [nav, setNav] = useState(
    history.location.pathname.substr(0, 6) === '/admin'
  );

  history.listen(location => {
    if (location.pathname.substr(0, 6) === '/admin') {
      setNav(true);
    } else {
      setNav(false);
    }
  });
  return (
    <div>
      {nav ? <Navigation /> : <UserNavigation />}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/login' exact component={Login} />
        <Route path='/movie/:id' exact component={AboutMovie} />
        <Route path='/admin/' exact component={AdminUsers} />
        <Route path='/admin/movies' component={AdminMovie} />
        <Route path='/admin/categories' component={AdminCategory} />
      </Switch>
    </div>
  );
};

export default MainRouter;
