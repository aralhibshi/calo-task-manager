// Dependencies
import React, { useState, useContext, Fragment, ChangeEvent } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Components
import Task from './Task';

// Bootstrap and CSS
import 'font-awesome/css/font-awesome.min.css';

// Context
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTasks from '../../customHooks/useUserTasks';

const TaskIndex: React.FC = () => {

   // Context
   const { userID } = useContext(UserIDContext);

  //  Custom Hook
   const tasks = useUserTasks(userID);

  // States
  const [limit, setLimit] = useState<number>(10);

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
  };

  // Map Through and Display Each Task
  const showAllTasks = (): JSX.Element[] | undefined => {
    if (typeof tasks !== 'undefined' && tasks.length > 0) {
      return tasks.map((taskEl, index) => {
        return (
          <Fragment key={index}>
            <Task task={taskEl}/>
          </Fragment>
        )
      })
    }
  }

  return (
    <div>
      {/* <select
        value={limit}
        onChange={handleLimitChange}
        >
            <option value="1">
                1
            </option>
            <option value="5">
                5
            </option>
            <option value="10">
                10
            </option>
            <option value="20">
                20
            </option>
        </select> */}
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
              Title
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
              Status
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
              Team
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
            {/* <th scope='col'>Description</th>
            <th scope='col'>Status</th> */}
            {/* <th scope='col'>Team</th> */}
            {/* <th scope='col'>Edit</th> */}
            {/* <th scope='col'>Delete</th> */}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {showAllTasks()}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TaskIndex;