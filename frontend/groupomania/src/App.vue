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
    max-width: 700px !important;
  }

  .unfortunately {
      color: #F44336;
      font-size: 20px;
      font-weight: 500;
      margin-top: 20px;
      text-align: center;
  }

  .user-header {
        border-bottom: 1px solid rgba(112,112,112, .5);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 10px;
    }

    .avatar {
        margin-top: 20px;
        margin-bottom: 5px;
    }

    .name {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .role {
        background-color: #707070;
        border-radius: 5px;
        color: #fff;
        font-weight: 500;
        padding: 5px 8px;
    }

    .cta {
        display: flex;
        justify-content: center !important;
    }

    .pointer {
      cursor: pointer;
    }
    
</style>
