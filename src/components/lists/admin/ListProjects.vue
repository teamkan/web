<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Projects</h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <add-project v-bind:modal="addDialog"
                icon="add"
                v-bind:users="users"
                v-on:added="getProjects">
      </add-project>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers"
                      :items="projects"
                      :pagination.sync="pagination"
                      class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">
                <edit-project v-bind:modal="editDialog"
                  icon="edit"
                  v-bind:users="users"
                  v-on:added="getProjects"
                  v-bind:projectName="props.item.name"
                  v-bind:projectId="props.item.id">
                </edit-project>
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
import UserService from '@/api/users'
import AddProject from '@/components/modals/projects/AddProject';
import EditProject from '@/components/modals/projects/EditProject';
import store from '@/store';
export default {
  components: {
    AddProject,
    EditProject
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
        { text: 'Actions', value: 'action', align: 'right' },
      ],
      projects: [],
      users: [],
      pagination: {
        descending: false,
        rowsPerPage: 10,
        sortBy: 'id'
      },
      addDialog: {
        dialog: false
      },
      editDialog: {
        dialog: false
      }
    }
  },
  created: function() {
      this.getProjects();
      this.getUsers();
  },
  methods: {
      getProjects() {
        ProjectService.getProjects()
            .then(projects => {
                this.projects = projects;
            })
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
