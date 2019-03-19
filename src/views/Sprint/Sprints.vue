<template>
  <div id="page-User-Projects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Project</h3>
          <v-divider></v-divider>
        </v-flex>
        <v-flex sm12>
          <timeline :data="[['Washington', '1789-04-29', '1797-03-03'], ['Adams', '1797-03-03', '1801-03-03']]"></timeline>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [['Washington', '1789-04-29', '1797-03-03'], ['Adams', '1797-03-03', '1801-03-03']],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      },
      userProject: {},
    }
  }, 
  computed: {
  },
  created: function() {
  },
  methods: {
    /*getUserProject() {
      ProjectService.getUserProject(this.userId, this.id)
        .then(userProject => {
          this.userProject = userProject;
          this.projectLoaded = true;
        });
    }*/
  }
};
</script>
