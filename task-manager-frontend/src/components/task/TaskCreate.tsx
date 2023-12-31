// Dependencies
import React, {useState, useEffect, useContext, ChangeEvent, Fragment} from 'react';
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom';
import Axios from 'axios';

// Interfaces
import { INewTask } from '../../interfaces/ITask'
import { IUserToken } from '../../interfaces/IUser';
import { ITaskCreateProps } from '../../interfaces/ITaskCreateProps';

// Context
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTeams from '../../customHooks/useUserTeams';
import { ITeam } from '../../interfaces/ITeam';

const TaskCreate: React.FC<ITaskCreateProps> = (props) => {

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hooks
  const teams: any = useUserTeams(userID, false);

  // States
  const [newTask, setNewTask] = useState<INewTask>({
    title: '',
    description: '',
    team: teams && teams.length > 0 ? teams[0].name : ''
  });

  // Set Default Team in newTask State
  useEffect(() => {
    if (teams && teams.length > 0) {
      setNewTask((prevNewTask) => ({
        ...prevNewTask,
        team: teams[0]._id
      }));
    }
  }, [teams]);

  // Change Handler to Save Task Object to newTask State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const task: INewTask = {
      ...newTask,
      [name]: value,
    };
    setNewTask(task);
  };

  // Change Handler for Team Select Element
  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    const task = { ...newTask };
    task.team = selectedValue;
    setNewTask(task);
  };

  // Axios Post - Create Task
  const createTask = (user: IUserToken, task: INewTask,): void => {
    if (typeof user !== 'undefined') {
      Axios.post(`/task/add?id=${user.user.id}`, {task})
      .then(res => {
        console.log(user.user.id)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    props.setRefetch(true);
    e.preventDefault();
    if (typeof userID !== 'undefined') {
      createTask(userID, newTask);
      navigate('/task/index');
    }
  };

  // Map Through and Display Each Task
  const showAllTeams = (): JSX.Element[] | undefined => {
    if (typeof teams !== 'undefined') {
      return teams.map((teamEl: ITeam, index: number) => {
        return (
          <Fragment key={index}>
            <option value={teamEl._id}>{teamEl.name}</option>
          </Fragment>
        )
      })
    }
  }

  return (
    <div>
      <section className="vbg-image custom-font div-bg">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: '15px'}}>
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
                          onChange={selectChangeHandler}
                          name="team"
                        >
                          {showAllTeams()}
                        </select>
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

export default TaskCreate;