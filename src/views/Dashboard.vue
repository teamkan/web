<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>            
        <v-flex sm6 xs12>
          <mini-statistic
            icon="fa fa-list"
            title="3"
            sub-title="Projects"
            color="red"      
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
    userCount: 0
  }),
  computed: {
  },
  created: function() {
    UserService.getUsers() 
      .then(users => {
        this.userCount = users.length;
      });
  }
};
</script>
