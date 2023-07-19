// Dependencies
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Components
import Home from './components/Home';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import TaskIndex from './components/task/TaskIndex'

// Interfaces
import { IUser } from './interfaces/IUser';

// CSS
import '../src/App.css';

const App: React.FC = () => {

  // States
  const [user, setUser] = useState<IUser | any>({});
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  // Axios Post - Create User
  const registerHandler = (user: object): void => {
    Axios.post('/auth/signup', user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  };

  // Axios Poist - Login User, Save 'token' to Local Storage, Set States
  const loginHandler = (cred: object): void => {
    Axios.post('/auth/signin', cred)
    .then(res => {
      console.log(res);
      let token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        let user = jwtDecode(token);

        setIsAuth(true);
        setUser(user);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to='/'>Task Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to='/task/index'>
                  Tasks
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />

        <Route
          path='/signup'
          element={<Signup register={registerHandler}/>}
        />

        <Route
          path='/signin'
          element={<Signin login={loginHandler}/>}
        />

        <Route
          path='/task/index'
          element={<TaskIndex/>}
        />
      </Routes>
    </div>
  );
};

export default App;