import axios from 'axios';

export default {
  getStories() {
    return axios.get('Stories')
      .then(resp => { 
        return resp.data.stories
      });
  },
  addStory(story) {
    return axios.post('Stories', story)
      .then(resp => {
        return resp.data.story;
      });
  },
  getProjectStories(projectId) {
    return axios.get('stories/filter?projectId=' + projectId)
      .then(resp => {
        return resp.data.stories;
      });
  },
  getStoryByTitle(projectId, title) {
    return axios.get('stories/filter?projectId=' + projectId + '&title=' + title)
      .then(resp => {
        return resp.data.stories;
      });
  },
}
