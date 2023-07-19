// Dependencies
import React, { useState, ChangeEvent } from 'react'
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom'

// Interfaces
import { IUserLogin } from '../../interfaces/IUser'
import { ISigninProps } from '../../interfaces/ISigninProps'

// Used ChatGPT to indent properly to an 'Editor: Tab Size' of '2' Spaces
const Signin: React.FC<ISigninProps> = (props) => {
  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // States
  const [userLogin, setUserLogin] = useState<IUserLogin>({
    emailAddress: '',
    password: ''
  });

  // Change Handler to Save User Object to useLogin State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const user: IUserLogin = {
      ...userLogin,
      [name]: value,
    };
    setUserLogin(user);
  };

  // Login Handler
  const loginHandler = (): void => {
    props.login(userLogin);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    loginHandler();
    navigate('/');
  };

  return (
    <div>
      <section
        className="vh-100 bg-image custom-font"
        style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                          placeholder="Email"
                          name="emailAddress"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                          placeholder="Password"
                          name="password"
                          required
                        />
                      </div>
                      
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login In
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Forgot Password?
                        <a href="#!" className="fw-bold text-body">
                          <u>Click Here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;