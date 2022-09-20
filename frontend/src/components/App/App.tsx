import React from 'react';
import Home from "../../pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../../pages/Layout";
import {AppRoute} from "../../const";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../../pages/Login";
import Register from "../../pages/Register";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Home} element={<Layout/>}>
          <Route element={<ProtectedRoute/>}>
            <Route index element={<Home/>}/>
          </Route>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.Register} element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
