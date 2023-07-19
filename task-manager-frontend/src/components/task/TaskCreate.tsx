// Dependencies
import React, {useState, ChangeEvent} from 'react';
import {BrowserRouter as Router, useNavigate, NavigateFunction} from 'react-router-dom';

// Interfaces
import { INewTask } from '../../interfaces/ITask'
import { ITaskCreateProps } from '../../interfaces/ITaskCreateProps';

const TaskCreate: React.FC<ITaskCreateProps> = (props) => {

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  const [newTask, setNewTask] = useState<INewTask>({
    title: '',
    description: ''
  });

  // Change Handler to Save Task Object to newTask State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const task: INewTask = {
      ...newTask,
      [name]: value,
    };
    setNewTask(task);
    console.log(task)
  };

  // Axios Post - Task Create
  const createTask = (): void => {
    props.create(newTask);
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    createTask();
    navigate('/task/index');
  };

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