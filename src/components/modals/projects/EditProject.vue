<template>
  <v-dialog v-model="modal.dialog" persistent max-width="900px">
    <v-btn flat icon color="blue" slot="activator" @click=init>
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Edit project</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
              <v-stepper v-model="step">
                <v-stepper-header>
                  <v-stepper-step step="1" :complete="step > 1">Project details</v-stepper-step>
                  <v-divider> </v-divider>
                  <v-stepper-step step="2" :complete="step > 2">Users and roles</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                            <v-text-field label="Project name" v-model="project.name" required autocomplete="off"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                  </v-stepper-content>
                  <v-stepper-content step="2">
                    <v-container grid-list-xl fluid>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-combobox label="Select users"
                                      :items="allUsers"
                                      chips
                                      tags
                                      v-model="selectedUsers"
                                      multi-line
                                      item-text="username"
                                      item-value="id"
                                      multiple>                
                          </v-combobox>
                        </v-flex>
                        <v-flex xs12>
                          <v-autocomplete label="Select product owner"
                                    :items="selectedUsersPO"
                                    v-model="selectedProjectOwner"
                                    item-text="username"
                                    item-value="id"
                                    clearable
                                    clear-icon="clear">
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12>
                          <v-autocomplete label="Select scrum master"
                                    :items="selectedUsersSM"
                                    v-model="selectedScrumMaster"
                                    item-text="username"
                                    item-value="id"
                                    clearable
                                    clear-icon="clear">
                            </v-autocomplete>
                        </v-flex>
                        <v-flex xs12>
                          <v-autocomplete label="Select developer"
                                    :items="selectedUsersD"
                                    v-model="selectedDeveloper"
                                    item-text="username"
                                    item-value="id"
                                    clearable
                                    clear-icon="clear">
                            </v-autocomplete>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" flat @click.native="close" :disabled="loading">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="firstStep" color="green" flat @click.native="nextStep" :loading="loading">Next</v-btn>
        <v-btn v-if="secondStep" color="blue" flat @click.native="previousStep" :loading="loading">Back</v-btn>
        <v-btn v-if="secondStep" color="green" flat @click.native="save" :loading="loading">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  
</template>

<script>

import ProjectService from '@/api/projects';
import UserService from '@/api/users';
import { match } from 'minimatch';

export default {
  components: {
  },
  props: {
    modal: Object,
    icon: String,
    roles: Array,
    projectId: Number,
    projectName: String
  },
  data () {
    return {
      step: 1,
      selectedTab: 'tab-1',
      user: {
        firstname: '',
        lastname: '',
        roleId: -1,
      },
      project:{
          id: -1,
          name: ''
      },
      loading: false,
      selectedUsers: [],
      allUsers: [],
      selectedProjectOwner: -1,
      selectedScrumMaster: -1,
      selectedDeveloper: -1
    }
  },
  created: function() {
    UserService.getUsers()
      .then(users => {
        this.allUsers = users;
      });

    this.step = 1;
    
  },
  computed: {
    firstStep() {
      return this.step === 1;
    },
    secondStep() {
      return this.step === 2;
    },
    selectedUsersPO() {
      return this.selectedUsers.filter(user => {
        if(user.id === this.selectedScrumMaster || user.id === this.selectedDeveloper)
          return false;
        
        return true;
      });
    },
    selectedUsersSM() {
      return this.selectedUsers.filter(user => {
        if(user.id === this.selectedProjectOwner || user.id === this.selectedDeveloper)
          return false;
        
        return true;
      });
    },
    selectedUsersD() {
      return this.selectedUsers.filter(user => {
        if(user.id === this.selectedProjectOwner || user.id === this.selectedScrumMaster)
          return false;
        
        return true;
      });
    }
  },  
  methods: {
    save() {
      let name = this.project.name;

      if(name === '') {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }

      ProjectService.updateProject(this.project)
        .then(res => {
          ProjectService.deleteUsersFromProject(this.projectId)
            .then(res => {
              this.selectedUsers.forEach(user => {
              const _user = {
                'projectId' : this.projectId,
                'userId' : user.id,
                'roleId' : user.id == this.selectedProjectOwner ? 'project_owner' : user.id == this.selectedScrumMaster ? 'scrum_master' : user.id == this.selectedDeveloper ? 'developer' : 'standard' 
              }

              ProjectService.assignUserToProject(_user)
                .then(resp => {});
              this.clearFields();
              this.modal.dialog = false;
              this.$emit('added');
              });
            });
        }).catch(err => {
          window.getApp.$emit('DISPLAY_SNACK', err.response.data.msg, 'red');
        });
    },
    close() {
      this.clearFields();
      this.modal.dialog = false;
    },
    clearFields() {
      this.project.name = '';
      this.selectedUsers = [];
      this.step = 1;
    },
    nextStep() {
      if(this.project.name === '') {
        window.getApp.$emit('DISPLAY_SNACK', "Enter project name.", 'red');
        return;
      }

      this.step = 2;
    },
    previousStep() {
      this.step = 1;
    },
    init: function () {
      this.project.id = this.$props.projectId;
      this.project.name = this.$props.projectName;
      this.selectedUsers = [];

      ProjectService.getProjectUsers(this.project.id)
      .then(users => {
        users.forEach(u => {
          this.selectedUsers.push(u.user);

          switch (u.roleId) {
            case 'project_owner':
              this.selectedProjectOwner = u.user.id;
              break;
            case 'scrum_master':
              this.selectedScrumMaster = u.user.id;
              break;
            case 'developer':
              this.selectedDeveloper = u.user.id;
              break;
          }
        });
      });

    }
  }
};
</script>
