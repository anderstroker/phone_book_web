import React, { useState } from "react";
import { useHistory } from "react-router";
import { 
  Card,
  CardBody, 
  CardTitle, 
  Button,
  Row,
  Col,
  Container,
  Form,
  Label,
  Input
} from "reactstrap";
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';

function Login({props}) {
  const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
  const history = useHistory();

	const dispatch = useAuthDispatch();
	const { errorMessage } = useAuthState();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			let response = await loginUser(dispatch, { username, password });
			if (!response.user) return;
			history.push('/contacts');
		} catch (error) {
			console.log(error);
		}
	};

  const handleUserNew = () => {
    history.push('/user-new');
  }

  return(
    <Container>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Address Book Login</CardTitle>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <Form>
            <Label for="username">Usuario</Label>
            <Input 
              onChange={e => setUserName(e.target.value)}
              name="username"
              id="username"
              placeholder="usuario"
            />
            <Label for="password">Contraseña</Label>
            <Input 
              onChange={e => setPassword(e.target.value)} 
              type="password"
              name="password"
              id="password"
              placeholder="contraseña"
            />
            <Button onClick={handleLogin} color="primary">Iniciar sesión</Button>
          </Form>
          <Row style={{marginTop:'10px'}}>
            <Col>
            </Col>
            <Col>
              <Button onClick={handleUserNew} outline color="primary">Registrarse</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  )
};

export default Login;