// Dependencies
import React, { useState, useEffect } from 'react';
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
import TaskCreate from './components/task/TaskCreate';

// Interfaces
import { IUserToken } from './interfaces/IUser';
import { INewTask } from './interfaces/ITask';


// CSS
import '../src/App.css';

const App: React.FC = () => {

  // States
  const [user, setUser] = useState<IUserToken | {}>();
  const [isAuth, setIsAuth] = useState<Boolean>(false);
  
  useEffect(() => {
    let token = localStorage.getItem('token');

    if (token !=null) {
      let user = jwtDecode(token)

      if (user) {
        setIsAuth(true);
        setUser(user);
        console.log(user);
      }
      else if (!user) {
        localStorage.removeItem('token');
        setIsAuth(false);
      }
    }
  }, [])

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

  // Axios Post - Login User, Save 'token' to Local Storage, Set States
  const loginHandler = (cred: object): void => {
    Axios.post('/auth/signin', cred)
    .then(res => {
      let token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
        let userToken: IUserToken = jwtDecode(token);

        console.log(userToken.user.id);

        setIsAuth(true);
        setUser(userToken);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  // Axios Post - Create Task
  const createTask = (task: INewTask): void => {
    Axios.post('/task/add', {task, user})
    .then(res => {

      if (typeof user !== 'undefined') {
        console.log(user)
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

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

                <NavDropdown.Item as={Link} to='/task/add'>
                  Add Task
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to='/team/add'>
                  Add Team
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item as={Link} to='/account'>
                  Account
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
        path='/task/add'
        element={<TaskCreate create={createTask}/>}
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