<template>
  <div id="page-User-Projects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Project: {{ userProject.project.name }}</h3>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h4>Details</h4>
            </v-card-title>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field label="Name" v-model="userProject.project.name" readonly></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="Current sprint" v-model="currentSprint.name" readonly></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex sm12 v-if="projectLoaded">
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-tabs v-model="selectedTab" @change="handleTabChange">
                    <v-tab ripple href="#tab-backlog" >
                      Product backlog
                    </v-tab>
                    <v-tab ripple href="#tab-sprints" >
                      sprints
                    </v-tab>
                    <v-tabs-items v-model="selectedTab">              
                      <v-tab-item value="tab-backlog">
                        <product-backlog v-bind:userProject="userProject"
                                         v-bind:currentSprint="currentSprint">
                          </product-backlog>
                      </v-tab-item>
                      <v-tab-item value="tab-sprints">
                        <sprints ref="sprints" v-bind:userProject="userProject" 
                                               v-bind:currentSprint="currentSprint">
                          </sprints>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tabs>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductBacklog from '@/components/widgets/ProductBacklog';
import Sprints from '@/components/widgets/Sprints';
import ProjectService from '@/api/projects';
import SprintService from '@/api/sprints';
export default {
  components: {
    ProductBacklog,
    Sprints
  },
  data: () => ({
    selectedTab: 'tab-sprints',  
    userProject: {
      project: { name: '' }
    },
    userId: JSON.parse(localStorage.getItem('user')).id,
    projectLoaded: false,
    projectSprints: [],
    currentSprint: {
      name: ''
    }
  }),
  computed: {
  },
  created: function() {
    this.id = this.$route.params.id;
    
    if(this.id != -1) {
      this.getUserProject();
      this.getProjectSprints();
    }
  },
  methods: {
    handleClick (e) {
      e.preventDefault();
    },
    handleTabChange (val, e) {
      // make sure the chart resized while parent from hidden to show
      window.dispatchEvent(new Event('resize'));
      this.$refs.sprints.fillTimelineData();
    },
    getUserProject() {
      ProjectService.getUserProject(this.userId, this.id)
        .then(userProject => {
          this.userProject = userProject;
          this.project = userProject.project;
          this.projectLoaded = true;
        });
    },
    getProjectSprints () {
      SprintService.getProjectSprints(this.id)
        .then(projectSprints => {
          this.projectSprints = projectSprints;
          
          let currentDate = new Date();
          let _currentSprint = this.projectSprints.filter(x => {
            let startDate = new Date(x.startdate);
            let endDate = new Date(x.enddate);

            return startDate.getTime() <= currentDate && endDate.getTime() >= currentDate;
          });

          if(_currentSprint.length > 0)
            this.currentSprint = _currentSprint[0];
        });
    },
  }
};
</script>
