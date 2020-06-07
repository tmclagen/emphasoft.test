<template>
  <div class="page_login">
    <form @submit.prevent="login" class="form form_login" action="https://emphasoft-test-assignment.herokuapp.com/api-token-auth/" method="POST">
      <h1>Login</h1>
      <div class="form_block">
        <p class="form_notification is-error" v-if="login_error">Guards, there's an intruder!</p>
      </div>
      <div class="form_block">
        <label class="form_input">
          <span class="form_input_title">Username</span>
          <input type="text" placeholder="i.e. rick_sanchez" v-model="username">
        </label>
      </div>
      <div class="form_block">
        <label class="form_input">
          <span class="form_input_title">Password</span>
          <input type="password" placeholder="secret key" v-model="password" name="password">
        </label>
      </div>
      <div class="form_block">
        <div class="bttn_group bttn_group-center">
          <button type="submit" class="bttn bttn-primary">Login</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      password: null,
      login_error: false
    }
  },
  methods: {
    login() {
      const authInfo = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch('login', authInfo)
        .then(() => {
          this.$router.push('/');
        })
        .catch(e => {
          if(e.status === 400)
          {
            this.login_error = true;
          }
        });
    }
  }
}
</script>

<style>
.page_login
{
  box-sizing: border-box;
  display: flex;
  width: 100%;
}
.form_login
{
  flex-shrink: 0;
  margin: auto;
  max-width: 350px;
  width: 100%;
}
</style>