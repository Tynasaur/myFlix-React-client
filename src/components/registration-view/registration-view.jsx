import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistered(username);
  };

  return (
    <Form >
      <Form.Group controlId='formUsername'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' placeholder='me@google.com' value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control type='email' placeholder='me@google.com' value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type='text' value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}
