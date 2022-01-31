import './App.css';
import { Register } from './components/Register';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { Login } from './components/Login';
import { ConfirmEmail } from './components/ConfirmEmail';
import { Home } from './components/Home';
import { ChangePassword } from './components/ChangePassword';

import React, { useState } from 'react';
import { UpdateProfile } from './components/UpdateProfile';
import { DietChart } from './components/DietChart';

function App() {
  const [user, setUser] = useState({});

  return (
    <div> 
      <BrowserRouter>
        <Switch>
        <Route exact path='/'><Home user={user} setUser = {setUser} /></Route>
          <Route exact path='/home'><Home user={user} setUser = {setUser}/></Route>
          <Route exact path='/register'><Register /></Route>
          <Route exact path='/login'><Login /></Route>
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
