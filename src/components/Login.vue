<template>

  <form novalidate @submit.stop.prevent="showSnackbar = true">
    <div>

      <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Вход в аккаунт</div>
          </md-card-header>

          <md-card-content>
              <md-field md-clearable>
                  <label>Логин</label>
                  <md-input v-model="initial"></md-input>
              </md-field>
              <md-field>
                  <label>Пароль</label>
                  <md-input v-model="password" type="password"></md-input>
              </md-field>
          </md-card-content>

          <md-card-actions>
            <md-button class="md-primary" v-on:click="goNext">Вход</md-button>
          </md-card-actions>

        </md-ripple>
      </md-card>
    </div>
    
      <md-snackbar :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
        <span>Неправильно введен логин или пароль</span>
        <md-button class="md-primary" @click="goNext">Retry</md-button>
      </md-snackbar>
      <md-snackbar :md-duration="750" :md-active.sync="showGoodSnackbar" md-persistent>
        <span>Успешно</span>
      </md-snackbar>
  </form>
</template>

<script lang>
// import { Component, Vue } from 'vue-property-decorator'
export default {
  name: 'Login',
  props: {
  },
 data: () => ({
      initial: 'User user',
      password: 'mysecurepassword',
      showSnackbar: false,
      showGoodSnackbar: false,
    }),
  methods: {
    goNext: function (){
      if ((this.initial === "User") && (this.password === "password")){
        this.showSnackbar = false;
        this.showGoodSnackbar = true;
        window.location.href = 'main_page.html';
      }
      else {
        this.showSnackbar = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-field:last-child {
    margin-bottom: 40px;
  }
</style>
