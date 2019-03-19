import axios from 'axios';

export default {
    getSprints() {
        return axios.get('Sprints')
            .then(resp => {
                return resp.data.sprints
            });
    },

    /*addSprint(user) {
        return axios.post('Sprints', sprint)
            .then(resp => {
                return resp;
            });
    },*/

}
