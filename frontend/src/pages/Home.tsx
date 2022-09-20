import React from 'react';
import MyTable from "../components/MyTable/MyTable";
import {useGetAllQuery} from "../redux/usersApi";
import {Spinner} from "react-bootstrap";



const Home = () => {

  return (
    <div>
      <h1 className="text-center text-uppercase">Users list</h1>
     <MyTable />
    </div>
  );
};

export default Home;
