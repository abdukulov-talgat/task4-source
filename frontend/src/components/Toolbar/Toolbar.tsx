import React from 'react';
import {Button} from "react-bootstrap";
import classNames from "classnames";
import styles from './Toolbar.module.css';
import {useBlockUsersMutation, useDeleteUsersMutation, useUnblockUsersMutation} from "../../redux/usersApi";
import {checkTokenThunk} from "../../redux/authSlice";
import {useAppDispatch} from "../../redux/hooks";
import {getToken} from "../../services/token";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "../../const";

type ToolbarProps = {
  selectedUsers: string[];
}

const Toolbar = ({selectedUsers}: ToolbarProps) => {
  const [blockUsers, blockUsersResult] = useBlockUsersMutation()
  const [unblockUsers, unblockUsersResult] = useUnblockUsersMutation()
  const [deleteUsers, deleteUsersResult] = useDeleteUsersMutation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const recheckToken = async () => {
    const token = getToken();
    const isSuicide = await dispatch(checkTokenThunk(token)) === undefined;

    if(isSuicide) {
      navigate(AppRoute.Login);
    }
  }

  const handleBlockClick = async () => {
    await blockUsers({usersId: selectedUsers});
    recheckToken();
  }

  const handleUnblockClick = () => {
    unblockUsers({usersId: selectedUsers})
  }

  const handleDeleteClick = async () => {
    await deleteUsers({usersId: selectedUsers});
    recheckToken();
  }

  return (
    <ul className="m-0 p-0 mt-5 mb-3 d-flex gap-3 justify-content-center">
      <Button className={classNames(styles.button, styles.buttonBlock)}
              onClick={handleBlockClick}
              variant="primary"
              type="button"
              disabled={selectedUsers.length === 0}
              aria-label="Block user(s)"/>
      <Button className={classNames(styles.button, styles.buttonUnblock)}
              onClick={handleUnblockClick}
              variant="primary"
              type="button"
              disabled={selectedUsers.length === 0}
              aria-label="Unblock user(s)"/>
      <Button className={classNames(styles.button, styles.buttonDelete)}
              onClick={handleDeleteClick}
              variant="primary"
              type="button"
              disabled={selectedUsers.length === 0}
              aria-label="Delete user(s)"/>
    </ul>
  );
};

export default Toolbar;
