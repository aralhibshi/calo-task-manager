// Dependencies
import React, { useState, useContext, ChangeEvent, Fragment }  from 'react';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';

// Interfaces
import { ITaskProps } from '../../interfaces/ITaskProps';
import { INewTask, ITask } from '../../interfaces/ITask'
import { ITeam } from '../../interfaces/ITeam';

// Context
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTeams from '../../customHooks/useUserTeams';

const TaskEdit: React.FC<ITaskProps> = (props) => {

  // States
  const [show, setShow] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<INewTask>({
    title: props.task.title,
    description: props.task.description,
    status: props.task.status,
    team: props.task.team._id,
  });

  // Context
  const { userID } = useContext(UserIDContext);

   // Custom Hooks
   const teams: any = useUserTeams(userID);

   // Handle Show Modal
   const handleShow = (): void => {
    setShow(true);
  };

  // Handle Close Modal
  const handleClose = (): void => {
    setShow(false);
  };

  // Change Handler to Save Task Object to newTask State
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const task: INewTask = {
      ...updatedTask,
      [name]: value,
    };
    setUpdatedTask(task);
    console.log(task);
  };

  // Change Handler for Team Select Element
  const teamChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    const task = { ...updatedTask };
    task.team = selectedValue;
    setUpdatedTask(task);
    console.log(task)
  };

  // Change Handler for Team Select Element
  const statusChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    const task = { ...updatedTask };
    task.status = selectedValue;
    setUpdatedTask(task);
    console.log(task)
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

  // Axios Post - Task Edit
  const updateTask = (task: INewTask) => {
      Axios.post(`/task/edit?id=${props.task._id}`, {task})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    updateTask(updatedTask);
    handleClose();
  }

  return (
    <>
      {/* <Button variant="dark" onClick={handleShow}>
        Edit
      </Button> */}

      <i className="fa fa-pencil" aria-hidden="true" style={{fontSize: '25px', cursor: 'pointer'}} onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className='text-muted'>Title</label>
                <input
                  type="text"
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={changeHandler}
                  placeholder="Title"
                  name="title"
                  defaultValue={props.task.title}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label className='text-muted'>Description</label>
                <input
                  type="text"
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={changeHandler}
                  placeholder="Description"
                  name="description"
                  defaultValue={props.task.description}
                  required
                />
              </div>

              <div className='form-outline mb-4'>
                <label className='text-muted'>Status</label>
                <select
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={statusChangeHandler}
                  name="status"
                  defaultValue={props.task.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>

              <div className='form-outline mb-4'>
                <label className='text-muted'>Team</label>
                <select
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={teamChangeHandler}
                  name="team"
                  defaultValue={props.task.team.name}
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
        </Modal.Body>
      </Modal>
    </>
  )
};

export default TaskEdit;