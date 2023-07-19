// Dependencies
import React, { useState, useEffect, Fragment, ChangeEvent } from 'react';
import Axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Components
import Task from './Task';

// Interfaces
import { ITask } from '../../interfaces/ITask';

const TaskIndex: React.FC = () => {

  // States
  const [limit, setLimit] = useState<number>(10);
  const [tasks, setTasks] = useState<Array<ITask>>([]);

  // Get All Tasks on Load
  useEffect(() => {
    getAllTasks();
  }, [limit]);

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
  };

  // Axios Get - All Tasks
  const getAllTasks = async (): Promise<void> => {
    await Axios.get<ITask[]>(`/task/index?limit=${limit}'`)
    .then(res => {
      console.log(res.data)
      setTasks(res.data);
    })
    .catch(err => {
      console.log('Cannot Get Tasks with Axios');
      console.log(err);
    })
  };

  // Map Through and Display Each Task
  const showAllTasks = (): JSX.Element[] => {
    return tasks.map((taskEl, index) => {
      return (
        <Fragment key={index}>
          <Task task={taskEl}/>
        </Fragment>
      )
    })
  }

  return (
    <div>
      <select
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
        </select>
      <MDBTable align='middle' hover>
        <MDBTableHead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Status</th>
            <th scope='col'>Team</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
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