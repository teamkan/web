import axios from 'axios';

export default {
  getProjects() {
    return axios.get('Projects')
      .then(resp => { 
        return resp.data.projects
      });
  },
  getProjectUser() {
    return axios.get('ProjectUsers',{
      projectId: 1
    })
      .then(resp => { 
        return resp.data.projectusers
      });
  },
  addProject(project) {
    return axios.post('Projects', project)
      .then(resp => {
        return resp;
      });
  },
  assignUserToProject(project) {
    return axios.post('UserProjects', project)
      .then(resp => {
        return resp;
      });
  },
}
