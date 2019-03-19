<template>
  <v-dialog v-model="modal.dialog" persistent max-width="1000px">
    <v-card>
      <v-card-title>
        <span class="headline">View story: {{ story.title }}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Title" v-model="story.title" required autocomplete="off" readonly></v-text-field>
            </v-flex>
            <v-flex lg12 sm12>
              <v-textarea outline v-model="story.description" label="Description" readonly>

              </v-textarea>
            </v-flex>       
            <v-flex lg12 sm12>
              <v-textarea outline v-model="story.tests" label="Tests" readonly>

              </v-textarea>
            </v-flex>       
            <v-flex xs12>
                <v-select label="Priority" 
                          placeholder="Select priority"
                          :items="priorities"
                          item-text="name"
                          item-value="value"
                          v-model="story.priority"
                          readonly></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="number" label="Business value" v-model="story.businessValue" required autocomplete="off" readonly></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" flat @click.native="close" :disabled="loading">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  
</template>

<script>
import StoryService from '@/api/stories';
import UserService from '@/api/users';

export default {
  props: {
    modal: Object,
    icon: String,
    roles: Array,
    projectId: Number,
    story: Object
  },
  data: () => ({
    pass: false,
    
    priorities: [
      {
        value: 'must_have',
        name: 'Must have'
      },{
        value: 'should_have',
        name: 'Should have'
      },{
        value: 'could_have',
        name: 'Could have'
      },{
        value: 'wont_have',
        name: "Won't have this time"
      }
    ],
    loading: false
  }),
  methods: {
    close() {
      this.modal.dialog = false;
    },
  }
};
</script>
