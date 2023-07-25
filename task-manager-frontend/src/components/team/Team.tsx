// Dependencies
import React, { useContext } from 'react';
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

// Component
import TeamEdit from './TeamEdit';

// Interfaces
import { ITeamProps } from '../../interfaces/ITeamProps';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';
import TeamAddUser from './TeamAddUser';

const Team:React.FC<ITeamProps> = (props) => {

  // Context
  const { userID } = useContext(UserIDContext);

  // Axios Post - Delete Team
  const deleteTeam = (): void => {
    Axios.post(`/team/delete?teamId=${props.team._id}&userId=${userID.user.id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  };

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    toast('Team Deleted!');
    if (props.setRefetch) {
      props.setRefetch(true);
    }
    e.preventDefault();
    deleteTeam();
  }

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
              <p className='fw-bold mb-1'>{props.team.name}</p>
              <p className='mb-0' style={{color: 'gray'}}>
                <i className="fa fa-user" aria-hidden="true" style={{color: 'gray'}}></i>
                &nbsp; {props.team.users.length}
              </p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>{props.team.description}</p>
          <p className='text-muted mb-0'><em>tags go here</em></p>
        </td>
        <td>
          {props.setRefetch ? (<TeamAddUser team={props.team} setRefetch={props.setRefetch}/>) : (<></>)}
        </td>
        <td>
          <TeamEdit team={props.team} setRefetch={props.setRefetch}/>
        </td>
        <td className='align-middle'>
          <i className="fa fa-trash" style={{fontSize: '25px', cursor: 'pointer'}} aria-hidden="true" onClick={handleSubmit}></i>
        </td>
      </tr>
    </>
  )
};

export default Team;