import React, {useState} from 'react';
import {Button, Form, Input} from "reactstrap";
import { useHistory } from 'react-router';
import config from '../config';

const ContactNew = () => {
  const [newContact, useNewContact] = useState({
    first_name:'',
    last_name:'',
    phone:'',
  });
  const token = localStorage.getItem("token");
  const history = useHistory();

  const handleInputChange = (event) => {
    useNewContact({
        ...newContact,
        [event.target.name] : event.target.value
    })
  }

  const handleSubmit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(newContact),
      resource: `${config.apiUrl}/new/contact`,
    }
  
    let response = await fetch(requestOptions.resource, requestOptions)
    let data = await response.json();
    if (response.status === 202) {
      history.push('/contacts')
    }
    
  }

  return (
    <>
      <h1>New contact</h1>
      <Form>
        <label>First Name</label>
        <Input 
          name="first_name" 
          onChange={handleInputChange}
        />
        <label>Last Name</label>
        <Input 
          onChange={handleInputChange} 
          name="last_name" 
        />
        <label>Phone</label>
        <Input 
          onChange={handleInputChange} 
          name="phone" 
        />
        <Button onClick={handleSubmit} color="primary">Create</Button>
      </Form>
    </>
  )
}

export default ContactNew;