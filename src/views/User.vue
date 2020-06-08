<template>
  <div class="page_user">
    <app-header v-if="$store.getters.isAuthenticated"/>
    <h1 v-if="!load_error">{{ username_old ? 'User: ' + username_old : 'New user' }}</h1>
    <form @submit.prevent="saveUser" class="form form_user" action="https://emphasoft-test-assignment.herokuapp.com/api/v1/users/" method="POST">
      <div class="form_block" v-if="load_error">
        <p class="form_notification is-error">{{ load_error }}</p>
      </div>
      <div class="form_block" v-if="save_error">
        <p class="form_notification is-error">{{ save_error }}</p>
      </div>
      <div class="form_block" v-if="!load_error">
        <div class="form_block">
          <label class="form_input" :class="{'is-error': username_error}">
            <span class="form_input_title">Username</span>
            <input type="text" placeholder="i.e. rick_sanchez" v-model="username">
            <span class="form_input_error" v-show="username_error">{{ username_error }}</span>
          </label>
        </div>
        <div class="form_block">
          <label class="form_input" :class="{'is-error': first_name_error}">
            <span class="form_input_title">First name</span>
            <input type="text" placeholder="Rick" v-model="first_name">
            <span class="form_input_error" v-show="first_name_error">{{ first_name_error }}</span>
          </label>
        </div>
        <div class="form_block">
          <label class="form_input" :class="{'is-error': last_name_error}">
            <span class="form_input_title">Last name</span>
            <input type="text" placeholder="Sanchez" v-model="last_name">
            <span class="form_input_error" v-show="last_name_error">{{ last_name_error }}</span>
          </label>
        </div>
        <div class="form_block">
          <label class="form_input" :class="{'is-error': password_error}">
            <span class="form_input_title">Password</span>
            <input type="password" placeholder="Secret key" v-model="new_password" name="new_password" autocomplete="new-password">
            <span class="form_input_error" v-show="password_error">{{ password_error }}</span>
          </label>
        </div>
        <div class="form_block">
          <label class="form_input" :class="{'is-error': password_compare_error}">
            <span class="form_input_title">Repeat password</span>
            <input type="password" placeholder="Repeat secret key" v-model="repeat_password">
            <span class="form_input_error" v-show="password_compare_error">{{ password_compare_error }}</span>
          </label>
        </div>
        <div class="form_block">
          <div class="bttn_group bttn_group-center">
            <button type="submit" class="bttn bttn-primary">{{ username_old ? 'Save changes' : 'Create' }}</button>
          </div>
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
      first_name_validation: {
        max: 30
      },
      first_name_error: false,
      last_name_validation: {
        max: 150
      },
      last_name_error: false,
      password_compare_error: false,
      load_error: false,
      save_error: false
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
        this.load_error = e;
      })
    }
  },
  methods: {
    usernameCheck() {
      this.username_error = false;
      if(this.username.length < this.username_validation.min)
      {
        this.username_error = `Requires at least ${this.username_validation.min} character.`;
        return;
      }
      if(this.username.length > this.username_validation.max)
      {
        this.username_error = `The limit of ${this.username_validation.max} characters has been exceeded.`;
        return;
      }
      if(!this.username_validation.pattern.test(this.username))
      {
        this.username_error = 'Letters, digits and @.+-_ only.';
        return;
      }
    },
    passwordCheck() {
      this.password_error = false;
      if(this.new_password.length < this.password_validation.min)
      {
        this.password_error = `Requires at least ${this.password_validation.min} characters.`;
        return;
      }
      if(this.new_password.length > this.password_validation.max)
      {
        this.password_error = `The limit of ${this.password_validation.max} characters has been exceeded.`;
        return;
      }
      if(!this.password_validation.pattern.test(this.new_password))
      {
        this.password_error = 'At least 1 uppercase letter, 1 lowercase letter and 1 digit.';
        return;
      }
    },
    passwordsCompare() {
      this.password_compare_error = false;
      if(this.new_password !== this.repeat_password)
      {
        this.password_compare_error = "Passwords don't match";
      }
    },
    firstNameCheck() {
      this.first_name_error = false;
      if(this.first_name.length > this.first_name_validation.max)
      {
        this.first_name_error = `The limit of ${this.first_name_validation.max} characters has been exceeded.`;
        return;
      }
    },
    lastNameCheck() {
      this.last_name_error = false;
      if(this.last_name.length > this.last_name_validation.max)
      {
        this.last_name_error = `The limit of ${this.last_name_validation.max} characters has been exceeded.`;
        return;
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
      this.firstNameCheck();
      this.lastNameCheck();
      this.passwordCheck();
      this.passwordsCompare();

      if(this.username_error || this.password_error || this.password_compare_error || this.first_name_error || this.last_name_error)
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
        this.save_error = e;
        document.getElementById('app').scrollIntoView();
      });
    }
  },
  props: ['id'],
  components: {
    AppHeader
  },
  beforeRouteEnter (to, from, next) {
    // Prevent entering the page, so you can't edit super user
    if(to.params.id == 1)
    {
      next('/');
    }
    next();
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