// Dependencies
import React from 'react'
import { MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import {BrowserRouter as Router, Link, useNavigate, NavigateFunction} from 'react-router-dom';
import Axios from 'axios';

// Bootstrap
import { Button } from 'react-bootstrap';

// Interfaces
import { ITaskProps } from '../../interfaces/ITaskProps';

const Task: React.FC<ITaskProps> = (props) => {

  // Navigate// Navigate
  const navigate: NavigateFunction = useNavigate();

  // Edit Task Navigate
  const editTaskClick = (): void => {
    navigate(`/task/edit?id=${props.task._id}`)
  };

  // Axios Post - Delete Task
  const deleteTask = (): void => {
    Axios.post('/task/delete', {id: props.task._id})
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
    window.location.reload()
  };

  // Display Team Name
  const teamName = props.task.team.name;

  return (
    <>
      <tr>
        <td>
          <div className='d-flex align-items-center'>
            <img
              src='https://mdbootstrap.com/img/new/avatars/8.jpg'
              alt=''
              style={{ width: '45px', height: '45px' }}
              className='rounded-circle'
            />
            <div className='ms-3'>
              <p className='fw-bold mb-1'>{props.task.title}</p>
              {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{props.task.description}</p>
          {/* <p className='text-muted mb-0'>IT department</p> */}
        </td>
        <td>
          <MDBBadge
            color={
              props.task.status === 'complete'
              ? 'success'
              : props.task.status === 'pending'
              ? 'warning'
              : props.task.status === 'incomplete'
              ? 'danger'
              : 'warning'
            }
            pill
          >
            {props.task.status}
          </MDBBadge>
        </td>
        <td>{teamName}</td>
        <td>
          <Button onClick={editTaskClick} variant='dark'>
            Edit
          </Button>
        </td>
        <td>
          <Button type='submit' onClick={deleteTask} variant='danger'>
            Delete
          </Button>
        </td>
      </tr>
    </>
  )
}

export default Task;