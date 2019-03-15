<template>
  <div id="pageProjects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
          <v-flex xs12>     
              <list-projects></list-projects>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListProjects from '@/components/lists/ListProjects';
export default {
  components: {
    ListProjects,
  },
  data: () => ({
    selectedTab: 'tab-1',  
  }),
  computed: {
  },

};
</script>
