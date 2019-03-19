<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Sprints</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <!--<add-story v-if="canEdit"
                 v-bind:modal="addDialog"
                 v-bind:projectId="projectId"
                 v-on:added="getProjectStories"
                 icon="add">
        </add-story>-->
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
          <timeline :data="chartData"></timeline>
    </v-card-text>
  </v-card>
</template>
<script>
import SprintService from '@/api/sprints'
export default {
  components: {
  },
  props: {
    userProject: Object
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      projectSprints: {},
    }
  }, 
  computed: {
    canEdit: function() {
      if(this.userProject.roleId == 'project_owner' || this.userProject.roleId == 'scrum_master')
        return true;

      return false;
    },
    projectId: function() {
      return this.userProject.projectId;
    },
  },
  created: function() {
    this.getProjectSprints();
  },
  methods: {
    getProjectSprints () {
      SprintService.getProjectSprints(this.projectId)
        .then(projectSprints => {
          this.projectSprints = projectSprints;

          this.chartData = [[projectSprints[0].sprintname, projectSprints[0].startdate, projectSprints[0].enddate]]
        });
    }
  }
};
</script>