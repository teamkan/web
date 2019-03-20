<template>
    <v-card>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers"
                              :items="sprints"
                              :pagination.sync="pagination"
                              class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td> 
                          <div v-if="isCurrent(props.item)">
                            <v-badge color="green">
                              <v-icon slot="badge" dark small>check</v-icon>
                              <span>{{ props.item.name }}   </span>
                            </v-badge>
                          </div>
                          <div v-else>
                            {{ props.item.name }}
                          </div>
                        </td>
                        <td>{{ props.item.startdate.split('T')[0] }}</td>
                        <td>{{ props.item.enddate.split('T')[0] }}</td>
                        <td>{{ props.item.velocity }}</td>
                        <td class="text-xs-right">
                            <v-btn flat icon color="blue">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="red">
                                <v-icon>delete</v-icon>
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
import SprintService from '@/api/sprints'
import AddSprint from '@/components/modals/sprints/AddSprint';
import store from '@/store';
export default {
  components: {
    AddSprint
  },
  props: {
    currentSprint: Object
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
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Start date',
          align: 'left',
          value: 'start date'
        },
        {
          text: 'End date',
          align: 'left',
          value: 'end date'
        },
        {
          text: 'Velocity',
          align: 'left',
          value: 'velocity'
        },
        { text: 'Actions', value: 'action', align: 'right' },
      ],
      sprints: [],
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
      this.getSprints();
  },
  methods: {
    getSprints() {
      SprintService.getSprints()
        .then(sprints => {
          this.sprints = sprints;
        })
    },
    isCurrent: function(sprint) {
      return this.currentSprint.id == sprint.id;
    }
  }
};
</script>
