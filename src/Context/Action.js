const ROOT_URL = 'http://localhost:3000';

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/login`, requestOptions);
    let data = await response.json();
    let token = response.headers.get('Authorization')
    
    if (data.user) {
      const payload = {
        user: data.user,
        token
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload });
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('token', token);
      return data
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.errors });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}