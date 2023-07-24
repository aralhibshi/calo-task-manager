// Dependencies
import React, {useState, useContext, ChangeEvent} from 'react';
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Interfaces
import { ITeamProps } from '../../interfaces/ITeamProps';
import { INewTeam } from '../../interfaces/ITeam';

const TeamEdit: React.FC<ITeamProps> = (props) => {

  // States
  const [show, setShow] = useState(false);
  const [updatedTeam, setUpdatedTeam] = useState<INewTeam>({
    name: props.team.name,
    description: props.team.description
  });

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
    const team: INewTeam = {
      ...updatedTeam,
      [name]: value,
    };
    setUpdatedTeam(team);
  };

   // Axios Post - Task Edit
   const updateTeam = (team: INewTeam) => {
    toast('Team Edited!');
    console.log(props.team._id, team)
    Axios.post(`/team/edit?id=${props.team._id}`, {team})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // Submit
  const handleSubmit = (e: React.FormEvent): void => {
    if (props.setRefetch) {
      props.setRefetch(true);
    }
    e.preventDefault();
    updateTeam(updatedTeam);
    handleClose();
  }

  return (
    <>
      <i className="fa fa-pencil" aria-hidden="true" style={{fontSize: '25px', cursor: 'pointer'}} onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color: 'black'}}>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className='text-muted'>Name</label>
                <input
                  type="text"
                  id="form3Example1cg"
                  className="form-control form-control-lg"
                  onChange={changeHandler}
                  placeholder="Name"
                  name="name"
                  defaultValue={props.team.name}
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
                  defaultValue={props.team.description}
                  required
                />
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

export default TeamEdit;