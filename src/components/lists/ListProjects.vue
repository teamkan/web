<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Projects</h4></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers"
                      :items="projects"
                      :pagination.sync="pagination"
                      class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.project.id }}</td>
            <td>{{ props.item.project.name }}</td>
            <td>{{ projectRole(props.item.roleId) }}</td>
            <td class="text-xs-right">
                <edit-project v-bind:modal="getEditDialog(props.item.id)"
                              icon="edit"
                              v-bind:projectsName="props.item"
                              v-bind:users="users"
                              v-on:updated="$emit('refreshProject')">
                </edit-project>
                <!--<delete-project v-bind:modal="getDeleteDialog(props.item.id)"
                              icon="delete"
                              v-bind:sensorInput="props.item"
                              v-bind:itemName="props.item.name"
                              v-on:delete="$emit('onDelete')">
                </delete-project>-->
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
        {
          text: 'Role',
          align: 'left',
          value: 'roleId'
        },
        { text: 'Actions', value: 'action', align: 'right' },
      ],
      projects: [],
      users: [],
      roles: [],
      editDialogs: [],
      pagination: {
        descending: false,
        rowsPerPage: 10,
        sortBy: 'id'
      },
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
      },
      getEditDialog(id){
        return this.getDialogsById(this.editDialogs, id);
      },
      /*getDeleteDialog(id){
        return this.getDialogsById(this.deleteDialogs, id);
      },*/
      getDialogsById(dialogs, id){
        var project = this.projects.filter(function (project){
          return project.id == id;
        })[0];

        var items = dialogs.filter(function (dialog){
          return dialog.id == id;
        });

        if(items.length == 0){
          var dialog = JSON.parse('{"id": "' + project.id+'", "dialog": {"dialog": false}}');
          dialogs.push(dialog);
        }else{
          var dialog = items[0];
        }
        return dialog.dialog;
      }
  }
};
</script>
