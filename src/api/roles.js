import axios from 'axios';

export default {
  getRoles() {
    return axios.get('Roles')
      .then(resp => { 
        return resp.data.roles
      });
  },

}
