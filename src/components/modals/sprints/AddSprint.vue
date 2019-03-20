<template>
    <v-dialog v-model="modal.dialog" persistent max-width="800px">
        <v-btn outline color="green" slot="activator">
          Add sprint
        </v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Add sprint</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Sprint name" v-model="sprint.name" required autocomplete="off" @change="checkName"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-menu ref="startMenu"
                                  lazy
                                  :close-on-content-click="false"
                                  v-model="startMenu"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  :nudge-right="40"
                                  min-width="290px"
                                  :return-value.sync="sprint.startDate">
                            <v-text-field slot="activator"
                                          label="Start date"
                                          v-model="sprint.startDate"
                                          prepend-icon="event"
                                          readonly>
                              </v-text-field>
                            <v-date-picker v-model="sprint.startDate" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.startMenu.save(sprint.startDate)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs12>
                          <v-menu ref="endMenu"
                                  lazy
                                  :close-on-content-click="false"
                                  v-model="endMenu"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  :nudge-right="40"
                                  min-width="290px"
                                  :return-value.sync="sprint.endDate">
                            <v-text-field slot="activator"
                                          label="End date"
                                          v-model="sprint.endDate"
                                          prepend-icon="event"
                                          readonly>
                              </v-text-field>
                            <v-date-picker v-model="sprint.endDate" no-title scrollable>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="endMenu = false">Cancel</v-btn>
                              <v-btn flat color="primary" @click="$refs.endMenu.save(sprint.endDate)">OK</v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field type="number" label="Velocity" v-model="sprint.velocity" required autocomplete="off"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" flat @click.native="close" :disabled="loading">Close</v-btn>
                <v-btn color="green" flat @click.native="save" :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import SprintService from '@/api/sprints';

export default {
  props: {
    modal: Object,
    icon: String,
    roles: Array,
    projectId: Number
  },
  data: () => ({
    sprint: {
      name: '',
      startDate: '',
      endDate: '',
      velocity: 0,
    },
    loading: false,
    startMenu: false,
    endMenu: false,
    pass: true
  }),
  methods: {
    async save() {
      let name = this.sprint.name;
      let startdate = this.sprint.startDate;
      let enddate = this.sprint.endDate;
      let velocity = this.sprint.velocity;

      if (name === '' || startdate === '' || enddate === '' || velocity === '') {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }
      
      if(!this.pass) {
        window.getApp.$emit('DISPLAY_SNACK', "Sprint name must be unique for this project.", 'red');
        return;
      }

      if (new Date(enddate).getTime() < new Date(startdate).getTime()) {
        window.getApp.$emit('DISPLAY_SNACK', "Sprint can not finish before it starts.", 'red');
        return;
      }

      const currentDate = new Date();
      if (new Date(enddate).getTime() < currentDate.getTime() || new Date(startdate).getTime() < currentDate.getTime()) {
        window.getApp.$emit('DISPLAY_SNACK', "Sprint can not be in the past.", 'red');
        return;
      }

      this.loading = true;
      let sprint = {
        'name': name,
        'startdate': startdate,
        'enddate': enddate,
        'velocity': velocity,
        'projectId': this.projectId
      }

      SprintService.addSprint(sprint)
        .then(resp => {
          this.loading = false;
          this.clearFields();

          this.$emit('added');
          this.modal.dialog = false;
        })
        .catch(err => {
          this.loading = false;
          window.getApp.$emit('DISPLAY_SNACK', err.response.data.msg, 'red');
        });

    },
    close() {
      this.clearFields();
      this.modal.dialog = false;
    },
    clearFields() {
      this.sprint.name = '';
      this.sprint.startDate = '';
      this.sprint.endDate = '';
      this.sprint.velocity = 0;
      this.pass = false;
    },
    checkName: async function() {
      await SprintService.getSprintByName(this.projectId, this.sprint.name) 
        .then(sprints => {
          console.log(sprints);
          if(sprints.length > 0) {
            window.getApp.$emit('DISPLAY_SNACK', "Sprint name must be unique for this project.", 'red');
            this.pass = false;
            return true;
          }
          else
            this.pass = true;
            return false;
        });
    }
  }
};
</script>
