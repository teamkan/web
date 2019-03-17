<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Stories</h4></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-container grid-list-xl fluid>
          <v-layout row wrap>        
            <v-flex xs8>  
              <v-layout row wrap>   
                <v-flex xs6>  
                  <v-data-table :headers="headers"
                                :items="projects"
                                hide-actions
                                class="elevation-0">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.project.id }}</td>
                      <td>{{ props.item.project.name }}</td>
                    </template>
                  </v-data-table>
                </v-flex>  
                <v-flex xs6>  
                  <v-data-table :headers="headers"
                                :items="projects"
                                hide-actions
                                class="elevation-0">
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.project.id }}</td>
                      <td>{{ props.item.project.name }}</td>
                    </template>
                  </v-data-table>
                </v-flex>  
              </v-layout>
            </v-flex>  
            <v-flex xs4>
              <v-data-table :headers="headers"
                            :items="projects"
                            hide-actions
                            class="elevation-0">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.project.id }}</td>
                  <td>{{ props.item.project.name }}</td>
                </template>
              </v-data-table>
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
import UserService from '@/api/users'
import AddProject from '@/components/modals/projects/AddProject';
import store from '@/store';
export default {
  components: {
    AddProject
  },
  props: {
    
  },
  data: function () {
    return {
      headers: [
        {
          text: 'ID',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Project name',
          align: 'left',
          value: 'name'
        },
      ],
      projects: [],
      addDialog: {
        dialog: false
      },
      userId: JSON.parse(localStorage.getItem('user')).id
    }
  },
  computed: {
  },
  created: function() {
      this.getUserProjects();
  },
  methods: {
    getUserProjects() {
      ProjectService.getUserProjects(this.userId)
          .then(projects => {
              this.projects = projects;
          })
    },
    projectRole(role) {
      return role == 'project_owner' ? 'Product owner' : role == 'scrum_master' ? 'Scrum master' : role == 'developer' ? 'Developer' : 'Standard'
    },
    openProject(projectId) {
      this.$router.push({name: 'Project', params: {id: projectId}});
    },

  }
};
</script>
