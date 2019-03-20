<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-spacer></v-spacer>
        <add-sprint v-bind:modal="addDialog"
                  icon="add"
                  v-on:added="getProjectSprints"
                  v-bind:projectId="projectId">
        </add-sprint>
    </v-toolbar>
    <v-card-text class="pa-0">
      <v-flex xs12>
          <list-sprints v-bind:currentSprint="currentSprint"></list-sprints>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-toolbar card dense color="transparent">
            <v-toolbar-title><h4>Timemline</h4></v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-0">
            <v-layout row wrap>
              <v-flex xs12>
                <timeline :data="chartData">
              </timeline>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-card-text>
  </v-card>
</template>
<script>
import SprintService from '@/api/sprints'
import AddSprint from '@/components/modals/sprints/AddSprint';
import ListSprints from '@/components/lists/ListSprints';
export default {
  components: {
    AddSprint,
    ListSprints
  },
  props: {
    userProject: Object,
    currentSprint: Object
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      projectSprints: {},
      addDialog: {
        dialog: false
      }
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
          this.fillTimelineData();
        });
    },
    fillTimelineData: function() {
      this.chartData = [];
      this.projectSprints.forEach(sprint => {
        this.chartData.push([sprint.name, sprint.startdate, sprint.enddate]);
      });
    },
  }
};
</script>