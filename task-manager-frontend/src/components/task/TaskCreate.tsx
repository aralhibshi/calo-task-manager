// Dependencies
import React, {useState, useEffect, useContext, ChangeEvent, Fragment} from 'react';
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom';
import Axios from 'axios';

// Interfaces
import { INewTask } from '../../interfaces/ITask'
import { IUserToken } from '../../interfaces/IUser';
import { ITeam } from '../../interfaces/ITeam';

// Context
import UserIDContext from '../../contexts/UserIDContext';

const TaskCreate: React.FC = () => {

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // Context
  const { userID } = useContext(UserIDContext);

  // State
  const [teams, setTeams] = useState<Array<ITeam>>();
  const [teamOption, setTeamOption] = useState<string>();
  const [newTask, setNewTask] = useState<INewTask>({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (typeof userID !== 'undefined') {
      userTeams();
    }
  }, [userID])

  // Change Handler to Save Task Object to newTask State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const task: INewTask = {
      ...newTask,
      [name]: value,
    };
    setNewTask(task);
    console.log(task);
  };

  // Change Handler for Team Select Element
  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTeamOption(e.target.value);
  };

  // Axios Get - User's Teams
  const userTeams = (): void => {
    if (typeof userID !== 'undefined') {
      Axios.get(`/team/user/index?id=${userID?.user.id}`)
      .then(res => {
        console.log(res.data);
  
        let allTeams = res.data;
        setTeams(allTeams)
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  // Axios Post - Create Task
  const createTask = (user: IUserToken, task: INewTask,): void => {
    Axios.post('/task/add', {user, task})
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
      createTask(userID, newTask);
      navigate('/task/index');
    }
  };

  // Map Through and Display Each Task
  const showAllTeams = (): JSX.Element[] | undefined => {
    if (typeof teams !== 'undefined') {
      return teams.map((teamEl, index) => {
        return (
          <Fragment key={index}>
            <option value={teamEl.name}>{teamEl.name}</option>
          </Fragment>
        )
      })
    }
  }

  return (
    <div>
      <section className="vh-100 bg-image custom-font" style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Add a Task</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={changeHandler}
                          placeholder="Title"
                          name="title"
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

                      <div className='form-outline mb-4'>
                        <select
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          value={teamOption}
                          onChange={selectChangeHandler}
                          name="teams"
                          multiple
                        >
                          {showAllTeams()}
                        </select>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
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

export default TaskCreate;