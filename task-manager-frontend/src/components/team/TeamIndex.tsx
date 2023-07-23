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
    <div>
      <MDBTable align='middle' className='' hover>
        <MDBTableHead>
          <tr>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #c9c9c9',
              borderBottom: 'solid 4px #c9c9c9',
              background: '#f7f7f7',
              color: 'black',
              fontWeight: 'bold',
            }}
            >
              Team Name
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #c9c9c9',
              borderBottom: 'solid 4px #c9c9c9',
              background: '#f7f7f7',
              color: 'black',
              fontWeight: 'bold',
            }}
            >
              Description
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #c9c9c9',
              borderBottom: 'solid 4px #c9c9c9',
              background: '#f7f7f7',
              color: 'black',
              fontWeight: 'bold',
            }}
            >
              Edit
            </th>
            <th
            scope='col'
            style={{
              borderTop: 'solid 4px #c9c9c9',
              borderBottom: 'solid 4px #c9c9c9',
              background: '#f7f7f7',
              color: 'black',
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