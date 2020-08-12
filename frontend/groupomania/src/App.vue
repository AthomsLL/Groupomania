<template>
  <v-app>
    
      <router-view></router-view>

  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

  body, html {
    font-family: 'Roboto', sans-serif;
  }

  .v-application a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
  }

  .container {
    max-width: 900px !important;
  }

  .unfortunately {
        color: #F44336;
        font-size: 20px;
        font-weight: 500;
        margin-top: 20px;
        text-align: center;
    }
</style>
