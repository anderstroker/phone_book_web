import React, { useEffect, useState} from 'react';
import {Button, Form, Input} from "reactstrap";
import { useHistory } from 'react-router';
import config from '../config';

const ContactEdit = (props) => {
  const history = useHistory();
  const { id } = props.match.params
  const token = localStorage.getItem("token")
  const [contact, useContact] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      resource: `${config.apiUrl}/contact/${id}`,
    }
    fetch(requestOptions.resource, {requestOptions})
    .then(response => response.json())
    .then(data => {
      if (data && data.contact){
        useContact(data.contact)
      }
    })
  },[])

  const handleInputChange = (event) => {
    useContact({
        ...contact,
        [event.target.name] : event.target.value
    })
  }

  const handleSubmit = async () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      resource: `${config.apiUrl}/contact/${id}`,
      body: JSON.stringify(contact),
    }
    let response = await fetch(requestOptions.resource, requestOptions)
    let data = await response.json();
    if (response.status === 202) {
      history.push('/contacts')
    }
  }


  return (
    <>
      <h1>Edicion</h1>
      <Form>
        <label>First Name</label>
        <Input 
          name="first_name" 
          value={contact?.first_name}
          onChange={handleInputChange}
        />
        <label>Last Name</label>
        <Input 
          onChange={handleInputChange} 
          name="last_name" 
          value={contact?.last_name}
        />
        <label>Phone</label>
        <Input 
          onChange={handleInputChange} 
          name="phone" 
          value={contact?.phone}
        />
        <Button onClick={handleSubmit} color="primary">Update</Button>
      </Form>
    </>
  )
}

export default ContactEdit;
