import axios from 'axios';

export default {
  getUsers() {
    return axios.get('Users')
      .then(resp => { 
        return resp.data.users
      });
  },
  addUser(user) {
    return axios.post('Users', user)
      .then(resp => {
        return resp;
      });
  },

}
