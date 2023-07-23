// Dependencies
import React, { useState, useContext, Fragment, ChangeEvent } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Components
import Team from './Team';

// Bootstrap and CSS
import 'font-awesome/css/font-awesome.min.css';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTeams from '../../customHooks/useUserTeams';

const TeamIndex: React.FC = () => {

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hook
  const teams = useUserTeams(userID);

  // Map Through and Display Each Team
  const showAllTeams = (): JSX.Element[] | undefined => {
    if (typeof teams !== 'undefined' && teams.length > 0) {
      console.log(teams);
      return teams.map((teamEl, index) => {
        return (
          <Fragment key={index}>
            <Team team={teamEl}/>
          </Fragment>
        )
      })
    }
  }

  return (
    <div className="vh-100 gradient-custom-3">
      <MDBTable align='middle' className='' hover>
        <MDBTableHead>
          <tr>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #1c1e1f',
              borderBottom: 'solid 4px #4a5153',
              background: '#1c1e1f',
              color: 'white',
              fontWeight: 'bold',
            }}
            >
              Team Name
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #1c1e1f',
              borderBottom: 'solid 4px #4a5153',
              background: '#1c1e1f',
              color: 'white',
              fontWeight: 'bold',
            }}
            >
              Description
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #1c1e1f',
              borderBottom: 'solid 4px #4a5153',
              background: '#1c1e1f',
              color: 'white',
              fontWeight: 'bold',
            }}
            >
              Edit
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #1c1e1f',
              borderBottom: 'solid 4px #4a5153',
              background: '#1c1e1f',
              color: 'white',
              fontWeight: 'bold',
            }}
            className='align-middle'
            >
              Delete
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {showAllTeams()}
        </MDBTableBody>
      </MDBTable>
    </div>
  )
};

export default TeamIndex;