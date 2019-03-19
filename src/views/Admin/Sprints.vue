<template>
    <div id="pageSprints">
        <v-container grid-list-xl fluid>
            <v-layout row wrap>
                <v-flex xs12>
                    <list-sprints></list-sprints>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ListSprints from '@/components/lists/admin/ListSprints';
import Datepicker from 'vuejs-datepicker';
export default {
  components: {
      ListSprints,
      Datepicker
  },
  data: () => ({
    selectedTab: 'tab-1',
  }),
  computed: {
  },

};
</script>
