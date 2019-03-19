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
                            <v-text-field label="Start date" v-model="sprint.startdate" type="date" required autocomplete="new-password"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <datepicker label="End date" v-model="sprint.enddate" name="end"></datepicker>
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
    loading: false
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
