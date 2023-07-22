import React, { useContext, useEffect } from 'react'

// Contexts
import UserIDContext from '../../contexts/UserIDContext'

// Custom Hooks
import useUserDetail from '../../customHooks/useUserDetail'

const Profile: React.FC = () => {

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hook
  const user = useUserDetail(userID);

  // User Date
  const createdAt: string | undefined= user?.createdAt?.toString()
  const date: any = createdAt ? new Date(createdAt): null;

  const year = createdAt ? date.getFullYear(): null;
  const month = createdAt ? date.getMonth() + 1: null;
  const day = createdAt ? date.getDate(): null;
  const fullDate = createdAt ? `${year}-${month}-${day}`: null


  useEffect(() => {
    console.log(date)
  })

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                  }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: '80px' }}
                  />
                  <h5>{user?.firstName} {user?.lastName}</h5>
                  <p className='text-muted'>Web Designer</p>
                  <a href="#!">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" style={{fontSize: '20px',cursor: 'pointer', color: '#ffc670'}}></i>
                  </a>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user?.emailAddress}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Joined</h6>
                        <p className="text-muted">{fullDate}</p>
                      </div>
                    </div>
                    <h6>Your Task Manager</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Tasks</h6>
                        <p className="text-muted">{user?.tasks.length}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Teams</h6>
                        <p className="text-muted">{user?.teams.length}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!">
                        <i className="fab fa-facebook-f fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-twitter fa-lg me-3"></i>
                      </a>
                      <a href="#!">
                        <i className="fab fa-instagram fa-lg"></i>
                      </a>
                    </div>
                  </div>
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

export default Profile