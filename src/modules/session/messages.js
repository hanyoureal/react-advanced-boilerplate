import { defineMessages } from 'react-intl';

export default defineMessages({
  username: {
    id: 'Login.username',
    description: 'Username label',
    defaultMessage: 'Username',
  },
  password: {
    id: 'Login.password',
    description: 'Password label',
    defaultMessage: 'Password',
  },
  submit: {
    id: 'Login.submit',
    description: 'Log in submit button label',
    defaultMessage: 'Login',
  },
  authentication: {
    id: 'Login.authentication',
    description: 'Authentication form label',
    defaultMessage: 'Authentication',
  },
  default_error: {
    id: 'Error.default',
    description: 'Default error message',
    defaultMessage: 'An error has occurred',
  },
  requiredField: {
    id: 'Error.requiredField',
    description: 'Field is required error',
    defaultMessage: 'This is a required field',
  },
  profile: {
    id: 'Navigation.profile',
    description: 'Profile label',
    defaultMessage: 'Profile',
  },
  settings: {
    id: 'Navigation.settings',
    description: 'Settings label',
    defaultMessage: 'Settings',
  },
  logout: {
    id: 'Navigation.logout',
    description: 'Log out button label',
    defaultMessage: 'Logout',
  },
});
