 /* eslint-disable */ 
import React, { useEffect, useState} from 'react';
import { Table, Button } from 'reactstrap';
import { useHistory } from 'react-router';
import { logout,  useAuthDispatch } from '../Context';
import config from '../config';

const ContactsIndex = () => {
  const history = useHistory();
  const token = localStorage.getItem("token")
  const dispatch = useAuthDispatch();
  const [contacts, useContacts] = useState([])

  const handleEditContacts = (id) => {
    history.push(`contact/${id}`)
  }

  const handleDeleted = async(id) => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`,
      },
      resource: `${config.apiUrl}/contact/${id}`,
    };
    let response = await fetch(requestOptions.resource, requestOptions)
    if (response.status === 202) {
      history.go(0)
    }
    // .then(response => {
    //   if (response.status === 200){
    //     window.location.reload();
    //   }
    // })
  }

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      resource: `${config.apiUrl}/contacts`,
    };
    fetch(requestOptions.resource, {requestOptions})
    .then(response => response.json())
    .then(data => {
      if (data && data.contact){
        useContacts(data.contact)
        history.push('/contacts')
      }
    })
  },[])
  
  const handleLogout = async () => {
    await logout(dispatch, {});
  }

  const handleRedirect = () => {
    history.push('new/contact')
  }
  
  return(
    <>
      <button onClick={handleLogout}>Logout</button>
      <h2>Indice de contactos</h2>
      <Button onClick={handleRedirect}>New contact</Button>
      <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      {
        contacts && contacts.length > 0 &&
        contacts.map((contact, index) => {
          return(
            <tbody>
              <tr key={contact._id}>
                <th>{index + 1}</th>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.phone}</td>
                <td>
                  <Button onClick={()=>handleEditContacts(contact._id)} color="link">Editar</Button>
                  <Button onClick={()=>handleDeleted(contact._id)} color="link">Eliminar</Button>
                </td>
                
              </tr>   
            </tbody>
          )
        })
      }
      </Table>
    </>
  );
}

export default ContactsIndex;