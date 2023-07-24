import React, { useState, useContext, ChangeEvent, Fragment } from 'react'
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { IUser, IUserAll } from '../../interfaces/IUser';
import { ITeamCreateProps } from '../../interfaces/ITeamCreateProps';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserAll from '../../customHooks/useUserAll';

const TeamAddUser: React.FC<ITeamCreateProps> = (props) => {

  // States
  const [show, setShow] = useState(false);
  const [updatedTeam, setUpdatedTeam] = useState({
    id: ''
  });

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hooks
  const users: Array<IUserAll> | undefined = useUserAll(userID);

  // Handle Show Modal
  const handleShow = (): void => {
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
    team.id = selectedValue;
    setUpdatedTeam(team);
    console.log(team);
  };

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    // if (props.setRefetch) {
    //   props.setRefetch(true);
    // }
    e.preventDefault();
    // updateTeam(updatedTeam);
    handleClose();
  }

  // Map Through and Display Each Team
  const showAllUsers = (): JSX.Element[] | undefined => {
    console.log(users)
    if (typeof users !== 'undefined' && users.length > 0) {
      return users.map((userEl, index) => {
        return (
          <Fragment key={index}>
            <option value={userEl.id}>{userEl.name}</option>
          </Fragment>
        )
      })
    }
  }

  return (
    <>
      <i className="fa fa-user-plus" aria-hidden="true" style={{fontSize: '25px', cursor: 'pointer'}} onClick={handleShow}></i>

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
                  {showAllUsers()}
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