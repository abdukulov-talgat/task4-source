import {Navigate, Outlet} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from "../../redux/hooks";
import {selectAuth} from "../../redux/authSlice";


const ProtectedRoute = () => {
  const {token} = useAppSelector(selectAuth);

  if (!token) {
    return <Navigate to={AppRoute.Login} replace/>;
  }

  return (
    <Outlet/>
  );
}

export default ProtectedRoute;
