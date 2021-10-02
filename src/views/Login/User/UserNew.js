import React, {useState} from 'react';
import { useHistory } from 'react-router';
import {
  Container, 
  Card,
  CardTitle,
  CardBody,
  Label,
  Input,
  Form,
  FormGroup,
  Button
} from 'reactstrap';

const UserNew = () => {
  const [newUser, useNewUser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    username:'',
    password:'',
  });
  const history = useHistory();

  const handleSubmit = async () => {
    if (newUser && newUser.username === '' && newUser.password === '') {
      console.log('newUser', newUser);
      
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newUser),
    };
    let response = await fetch('http://localhost:3000/user/new', requestOptions);
    let data = await response.json();
    if (data && data.ok) {
      console.log('aqi')
      history.push('/login')
    }
  }

  const handleInputChange = (event) => {
    useNewUser({
        ...newUser,
        [event.target.name] : event.target.value
    })
  }

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Address Book Register</CardTitle>
          <Form>
            <FormGroup>
              <Label for="username">First Name</Label>
              <Input 
                onChange={handleInputChange}
                name="first_name"
                id="username"
                invalid={newUser?.first_name ? false : true}
              />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input 
                  onChange={handleInputChange} 
                  name="last_name"
                  id="last_name"
                  invalid={newUser?.last_name ? false : true}
                />
              </FormGroup>
              <FormGroup>
                <Label>Username</Label>
                <Input 
                  onChange={handleInputChange} 
                  name="username"
                  required
                  invalid={newUser?.username ? false : true}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input 
                  onChange={handleInputChange} 
                  name="email"
                  type="email"
                  required
                  invalid={newUser?.email ? false : true}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input 
                  onChange={handleInputChange}
                  type="password"
                  name="password"
                  invalid={newUser?.password ? false : true}
                />
              </FormGroup>
            <Button onClick={handleSubmit} color="primary">Create</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  )
}

export default UserNew;