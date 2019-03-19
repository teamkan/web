<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
    </v-toolbar-title>
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          {{  username }}
        </v-btn>   
      </v-toolbar-items>
      <v-btn icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
  </v-toolbar>
</template>
<script>
import store from '@/store';
export default {
  name: 'app-toolbar',
  components: {
  },
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
    username() {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user)
        return user.username
      
      return '';
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
          window.getApp.$emit('DISPLAY_SNACK', 'Successfully logged out.', 'green');
        })
    }
  }
};
</script>
