<template>
 <div id="page-steppers">
  <v-dialog v-model="modal.dialog" persistent max-width="900px">
    <v-btn flat icon color="green" slot="activator">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
     <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-subheader>Create project</v-subheader>
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step step="1" editable :complete="step > 1">Project name</v-stepper-step>
              <v-divider> </v-divider>
              <v-stepper-step step="2" editable :complete="step > 2">Select users and role</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                        <v-text-field label="Project name" v-model="project.name" required autocomplete="off"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn color="primary" flat @click.native="save">Continue</v-btn>
                <v-btn flat @click.native="close">Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-container grid-list-xl fluid>
                    <v-layout row wrap>
                        <v-flex xs12>     
                            <list-users></list-users>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                <v-btn flat @click.native="close">Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
</v-container>
  </v-dialog>  
  </div>
</template>

<script>

import VWidget from '@/components/VWidget';
import ProjectService from '@/api/projects';
import ListUsers from '@/components/lists/ListUsers2';

export default {
  components: {
    VWidget,
    ListUsers
  },
  data () {
    return {
      step: 1,
    }
  },
  computed: {
  },  
  props: {
    modal: Object,
    icon: String,
    roles: Array,
  },
  data: () => ({
    selectedTab: 'tab-1',
    user: {
      firstname: '',
      lastname: '',
      roleId: -1,
    },
    project:{
        name: ''
    },
  }),
  methods: {
      save() {
      let name = this.project.name;

      if(name === '') {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }

      let project = {
        'name': name, 
      }

      ProjectService.addProject(project)
        .then(resp => {
          this.clearFields();
          step = 2;

          this.$emit('added');
          
        })
        .catch(err => {
          window.getApp.$emit('DISPLAY_SNACK', err.response.data.msg, 'red');
        }); 
        
    },
    close() {
      this.clearFields();
      this.modal.dialog = false;
    },
    clearFields() {
      this.project.name = '';
    },
  }
};
</script>
