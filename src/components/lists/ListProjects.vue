<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Projects</h4></v-toolbar-title>
       <add-project v-bind:modal="addDialog"
                  icon="add"
                  v-bind:users="users">
        </add-project>

    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers"
                      :items="projects"
                      :pagination.sync="pagination"
                      class="elevation-0"
                      @select="selected">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">
                <v-btn flat icon color="grey">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn flat icon color="red">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import ProjectService from '@/api/projects'
import RoleService from '@/api/roles'
import UserService from '@/api/users'
import AddProject from '@/components/modals/users/AddProject';
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
        }
      ],
      projects: [],
      users: [],
      roles: [],
      pagination: {
        descending: false,
        rowsPerPage: 10,
        sortBy: 'id'
      },
      addDialog: {
        dialog: false
      },
    }
  },
  created: function() {
      this.getProjects();
      this.getRoles();
      this.getUsers();
  },
  methods: {
      getProjects() {
        ProjectService.getProjects()
            .then(projects => {
                this.projects = projects;
            })
      },
      getRoles() {
        RoleService.getRoles()
          .then(roles => {
            this.roles = roles;
          });
      },
      getUsers() {
        UserService.getUsers()
          .then(users => {
            this.users = users;
          });
      }
  }
};
</script>
