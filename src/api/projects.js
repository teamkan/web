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
        return resp.data.project;
      });
  },
  assignUserToProject(projectUser) {
    return axios.post('Projects/AssignUser', projectUser)
      .then(resp => {
        return resp;
      });
  },

  getProjectByName(projectName) {
    return axios.get('projects/filter?projectName=' + projectName)
      .then(resp => {
        return resp.data.projects;
      });
  }
}
