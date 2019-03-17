<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout v-if="isAdmin" row wrap>        
        <v-flex sm6 xs12>
          <mini-statistic
            icon="fa fa-list"
            :title="projectCount"
            sub-title="Projects (total)"
            color="red darken-1"      
          >
          </mini-statistic>           
        </v-flex>
        <v-flex sm6 xs12>
          <mini-statistic
            icon="fa fa-users"
            v-bind:title="userCount"
            sub-title="Users"
            color="teal darken-2"
          >
          </mini-statistic>           
        </v-flex>           
      </v-layout>
      <v-layout row wrap>        
        <v-flex sm6 xs12>
          <mini-statistic
            icon="fa fa-list-alt"
            :title="userProjectCount"
            sub-title="User projects"
            color="blue darken-2"      
          >
          </mini-statistic>           
        </v-flex>           
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from '@/api';
import EChart from '@/components/chart/echart';
import MiniStatistic from '@/components/widgets/statistic/MiniStatistic';
import PlainTable from '@/components/widgets/list/PlainTable';
import Material from 'vuetify/es5/util/colors';
import BoxChart from '@/components/widgets/chart/BoxChart';
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';
import LinearStatistic from '@/components/widgets/statistic/LinearStatistic';

import UserService from '@/api/users'
import ProjectService from '@/api/projects'

export default {
  components: {
    MiniStatistic,
    EChart,
    BoxChart,
    CircleStatistic,
    LinearStatistic,
    PlainTable,
  },
  data: () => ({
    color: Material,
    selectedTab: 'tab-1',  
    userCount: 0,
    projectCount: 0,
    userProjectCount: 0,
    userId: JSON.parse(localStorage.getItem('user')).id
  }),
  computed: {
    isAdmin() {
      return localStorage.getItem('roleId') == 1;
    },
  },
  created: function() {
    ProjectService.getProjects() 
      .then(projects => {
        this.projectCount = projects.length;
      });
    UserService.getUsers() 
      .then(users => {
        this.userCount = users.length;
      });
    ProjectService.getUserProjects(this.userId)
      .then(projects => {
          this.userProjectCount = projects.length;
      })
  }
};
</script>
