import './App.css';
import { Register } from './components/Register';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Login } from './components/Login';
import { ConfirmEmail } from './components/ConfirmEmail';
import { Home } from './components/Home';
import { ChangePassword } from './components/ChangePassword';

import React, { useState } from 'react';
import { UpdateProfile } from './components/UpdateProfile';
import { DietChart } from './components/DietChart';
import { getCookie } from './helpers/auth';

function App() {
  const [user, setUser] = useState({});
  const [authUser, setAuthUser] = useState(false)
  const authToken = getCookie('token-diet');


  return (
    <div> 
      <BrowserRouter>
        <Switch>
        <Route exact path='/'>{(authUser || authToken) ? <Home setAuthUser={setAuthUser} user={user} setUser={setUser}/> : <Redirect to="/login" />}</Route>
          <Route exact path='/home'><Redirect to="/" /></Route>
          <Route exact path='/register'><Register /></Route>
          <Route exact path='/login'><Login setAuthUser={setAuthUser}/></Route>
          <Route exact path='/forgotPassword'><ConfirmEmail /></Route>
          <Route exact path='/changePassword'><ChangePassword /></Route>
          <Route exact path='/updateProfile'><UpdateProfile user={user} /></Route>
          <Route exact path ='/dietChart'><DietChart user = {user}/></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
