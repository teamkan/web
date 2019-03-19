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
                      :items="userProjects"
                      :pagination.sync="pagination"
                      class="elevation-0">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.project.id }}</td>
            <td>{{ props.item.project.name }}</td>
            <td>{{ projectRole(props.item.roleId) }}</td>
            <td class="text-xs-right">
              <v-btn flat icon color="teal darken-2" @click.native="openProject(props.item.project.id)">
                <v-icon>search</v-icon>
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
        {
          text: 'Role',
          align: 'left',
          value: 'roleId'
        },
        { text: 'Actions', value: 'action', align: 'right' },
      ],
      userProjects: [],
      roles: [],
      pagination: {
        descending: false,
        rowsPerPage: 10,
        sortBy: 'id'
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
      projectRole(role) {
        const roleLbl = role == 'project_owner' ? 'Product owner' : role == 'scrum_master' ? 'Scrum master' : role == 'developer' ? 'Developer' : 'Standard';
        return roleLbl;
      },
      openProject(projectId) {
        this.$router.push({name: 'Project', params: {id: projectId}});
      },
      getUserProjects: function() {
        ProjectService.getUserProjects(this.userId)
          .then(projects => this.userProjects = projects);
      },
  }
};
</script>
