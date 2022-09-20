import React, {FormEvent, useState} from 'react';
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {registerUserThunk, selectAuth} from "../redux/authSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useGetAllQuery} from "../redux/usersApi";
import {useNavigate} from "react-router-dom";
import {AppRoute} from "../const";


const Register = () => {
  const dispatch = useAppDispatch();
  const {refetch} = useGetAllQuery();
  const navigate = useNavigate()
  const [email, setEmail] = useState('example@gmail.com');
  const [name, setName] = useState('John Smith');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const result = await dispatch(registerUserThunk({email, name, password}));

    if (typeof result.payload !== "string") {
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control type="text" placeholder="John Smith" value={name}
                        onChange={(evt) => setName(evt.target.value)}
                        required/>
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

export default Register;
