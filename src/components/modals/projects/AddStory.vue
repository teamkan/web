<template>
  <v-dialog v-model="modal.dialog" persistent max-width="1000px">
    <v-btn outline color="green" slot="activator">
      Add story
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add story</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Title" v-model="story.title" required autocomplete="off" @change="checkStoryTitle"></v-text-field>
            </v-flex>
            <v-flex lg12 sm12>
              <v-textarea outline v-model="story.description" label="Description">

              </v-textarea>
            </v-flex>       
            <v-flex lg12 sm12>
              <v-textarea outline v-model="story.tests" label="Tests">

              </v-textarea>
            </v-flex>       
            <v-flex xs12>
                <v-select label="Priority" 
                          placeholder="Select priority"
                          :items="priorities"
                          item-text="name"
                          item-value="value"
                          v-model="story.priority"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field type="number" label="Business value" v-model="story.businessValue" required autocomplete="off"></v-text-field>
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
import StoryService from '@/api/stories';
import UserService from '@/api/users';

export default {
  props: {
    modal: Object,
    icon: String,
    roles: Array,
    projectId: Number
  },
  data: () => ({
    pass: false,
    story: {
      title: '',
      description: '',
      tests: '',
      businessValue: -1,
      priority: ''
    },
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
    save() {
      let title = this.story.title;
      let description = this.story.description;
      let tests = this.story.tests;
      let priority = this.story.priority;
      let businessValue = this.story.businessValue;
      if(!this.pass) {
        window.getApp.$emit('DISPLAY_SNACK', "Story title must be unique.", 'red');
        return;
      }

      if(title === '' || description === '' || tests === '' || priority === '' || businessValue == -1) {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }

      let story = {
        'title': title, 
        'description': description, 
        'tests': tests,
        'priority': priority, 
        'businessValue': businessValue,
        'projectId': this.projectId
      }

      StoryService.addStory(story)
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
      this.story.title = '';
      this.story.description = '';
      this.story.tests = '';
      this.story.priority = '';
      this.story.businessValue = -1;
    },
    checkStoryTitle: function() {
      StoryService.getStoryByTitle(this.projectId, this.story.title)
        .then(stories => {
          if(stories.length > 0) {
            this.pass = false;
            window.getApp.$emit('DISPLAY_SNACK', "Story title must be unique.", 'red');
          }
          else
            this.pass = true;
        });
    }
  }
};
</script>
