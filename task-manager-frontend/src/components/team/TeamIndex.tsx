// Dependencies
import React, { useState, useContext, Fragment, ChangeEvent, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Components
import Team from './Team';

// Bootstrap and CSS
import 'font-awesome/css/font-awesome.min.css';

// Interafaces
import { ITeam } from '../../interfaces/ITeam';

// Contexts
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTeams from '../../customHooks/useUserTeams';

const TeamIndex: React.FC = () => {

  // States
  const [refetch, setRefetch]: any = useState(false);

  // Set Refetch to False
  useEffect(() => {
    setRefetch(false);  
  });

  // Context
  const { userID } = useContext(UserIDContext);

  // Custom Hook
  const teams: Array<ITeam> | undefined = useUserTeams(userID, refetch);

  // Map Through and Display Each Team
  const showAllTeams = (): JSX.Element[] | undefined => {
    if (typeof teams !== 'undefined' && teams.length > 0) {
      return teams.map((teamEl, index) => {
        return (
          <Fragment key={index}>
            <Team team={teamEl} setRefetch={setRefetch}/>
          </Fragment>
        )
      })
    }
  }

  return (
    <div className="gradient-custom-3 div-bg">
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