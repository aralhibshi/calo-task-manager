// Dependencies
import React, {useState, useContext, ChangeEvent, Fragment} from 'react';
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom';
import Axios from 'axios';

// Interfaces
import { INewTeam } from '../../interfaces/ITeam';
import { IUserToken } from '../../interfaces/IUser';
import { ITeam } from '../../interfaces/ITeam';

// Context
import UserIDContext from '../../contexts/UserIDContext';

const TeamCreate: React.FC = () => {

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // Context
  const { userID } = useContext(UserIDContext);

  // State
  const [newTeam, setNewTeam] = useState<INewTeam>({
    name: '',
    description: ''
  });

  // Change Handler to Save Task Object to newTask State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const team: INewTeam = {
      ...newTeam,
      [name]: value,
    };
    setNewTeam(team);
    console.log(team);
  };

  // Axios Post - Create Task
  const createTeam = (user: IUserToken, team: INewTeam,): void => {
    console.log(user, team);
    Axios.post('/team/add', {user, team})
    .then(res => {
      if (typeof userID !== 'undefined') {
        console.log(userID)
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (typeof userID !== 'undefined') {
      createTeam(userID, newTeam);
      navigate('/team/index');
    }
  };

  return (
    <div>
      <section className="vh-100 bg-image custom-font">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Add a Team</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                          placeholder="Name"
                          name="name"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                          placeholder="Description"
                          name="description"
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-warning btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamCreate;