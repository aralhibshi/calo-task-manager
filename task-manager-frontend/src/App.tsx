// Dependencies
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, NavigateFunction } from 'react-router-dom';
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
import TaskCreate from './components/task/TaskCreate';
import TaskIndex from './components/task/TaskIndex'
import TeamCreate from './components/team/TeamCreate';
import Profile from './components/user/Profile';

// Interfaces
import { IUserToken } from './interfaces/IUser';

// Context
import UserIDContext from './contexts/UserIDContext';

// CSS
import '../src/App.css';
// import '../src/styles/custom-bootstrap';

const App: React.FC = () => {

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // States
  const [userID, setUserID] = useState<IUserToken | undefined>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  
  //  Decode 'token' and set states
  useEffect(() => {
    let token = localStorage.getItem('token');

    if (token !=null) {
      let user: IUserToken = jwtDecode(token)

      if (user) {
        setIsAuth(true);
        setUserID(user);
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
        setUserID(userToken);
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  // Logout Handler
  const logoutHandler = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setIsAuth(false);
    setUserID(undefined);
    navigate('/');
  }

  return (
    <UserIDContext.Provider value={{userID, setUserID}}>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary bg-gray">
          <Container>
            <Navbar.Brand as={Link} to='/'>Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!isAuth ? (
                  <>
                  <Nav.Link as={Link} to='/signup'>Register</Nav.Link>
                  <Nav.Link as={Link} to='/signin'>Log In</Nav.Link>
                  </>
                ) : (
                  <>
                    <NavDropdown
                    title="Menu"
                    id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to='/task/index'>
                        Tasks
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/team/index'>
                        Teams
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/task/add'>
                        Add Task
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/team/add'>
                        Add Team
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to='/profile'>
                        {userID?.user.name}'s Account
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
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
            element={<TaskCreate/>}
          />
          <Route
            path='/task/index'
            element={<TaskIndex/>}
          />
          <Route
            path='/team/add'
            element={<TeamCreate/>}
          />
          <Route
          path='/profile'
          element={<Profile/>}
          />
        </Routes>
      </div>
    </UserIDContext.Provider>
  );
};

export default App;