<template>
  <div id="pageUsers">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
          <v-flex xs12>     
              <list-users></list-users>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ListUsers from '@/components/lists/ListUsers';
export default {
  components: {
    ListUsers,
  },
  data: () => ({
    selectedTab: 'tab-1',  
  }),
  computed: {
  },

};
</script>
