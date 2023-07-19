// Dependencies
import React from 'react'
import { MDBBadge, MDBBtn } from 'mdb-react-ui-kit';

// Interfaces
import { ITaskProps } from '../../interfaces/ITaskProps';

const Task: React.FC<ITaskProps> = (props) => {

  const editTask = () => {
        
  }

  // Display Team Name
  // const teamName = typeof props.task.team === 'string' ? props.task.team : props.task.team.name;

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
            // color='warning'
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
        {/* <td>{teamName}</td> */}
        <td>
          <MDBBtn color='link' rounded size='sm'>
            Edit
          </MDBBtn>
        </td>
      </tr>
    </>
  )
}

export default Task;