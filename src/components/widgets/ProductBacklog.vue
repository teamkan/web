<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Product backlog</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <add-story v-if="canEdit"
                 v-bind:modal="addDialog"
                 v-bind:projectId="projectId"
                 v-on:added="getProjectStories"
                 icon="add">
        </add-story>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-container grid-list-xl fluid>
          <v-layout row wrap>        
            <v-flex xs8>  
                <view-story v-bind:modal="viewDialog"
                           v-bind:story="selectedStory">
                </view-story>
              <v-toolbar card dense color="transparent">
                <v-toolbar-title class="fullWidth"><h4 class="text-xs-center">Unrealized</h4></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs6> 
                  <v-toolbar card dense color="transparent">
                    <v-toolbar-title class="fullWidth"><h4 class="text-xs-center">Not assigned</h4></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <template v-for="(item, i) in notAssigned">
                    <v-flex lg12 sm12 class="flexPad" :key="i">
                      <v-card color="red darken-1" dark class="clickable" @click.native="openStory(item)">
                        <v-card-title class="pb-0">
                          <h4>{{ item.title }}</h4>
                          <v-spacer></v-spacer>
                          <v-icon>
                            {{ getPriorityIcon(item.priority) }}
                          </v-icon>
                        </v-card-title>
                        <v-card-text>
                          {{ item.description.length > 64 ? item.description.substring(0, 64) + '...' : item.description }}
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </template>
                </v-flex>
                <v-flex xs6>  
                  <v-toolbar card dense color="transparent">
                    <v-toolbar-title class="fullWidth"><h4 class="text-xs-center">Assigned</h4></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <template v-for="(item, i) in assigned">
                    <v-flex lg12 sm12 class="flexPad" :key="i">
                      <v-card color="light-blue darken-1" dark class="clickable" @click.native="openStory(item)">
                        <v-card-title class="pb-0">
                          <h4>{{ item.title }}</h4>
                          <v-spacer></v-spacer>
                          <v-icon>
                            {{ getPriorityIcon(item.priority) }}
                          </v-icon>
                        </v-card-title>
                        <v-card-text>
                          {{ item.description.length > 64 ? item.description.substring(0, 64) + '...' : item.description }}
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </template>
                </v-flex> 
              </v-layout>
            </v-flex>  
            <v-flex xs4>
              <v-toolbar card dense color="transparent">
                <v-toolbar-title class="fullWidth"><h4 class="text-xs-center">Realized</h4></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12> 
                  <v-toolbar card dense color="transparent">
                    <v-toolbar-title class="fullWidth"><h4 class="text-xs-center"></h4></v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <template v-for="(item, i) in realized">
                    <v-flex lg12 sm12 class="flexPad" :key="i">
                      <v-card color="green darken-1" dark class="clickable" @click.native="openStory(item)">
                        <v-card-title class="pb-0">
                          <h4>{{ item.title }}</h4>
                          <v-spacer></v-spacer>
                          <v-icon>
                            {{ getPriorityIcon(item.priority) }}
                          </v-icon>
                        </v-card-title>
                        <v-card-text>
                          {{ item.description.length > 64 ? item.description.substring(0, 64) + '...' : item.description }}
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </template>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import ProjectService from '@/api/projects'
import StoryService from '@/api/stories';
import UserService from '@/api/users'
import AddStory from '@/components/modals/projects/AddStory';
import ViewStory from '@/components/modals/projects/ViewStory';
import store from '@/store';
export default {
  components: {
    AddStory,
    ViewStory
  },
  props: {
    userProject: Object
  },
  data: function () {
    return {
      addDialog: {
        dialog: false
      },
      viewDialog: {
        dialog: false
      },
      stories: [],
      userId: JSON.parse(localStorage.getItem('user')).id,
      selectedStory: {}
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
    notAssigned: function() {
      let notAssigned = this.stories.filter(s => s.status == 0);
      return notAssigned;
    },
    assigned: function() {
      return this.stories.filter(s => s.status == 1);
    },
    realized: function() {
      return this.stories.filter(s => s.status == 2);
    },
  },
  created: function() {
    this.getProjectStories();
  },
  methods: {
    getProjectStories: function() {
      StoryService.getProjectStories(this.projectId)
        .then(stories => {
          this.stories = stories
        });
      
    },
    openStory: function(story) {
      this.selectedStory = story;
      this.viewDialog.dialog = true;
    },
    getPriorityIcon: function(priority) {
      if(priority == 'must_have')
        return 'filter_1'
      else if(priority == 'should_have')
        return 'filter_2'
      else if(priority == 'could_have')
        return 'filter_3'
      else if(priority == 'wont_have')
        return 'filter_4'
    }
  }
};
</script>
<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

.fullWidth
  width: 100%;

.flexPad
  padding: 6px 12px 6px 12px!important;

.clickable
  cursor: pointer;
</style>
