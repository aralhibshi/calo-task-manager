// Dependencies
import React, { useContext } from 'react'
import { MDBBadge } from 'mdb-react-ui-kit';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Components
import TaskEdit from './TaskEdit';

// Interfaces
import { ITaskProps } from '../../interfaces/ITaskProps';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';

const Task: React.FC<ITaskProps> = (props) => {

  // Context
  const { userID } = useContext(UserIDContext);

  // Axios Post - Delete Task
  const deleteTask = (): void => {
    toast('Task Deleted!')
    Axios.post(`/task/delete?id=${userID.user.id}`, {id: props.task._id})
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
      <tr style={{borderBottom: '#43494c'}}>
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
              <p className='mb-0' style={{color: 'gray'}}>
                <i className="fa fa-user" aria-hidden="true" style={{color: 'gray'}}></i>
                &nbsp; {props.task.users.length}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{props.task.description}</p>
          <p className='text-muted mb-0'><em>tags go here</em></p>
        </td>
        <td>
          <MDBBadge
            color={
              props.task.status === 'Complete'
              ? 'success'
              : props.task.status === 'Pending'
              ? 'warning'
              : props.task.status === 'Incomplete'
              ? 'danger'
              : 'warning'
            }
            pill
          >
            {props.task.status}
          </MDBBadge>
        </td>
        <td style={{color: 'white'}}>{teamName}</td>
        <td>
          <TaskEdit task={props.task}/>
        </td>
        <td className='align-middle'>
          <i className="fa fa-trash" style={{fontSize: '25px', cursor: 'pointer'}} aria-hidden="true" onClick={deleteTask}></i>
        </td>
      </tr>
      <ToastContainer/>
    </>
  )
}

export default Task;