<template>
  <div id="page-User-Projects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Project: {{ project.name}}</h3>
          <v-divider></v-divider>
          <list-stories></list-stories>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListStories from '@/components/lists/ListStories';
import ProjectService from '@/api/projects';
export default {
  components: {
    ListStories,
  },
  data: () => ({
    selectedTab: 'tab-1',  
    project: Object
  }),
  computed: {
  },
  created: function() {
    this.id = this.$route.params.id;
    
    if(this.id != -1) {
      this.getProject();
    }
  },
  methods: {
    getProject() {
      ProjectService.getProjectById(this.id)
        .then(project => {
          console.log(project);
          this.project = project;
        })
    }
  }

};
</script>
