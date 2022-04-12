import axios from 'axios';

import { LOG_IN, saveUserData } from '../actions/login';

const api = axios.create({
  baseURL: 'http://orianeberti-server.eddi.cloud/projet-13-ultimatelist-back/public/api',
});

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOG_IN:
      api.post(
        // URL
        '/login_check',
        // données
        {
          username: store.getState().login.username,
          password: store.getState().login.password,
        },
      )
        .then((response) => {
          store.dispatch(saveUserData(response.data.token));
          api.defaults.headers.common.Authorization = `bearer ${response.data.token}`;
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;