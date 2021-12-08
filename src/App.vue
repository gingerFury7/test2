<template>
  <form novalidate @submit.stop.prevent="showSnackbar = true">
    <div id="app">
      <img alt="Vue logo" src="@/assets/logo.png">
    </div>
    <div id="card">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">Вход в аккаунт</div>
          </md-card-header>

          <md-card-content>
              <md-field md-clearable>
                  <label>Логин</label>
                  <md-input v-model="initial" v-on:keyup.enter="goNext"></md-input>
              </md-field>
              <md-field>
                  <label>Пароль</label>
                  <md-input v-model="password" type="password" v-on:keyup.enter="goNext"></md-input>
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


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
@Component
class Login extends Vue {
  private initial: String = "User user";
  private password: String = 'mysecurepassword';
  private showSnackbar: Boolean = false;
  private showGoodSnackbar: Boolean = false;

  public goNext(): void {
    if ((this.initial === "User") && (this.password === "password")){
      this.showSnackbar = false;
      this.showGoodSnackbar = true;
      window.location.href = 'main_page.html';
    }
    else{
      this.showSnackbar = true;
    }
  }
}

export default Login
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#card {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.md-card {
    width: 320px;
    margin: 5px;
    display: inline-block;
    vertical-align: top;
  }
  .md-field{
    margin-bottom: 10px;
    width: 285px;
  }
</style>
