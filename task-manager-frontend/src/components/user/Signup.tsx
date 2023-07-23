// Dependencies
import React, { useState, ChangeEvent } from 'react';
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom'

// Interfaces
import { INewUser } from '../../interfaces/IUser';
import { ISignupProps } from '../../interfaces/ISignupProps';

// Used ChatGPT to indent properly to an 'Editor: Tab Size' of '2' Spaces
const Signup: React.FC<ISignupProps> = (props) => {
  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // States
  const [newUser, setNewUser] = useState<INewUser>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: ''
  });

  // Change Handler to Save User Object to useLogin State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const user: INewUser = {
      ...newUser,
      [name]: value,
    };
    setNewUser(user);
  };

  // Axios Post - Create User
  const registerHandler = (): void => {
    props.register(newUser);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    registerHandler();
    navigate('/signin');
  };

  return (
    <section className="vh-100 bg-image custom-font">
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
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        onChange={changeHandler}
                        placeholder="First Name"
                        name="firstName"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        onChange={changeHandler}
                        placeholder="Last Name"
                        name="lastName"
                        required
                      />
                    </div>

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
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account? <a href="/signin" className="fw-bold text-body"><u className='text-black'>Login here</u></a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
