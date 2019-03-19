<template>
    <v-card>
        <v-toolbar card dense color="transparent">
            <v-toolbar-title><h4>Sprints</h4></v-toolbar-title>
            <v-spacer></v-spacer>
            <add-sprint v-bind:modal="addDialog"
                      icon="add"
                      v-on:added="getSprints">
            </add-sprint>

        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <template>
                <v-data-table :headers="headers"
                              :items="sprints"
                              :pagination.sync="pagination"
                              class="elevation-0">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.sprintname }}</td>
                        <td>{{ props.item.startdate }}</td>
                        <td>{{ props.item.enddate }}</td>
                        <td>{{ props.item.speed }}</td>
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
          text: 'Sprint name',
          align: 'left',
          value: 'sprint name'
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
          text: 'Speed',
          align: 'left',
          value: 'speed'
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
  }
};
</script>
