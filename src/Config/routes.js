
import ContactsIndex from '../Contact/ContactsIndex';
import ContactEdit from '../Contact/ContactEdit';
import ContactNew from '../Contact/ContactNew';
import UserNew from '../views/Login/User/UserNew'
import Login from '../views/Login';


const routes = [
  { 
    path: '/login',
    isPrivate: false,
    exact: true,
    name: 'Login',
    component: Login
  },
  { 
    path: '/user-new',
    isPrivate: false,
    exact: true,
    name: 'User new',
    component: UserNew
  },
  { 
    path: '/contacts', 
    name: 'Dashboard', 
    exact: true, 
    isPrivate: true, 
    component: ContactsIndex 
  },
  { 
    path: '/contact/:id', 
    name: 'Edit Contact', 
    exact: true, 
    isPrivate: true, 
    component: ContactEdit 
  },
  { 
    path: '/new/contact', 
    name: 'New contact', 
    exact: true, 
    isPrivate: true, 
    component: ContactNew 
  },
]

export default routes;