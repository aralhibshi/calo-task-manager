// Dependencies
import React, { useState, useContext, Fragment, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Components
import Task from './Task';

// Bootstrap and CSS
import 'font-awesome/css/font-awesome.min.css';

// Interfaces
import { ITask } from '../../interfaces/ITask';
import { ITaskIndexProps } from '../../interfaces/ITaskIndexProps';

// Context
import UserIDContext from '../../contexts/UserIDContext';

// Custom Hooks
import useUserTasks from '../../customHooks/useUserTasks';

const TaskIndex: React.FC<ITaskIndexProps> = (props) => {

  // States
  // const [limit, setLimit] = useState<number>(10);
  const [refetch, setRefetch]= useState<boolean>(false);

  // Set Refetch to True or False (Depending on Props)
  useEffect(() => {
    if (props.refetch) {
      setRefetch(true)
    } else {
    setRefetch(false);
    }
  }, [props.refetch])

  // Context
  const { userID } = useContext(UserIDContext);

  //  Custom Hook
  const tasks: Array<ITask> | undefined = useUserTasks(userID, refetch);


  // // Limit Change
  // const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
  //   const newLimit = parseInt(e.target.value, 10);
  //   setLimit(newLimit);
  // };

  // Map Through and Display Each Task
  const showAllTasks = (): JSX.Element[] | undefined => {
    if (typeof tasks !== 'undefined' && tasks.length > 0) {
      return tasks.map((taskEl, index) => {
        return (
          <Fragment key={index}>
            <Task task={taskEl} setRefetch={setRefetch}/>
          </Fragment>
        )
      })
    }
  }

  return (
    <div className="gradient-custom-3 div-bg">
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
      <MDBTable align='middle' className='custom-table' hover>
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
              Title
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
              Status
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
              Team
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
          {showAllTasks()}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default TaskIndex;