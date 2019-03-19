<template>
    <v-dialog v-model="modal.dialog" persistent max-width="800px">
        <v-btn flat icon color="green" slot="activator">
            <v-icon>{{ icon }}</v-icon>
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
                            <v-text-field label="Sprint name" v-model="sprint.sprintname" required autocomplete="off"></v-text-field>
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
                            <v-text-field placeholder="Speed" v-model="sprint.speed" required autocomplete="off"></v-text-field>
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
  },
  data: () => ({
    sprint: {
      sprintname: '',
      startdate: '',
      enddate: '',
      speed: '',
    },
    loading: false,
    startMenu: false,
    endMenu: false,
  }),
  methods: {
    save() {
      this.loading = true;
      let sprintname = this.sprint.sprintname;
      let startdate = this.sprint.startdate;
      let enddate = this.sprint.enddate;
      let speed = this.sprint.speed;

      if (sprintname === '' || startdate === '' || enddate === '' || speed === '') {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }

      if (enddate < startdate) {
        window.getApp.$emit('DISPLAY_SNACK', "End date must be after start date.", 'red');
        return;
      }

      let sprint = {
        'sprintname': sprintname,
        'startdate': startdate,
        'enddatte': enddate,
        'speed': speed,
      }

      SprintService.createSprint(sprint)
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
      this.sprint.sprintname = '';
      this.sprint.startdate = '';
      this.sprint.enddate = '';
      this.sprint.speed = '';
    }
  }
};
</script>
