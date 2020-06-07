<template>
  <div class="page_user">
    <app-header v-if="$store.getters.isAuthenticated"/>
    <h1>{{ username_old ? 'User: ' + username_old : 'New user' }}</h1>
    <form @submit.prevent="saveUser" class="form form_user" action="https://emphasoft-test-assignment.herokuapp.com/api/v1/users/" method="POST">
      <div class="form_block">
        <label class="form_input" :class="{'is-error': username_error}">
          <span class="form_input_title">Username</span>
          <input type="text" placeholder="i.e. rick_sanchez" v-model="username">
          <span class="form_input_error" v-show="username_error == 'pattern'">Letters, digits and @.+-_ only.</span>
          <span class="form_input_error" v-show="username_error == 'limit_min'">Requires at least {{ username_validation.min }} character.</span>
          <span class="form_input_error" v-show="username_error == 'limit_max'">The limit of {{ username_validation.max }} characters has been exceeded.</span>
        </label>
      </div>
      <div class="form_block">
        <label class="form_input">
          <span class="form_input_title">First name</span>
          <input type="text" placeholder="Rick" v-model="first_name">
        </label>
      </div>
      <div class="form_block">
        <label class="form_input">
          <span class="form_input_title">Last name</span>
          <input type="text" placeholder="Sanchez" v-model="last_name">
        </label>
      </div>
      <div class="form_block">
        <label class="form_input" :class="{'is-error': password_error}">
          <span class="form_input_title">Password</span>
          <input type="password" placeholder="Secret key" v-model="new_password" name="new_password" autocomplete="new-password">
          <span class="form_input_error" v-show="password_error == 'pattern'">At least 1 uppercase letter, 1 lowercase letter and 1 digit.</span>
          <span class="form_input_error" v-show="password_error == 'limit_min'">Requires at least {{ password_validation.min }} characters.</span>
          <span class="form_input_error" v-show="password_error == 'limit_max'">The limit of {{ password_validation.max }} characters has been exceeded.</span>
        </label>
      </div>
      <div class="form_block">
        <label class="form_input" :class="{'is-error': password_compare_error}">
          <span class="form_input_title">Repeat password</span>
          <input type="password" placeholder="Repeat secret key" v-model="repeat_password">
          <span class="form_input_error" v-show="password_compare_error">Passwords don't match.</span>
        </label>
      </div>
      <div class="form_block">
        <div class="bttn_group bttn_group-center">
          <button type="submit" class="bttn bttn-primary">{{ username_old ? 'Save changes' : 'Create' }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'

export default {
  data() {
    return {
      username_old: '',
      username: '',
      first_name: '',
      last_name: '',
      new_password: '',
      repeat_password: '',
      is_active: true,
      username_validation: {
        pattern: /^[\w.@+-]+$/,
        min: 1,
        max: 150
      },
      username_error: false,
      password_validation: {
        pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        min: 8,
        max: 128
      },
      password_error: false,
      password_compare_error: false
    }
  },
  created() {
    if(this.id)
    {
      const userId = this.id;
      this.$http({
        url: `https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${userId}/`,
        method: 'get'
      })
      .then( ({data}) => {
        this.username_old = data.username;
        this.username = data.username;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.is_active = data.is_active;
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  methods: {
    usernameCheck() {
      this.username_error = false;
      if(this.username.length < this.username_validation.min)
      {
        this.username_error = 'limit_min';
        return;
      }
      if(this.username.length > this.username_validation.max)
      {
        this.username_error = 'limit_max';
        return;
      }
      if(!this.username_validation.pattern.test(this.username))
      {
        this.username_error = 'pattern';
        return;
      }
    },
    passwordCheck() {
      this.password_error = false;
      if(this.new_password.length < this.password_validation.min)
      {
        this.password_error = 'limit_min';
        return;
      }
      if(this.new_password.length > this.password_validation.max)
      {
        this.password_error = 'limit_max';
        return;
      }
      if(!this.password_validation.pattern.test(this.new_password))
      {
        this.password_error = 'pattern';
        return;
      }
    },
    passwordsCompare() {
      this.password_compare_error = false;
      if(this.new_password !== this.repeat_password)
      {
        this.password_compare_error = true;
      }
    },
    saveUser() {
      const user = {
        username: this.username,
        first_name: this.first_name,
        last_name: this.last_name,
        password: this.new_password,
        is_active: this.is_active
      }
      this.usernameCheck();
      this.passwordCheck();
      this.passwordsCompare();

      if(this.username_error || this.password_error || this.password_compare_error)
      {
        return;
      }

      // if user ID provided, then save changes to the current user
      const userId = this.id;
      let method, url, notificationType;
      if(userId)
      {
        url = `https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${userId}/`;
        method = 'patch';
        notificationType = 'notificationUserEdited';
      }
      // otherwise create brand new user
      else
      {
        url = 'https://emphasoft-test-assignment.herokuapp.com/api/v1/users/';
        method = 'post';
        notificationType = 'notificationUserNew';
      }

      this.$http({
        url,
        method,
        data: user
      })
      .then( response => {
        this.$store.dispatch(notificationType);
        this.$router.push({name: 'Users'});
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  props: ['id'],
  components: {
    AppHeader
  }
}
</script>

<style>
.page_user
{
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
}
.page_user h1
{
  margin-bottom: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form_user
{
  flex-shrink: 0;
  margin: auto;
  max-width: 350px;
  width: 100%;
}
</style>