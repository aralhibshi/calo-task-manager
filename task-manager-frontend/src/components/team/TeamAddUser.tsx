import React, { useState, useContext, ChangeEvent, Fragment } from 'react'
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';

// Interfaces
import { IUserAll } from '../../interfaces/IUser';
import { ITeamProps } from '../../interfaces/ITeamProps';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserAll from '../../customHooks/useUserAll';

const TeamAddUser: React.FC<ITeamProps> = (props) => {

  // States
  const [show, setShow] = useState(false);
  const [updatedTeam, setUpdatedTeam] = useState({
    userID: '',
    teamID: props.team._id
  });

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hooks
  const users: Array<IUserAll> | undefined = useUserAll(userID, updatedTeam.teamID);

  // Select Team
  const handleSelectTeam = (e: any) => {
    const id = e.target.id;
    const team = { ...updatedTeam };
    team.teamID = id;
    setUpdatedTeam(team);
    console.log(team);
  }

  // Handle Show Modal and Select Team
  const handleShow = (e: any): void => {
    handleSelectTeam(e);
    setShow(true);
  };

  // Handle Close Modal
  const handleClose = (): void => {
    setShow(false);
  };

  // Change Handler for Team Select Element
  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = e.target.value;
    const team = { ...updatedTeam };
    team.userID = selectedValue;
    setUpdatedTeam(team);
    console.log(team);
  };

  // Axios Post - Add User to Team
  const addUserToTeam = (team: any) => {
    Axios.post(`/team/user/add?teamId=${team}&userId=${userID.user.id}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    toast('User Added to Team!');
    if (props.setRefetch) {
      props.setRefetch(true);
    }
    e.preventDefault();
    addUserToTeam(updatedTeam.teamID);
    handleClose();
  }

  // Map Through and Display Each Team
  const showAllUsers = (): JSX.Element[] | undefined => {
    console.log(users)
    if (typeof users !== 'undefined' && users.length > 0) {
      return users.map((userEl, index) => {
        return (
          <Fragment key={index}>
            <option value={userEl._id}>{userEl.name}</option>
          </Fragment>
        )
      })
    }
  }

  return (
    <>
      <i id={props.team._id} className="fa fa-user-plus" aria-hidden="true" style={{fontSize: '25px', cursor: 'pointer'}} onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'black'}}>Add Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
            <div className='form-outline mb-4'>
                <label className='text-muted'>Users</label>
                <select
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={selectChangeHandler}
                  name="team"
                >
                  {show ? (
                  <>
                  {showAllUsers()}
                  </>
                  ) : (
                  <></>
                  )}
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
      <ToastContainer/>
    </>
  )
};

export default TeamAddUser;