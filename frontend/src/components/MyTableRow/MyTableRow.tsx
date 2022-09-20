import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {User} from "../../types";

dayjs.extend(relativeTime);

type MyTableRowProps = {
  user: User,
  isChecked: boolean,
  onStatusChange: (id: string) => void,
}

const MyTableRow = ({user, isChecked, onStatusChange}: MyTableRowProps) => {
  const {id, name, email, isBanned, registerDate, lastVisit} = user;


  return (
    <tr>
      <td>
        <label className="d-flex">
          <input type="checkbox" checked={isChecked} onChange={() => onStatusChange(id)}/>
          <span className="ms-3 flex-grow-1">Select</span>
        </label>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{dayjs(registerDate).format('YYYY MMMM DD')}</td>
      <td>{dayjs(lastVisit).fromNow()}</td>
      <td>{isBanned ? 'Blocked' : 'Freeman'}</td>
    </tr>
  );
};

export default MyTableRow;
