<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Users</h4></v-toolbar-title>
      <v-spacer></v-spacer>
        <add-user v-bind:modal="addDialog"
                  icon="add"
                  v-on:added="getUsers"
                  v-bind:roles="roles">
        </add-user>

    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers"
                      :items="users"
                      :pagination.sync="pagination"
                      class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.username }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.firstname }}</td>
            <td>{{ props.item.lastname }}</td>
            <td>{{ props.item.role.name }}</td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import UserService from '@/api/users'
import RoleService from '@/api/roles'
import AddUser from '@/components/modals/users/AddUser';
import store from '@/store';
export default {
  components: {
    AddUser
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
          text: 'Username',
          align: 'left',
          value: 'username'
        },
        {
          text: 'Email',
          align: 'left',
          value: 'email'
        },
        {
          text: 'Firstname',
          align: 'left',
          value: 'firstname'
        },
        {
          text: 'Lastname',
          align: 'left',
          value: 'lastname'
        },
        {
          text: 'Role',
          align: 'left',
          value: 'rolename'
        },
      ],
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
      this.getUsers();
      this.getRoles();
  },
  methods: {
      getUsers() {
        UserService.getUsers()
            .then(users => {
                this.users = users;
            })
      },
      getRoles() {
        RoleService.getRoles()
          .then(roles => {
            this.roles = roles;
          });
      }
  }
};
</script>
