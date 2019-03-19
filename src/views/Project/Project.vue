<template>
  <div id="page-User-Projects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Project: {{ project.name}}</h3>
          <v-divider></v-divider>
        </v-flex>
        <v-flex sm12 v-if="projectLoaded">
          <!--<product-backlog v-bind:userProject="userProject"></product-backlog>-->
          <sprints v-bind:userProject="userProject"></sprints>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductBacklog from '@/components/widgets/ProductBacklog';
import Sprints from '@/components/widgets/Sprints';
import ProjectService from '@/api/projects';
export default {
  components: {
    ProductBacklog,
    Sprints
  },
  data: () => ({
    selectedTab: 'tab-1',  
    project: {},
    userProject: {},
    userId: JSON.parse(localStorage.getItem('user')).id,
    projectLoaded: false
  }),
  computed: {
  },
  created: function() {
    this.id = this.$route.params.id;
    
    if(this.id != -1) {
      this.getProject();
      this.getUserProject();
    }
  },
  methods: {
    getProject() {
      ProjectService.getProjectById(this.id)
        .then(project => {
          this.project = project;
        })
    },
    getUserProject() {
      ProjectService.getUserProject(this.userId, this.id)
        .then(userProject => {
          this.userProject = userProject;
          this.projectLoaded = true;
        });
    }
  }
};
</script>
