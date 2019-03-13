<template>
  <v-dialog v-model="modal.dialog" persistent max-width="800px">
    <v-btn flat icon color="green" slot="activator">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add user</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Username" v-model="user.username" required autocomplete="off"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" v-model="user.password" type="password" required autocomplete="new-password"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Confirm password" v-model="user.password2" type="password" required  autocomplete="new-password"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email" v-model="user.email" type="mail" required autocomplete="off"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Firstname" v-model="user.firstname" required autocomplete="off"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Lastname" v-model="user.lastname" required autocomplete="off"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-select   label="Role" 
                            placeholder="Select role"
                            :items="roles"
                            item-text="name"
                            item-value="id"
                            v-model="user.roleId"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" flat @click.native="close" :disabled="loading">Close</v-btn>
        <v-btn color="green" flat @click.native="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>  
</template>

<script>
import UserService from '@/api/users';

export default {
  props: {
    modal: Object,
    icon: String,
    roles: Array,
  },
  data: () => ({
    user: {
      username: '',
      password: '',
      password2: '',
      email: '',
      firstname: '',
      lastname: '',
      roleId: -1,
    },
    loading: false
  }),
  methods: {
    save() {
      this.loading = true;
      let username = this.user.username;
      let password = this.user.password;
      let password2 = this.user.password2;
      let email = this.user.email;
      let firstname = this.user.firstname;
      let lastname = this.user.lastname;
      let roleId = this.user.roleId;

      if(username === '' || password === '' || password2 === '' || email === '' || firstname === '' || lastname === '') {
        window.getApp.$emit('DISPLAY_SNACK', "All fields must be provided.", 'red');
        return;
      }

      if(password !== password2) {
        window.getApp.$emit('DISPLAY_SNACK', "Passwords must match.", 'red');
        return;
      }

      if(roleId === -1) {
        window.getApp.$emit('DISPLAY_SNACK', "Role must be selected.", 'red');
        return;
      }

      let user = {
        'username': username, 
        'password': password, 
        'password2': password2,
        'email': email, 
        'firstname': firstname,
        'lastname': lastname,   
        'roleId': roleId,   
      }

      UserService.addUser(user)
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
      this.user.username = '';
      this.user.password = '';
      this.user.password2 = '';
      this.user.email = '';
      this.user.firstname = '';
      this.user.lastname = '';
      this.user.roleId = -1;
    }
  }
};
</script>
