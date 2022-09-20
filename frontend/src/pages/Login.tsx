import React, {FormEvent, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useAppDispatch} from "../redux/hooks";
import {loginUserThunk} from "../redux/authSlice";
import {AppRoute} from "../const";
import {useNavigate} from "react-router-dom";
import {useGetAllQuery} from "../redux/usersApi";


const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {refetch} = useGetAllQuery();
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const result = await dispatch(loginUserThunk({email, password}));

    if (typeof result.payload !== 'string' && 'token' in (result.payload as object)) {
      refetch();
      navigate(AppRoute.Home, {replace: true});
    }
  }

  return (
    <div style={{maxWidth: 400, margin: "auto"}}>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email}
                        onChange={(evt) => setEmail(evt.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required value={password}
                        onChange={(evt) => setPassword(evt.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
