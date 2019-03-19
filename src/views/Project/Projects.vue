<template>
  <div id="page-User-Projects">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
          <v-flex xs12>     
              <list-user-projects></list-user-projects>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListUserProjects from '@/components/lists/ListUserProjects';
export default {
  components: {
    ListUserProjects,
  },
  data: () => ({
    selectedTab: 'tab-1',  
  }),
  computed: {
  },

};
</script>
