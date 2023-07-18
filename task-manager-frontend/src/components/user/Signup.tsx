// Dependencies
import React, { useState, ChangeEvent } from 'react';

// Interfaces
import { IUser } from '../../interfaces/IUser';
import { ISignupProps } from '../../interfaces/ISignupProps';

const Signup: React.FC<ISignupProps> = (props) => {
  
  // States
  const [newUser, setNewUser] = useState<IUser | any>()

  // Change Handler to Save User Object to newUser State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const user = {...newUser};
    user[e.target.name] = e.target.value;
    console.log(user);
    setNewUser(user);
  }

  // Axios Post - Create User
  const registerHandler = () => {
    console.log(newUser);
    props.register(newUser);
  };

  return (
    <section className="vh-100 bg-image custom-font" style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form>

                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={changeHandler} placeholder='First Name' name='firstName' required/>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="text" id="form3Example1cg" className="form-control form-control-lg" onChange={changeHandler} placeholder='Last Name' name='lastName' required/>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="email" id="form3Example3cg" className="form-control form-control-lg" onChange={changeHandler} placeholder='Email' name='emailAddress' required/>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" id="form3Example4cg" className="form-control form-control-lg" onChange={changeHandler} placeholder='Password' name='password' required/>
                    </div>

                    {/* <div className="form-outline mb-4">
                      <input type="password" id="form3Example4cdg" className="form-control form-control-lg" placeholder='Repeat Password' name='password'/>
                    </div> */}

                    {/* <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                      <label className="form-check-label" htmlFor="form2Example3g">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div> */}

                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={registerHandler}>Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a></p>

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
