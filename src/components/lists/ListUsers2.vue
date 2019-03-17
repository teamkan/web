<!--<td>
              <v-flex xs12>
                <v-select   label="Role" 
                            placeholder="Select role"
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            v-model="user.roleId"></v-select>
              </v-flex>
            </td>-->

<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Users</h4></v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers"
                      v-model="selected"
                      :items="users"
                      select-all
                      :pagination.sync="pagination"
                      class="elevation-0">

          <template v-slot:headers="props">
                <tr>
                  <th>
                    <v-checkbox
                      :input-value="props.all"
                      :indeterminate="props.indeterminate"
                      primary
                      hide-details
                      @click.stop="toggleAll"
                    ></v-checkbox>
                  </th>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                    @click="changeSort(header.value)"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
          </template>
          <template v-slot:items="props">
             <tr :active="props.selected" @click="props.selected = !props.selected">
              <td>
                <v-checkbox
                  :input-value="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
                </td>
              <td>{{ props.item.firstname }}</td>
              <td>{{ props.item.lastname }}</td>
              <td class="text-xs-right">
                <v-select placeholder="Select role"
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            v-bind:class="{required: isRequired}" 
                            v-model="userproject.roleId">
                </v-select>
                </td>
              </tr>
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
      isRequired: true,
      pagination: {
        sortBy: 'name'
      },
      headers: [
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
          align: 'left'
        },
      ],
      users: [],
      userproject:{
        userId: -1, 
        projectId: -1, 
        roleId: -1, 
      },
      roles: [],
      selected: [],
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
      },
       toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      save() {
      let userId = this.selected.users.userId;
      let projectId = 1;
      let roleId = this.userproject.roleId;

      let userproject = {
        'userId': userId, 
        'projectId': projectId, 
        'roleId': roleId, 
      }

      ProjectService.assignUserToProject(project)
        .then(resp => {
          this.$emit('added');
        })
        .catch(err => {
          window.getApp.$emit('DISPLAY_SNACK', err.response.data.msg, 'red');
        }); 
        
    },
  }
};
</script>
