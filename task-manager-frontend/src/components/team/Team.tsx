// Dependencies
import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

// Interfaces
import { ITeamProps } from '../../interfaces/ITeamProps';

const Team:React.FC<ITeamProps> = (props) => {
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
              <p className='fw-bold mb-1'>{props.team.name}</p>
              <p className='text-muted mb-0'>
                <i className="fa fa-user" aria-hidden="true"></i>
                &nbsp; {props.team.users.length}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{props.team.description}</p>
          <p className='text-muted mb-0'><em>tags go here</em></p>
        </td>
        {/* <td>
          <TaskEditModal task={props.task}/>  
        </td> */}
        {/* <td className='align-middle'>
          <i className="fa fa-trash" style={{fontSize: '25px', cursor: 'pointer'}} aria-hidden="true" onClick={deleteTask}></i>
        </td> */}
      </tr>
    </>
  )
};

export default Team;