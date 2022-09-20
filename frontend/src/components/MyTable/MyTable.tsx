import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import MyTableRow from "../MyTableRow/MyTableRow";
import {useGetAllQuery} from "../../redux/usersApi";
import Toolbar from "../Toolbar/Toolbar";


const MyTable = () => {
  const {isSuccess, data, fulfilledTimeStamp} = useGetAllQuery();
  const [selectedUsers, setSelectedUsers] = useState(new Set<string>());
  const isAllSelected = isSuccess && selectedUsers.size === data.length;


  useEffect(() => {
    setSelectedUsers( new Set());
  }, [fulfilledTimeStamp])

  const handleUserStatusToggle = (id: string) => {
    setSelectedUsers((prevState) => {
      const newSet = new Set(prevState);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    })
  }

  const handleAllStatusToggle = () => {
    if (!isSuccess) {
      return;
    }
    setSelectedUsers((prevState) => {
      return isAllSelected ? new Set() : new Set(data.map((it) => it.id));
    })
  }

  return (
    <>
      <Toolbar selectedUsers={Array.from(selectedUsers)}/>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>
            <label className="d-flex">
              <input type="checkbox" checked={isAllSelected} onChange={handleAllStatusToggle}/>
              <span className="ms-3 flex-grow-1">Select All</span>
            </label>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Registration date</th>
          <th>Last visit</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {
          isSuccess && data.length > 0 ? (
            data.map((user) => <MyTableRow
              key={user.id}
              user={user} isChecked={selectedUsers.has(user.id)}
              onStatusChange={handleUserStatusToggle}/>)
          ) : (
            <tr><td className="text-center fs-2" colSpan={7}>There is no users in Database :(</td></tr>
          )
        }
        </tbody>
      </Table>
    </>
  );
};

export default MyTable;
