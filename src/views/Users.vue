<template>
  <div class="page_users">
    <app-header v-if="$store.getters.isAuthenticated"/>
    <h1>Users</h1>
    <transition name="slide-fade">
      <p @click="closeNotificationUser" class="form_notification form_notification_user is-success" v-if="notificationUser">{{ notificationUser }}</p>
    </transition>
    <p class="form_notification is-error" v-if="load_error">{{ load_error }}</p>
    <p class="form_notification is-error" v-if="user_delete_error">{{ user_delete_error }}</p>
    <div class="users_filters" v-if="!load_error">
      <button @click="switchSortById" class="users_filters_id" :class="['is-' + this.sortById[this.sortByIdCurrent]]">
        ID
        <app-icon icon="iosArrowDown"></app-icon>
      </button>
      <label class="form_input users_filters_search">
        <input ref="inputSearch" placeholder="Search by username, first name or last name..." v-model="userSearch">
        <button class="users_filters_search_clear" @click="clearSearch" v-show="userSearch">
          <app-icon icon="mdClose"></app-icon>
        </button>
      </label>
    </div>
    <table class="users" :class="{'is-sorting': isSorting}" v-if="!load_error">
      <thead>
        <th class="users_col users_item_id users_sortById">
          <button @click="switchSortById" :class="['is-' + this.sortById[this.sortByIdCurrent]]">
            ID
            <app-icon icon="iosArrowDown"></app-icon>
          </button>
        </th>
        <th class="users_col users_item_username">Username</th>
        <th class="users_col users_item_firstName">First Name</th>
        <th class="users_col users_item_lastName">Last Name</th>
        <th class="users_col users_item_bttn_wrap"></th>
        <th class="users_col users_item_bttn_wrap"></th>
      </thead>
      <tbody>
        <transition-group name="users_item">
          <tr class="users_item" :key="user.id" v-for="user in usersSorted" v-if="user.is_active">
            <td class="users_col users_item_id" data-title="ID">{{ user.id }}</td>
            <td class="users_col users_item_username" data-title="Username">
              <span class="users_col_text">{{ user.username }}</span>
            </td>
            <td class="users_col users_item_firstName" data-title="First Name">
              <span class="users_col_text">{{ user.first_name }}</span>
            </td>
            <td class="users_col users_item_lastName" data-title="Last Name">
              <span class="users_col_text">{{ user.last_name }}</span>
            </td>
            <td class="users_col users_item_bttn_wrap" v-if="user.id !== 1">
              <router-link class="users_item_bttn users_item_bttn_edit" :to="{name: 'User', params: {id: user.id}}">
                <app-icon icon="mdCreate"></app-icon>
              </router-link>
            </td>
            <td class="users_col users_item_bttn_wrap" v-if="user.id !== 1">
              <button class="users_item_bttn users_item_bttn_delete" @click="deleteUser(user)">
                <app-icon icon="mdClose"></app-icon>
              </button>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppIcon from '@/components/Icons.vue'

export default {
  created() {
    this.$http({
      url: 'https://emphasoft-test-assignment.herokuapp.com/api/v1/users/',
      method: 'get',
    })
    .then(response => {
      this.users = response.data;
    })
    .catch(e => {
      this.load_error = e;
    })
  },
  mounted() {
    if(this.notificationUser)
    {
      setTimeout(() => {
        this.closeNotificationUser();
      }, 5000)
    }
  },
  data() {
    return {
      users: null,
      sortById: [null, 'asc', 'desc'],
      sortByIdCurrent: 1,
      userSearch: null,
      isSorting: false,
      load_error: false,
      user_delete_error: false
    }
  },
  computed: {
    usersFiltered() {
      this.isSorting = true;
      if(!this.userSearch)
      {
        return this.users; // return without filter if the search field is empty
      }
      const filterText = new RegExp(this.userSearch, "i");
      return this.users.filter(item => {
        if(filterText.test(item.username) || filterText.test(item.first_name) || filterText.test(item.last_name))
        {
          return item;
        }
      });
    },
    usersSorted() {
      if(!this.users)
      {
        return;
      }

      const users = [...this.usersFiltered];
      switch(this.sortById[this.sortByIdCurrent])
      {
        case 'asc':
          return users.sort((a, b) => a.id - b.id);
        break;

        case 'desc':
          return users.sort((a, b) => b.id - a.id);
        break;

        default:
          return users;
        break;
      }
    },
    notificationUser() {
      return this.$store.state.notificationUser;
    }
  },
  methods: {
    switchSortById() {
      this.isSorting = true;
      this.sortByIdCurrent++;
      if(this.sortByIdCurrent >= this.sortById.length)
      {
        this.sortByIdCurrent = 0;
      }
    },
    clearSearch() {
      this.userSearch = null;
      this.$refs.inputSearch.focus();
    },
    deleteUser(user) {
      this.isSorting = false;

      this.$http({
        url: `https://emphasoft-test-assignment.herokuapp.com/api/v1/users/${user.id}/`,
        method: 'patch',
        data: {
          is_active: false
        }
      })
      .then(response => {
        const userIndex = this.users.indexOf(user);
        this.users.splice(userIndex, 1);
      })
      .catch(e => {
        this.user_delete_error = e;
        document.getElementById('app').scrollIntoView();
      })
    },
    closeNotificationUser() {
      this.$store.dispatch('closeNotificationUser');
    }
  },
  components: {
    AppHeader,
    AppIcon
  }
}
</script>

<style>
.page_users
{
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
}
.page_users .form_notification
{
  margin-top: 30px;
}
.page_users .form_notification_user
{
  bottom: 30px;
  cursor: pointer;
  justify-content: center;
  left: 0;
  margin: 0 auto;
  max-width: 600px;
  position: fixed;
  right: 0;
  width: calc(100% - 60px);
  z-index: 2;
}
.slide-fade-enter-active,
.slide-fade-leave-active
{
  transition: .175s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateY(100%);
  opacity: 0;
}

.users_filters
{
  display: flex;
  margin-top: 30px;
}
.users_filters_search
{
  position: relative;
  width: 100%;
}
.users_filters_search_clear
{
  appearance: none;
  background: none;
  border: none;
  bottom: 0;
  cursor: pointer;
  height: 44px;
  margin: auto 0;
  opacity: .25;
  outline: none;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
  transition: 75ms ease-out;
  width: 44px;
}
.users_filters_search_clear:hover,
.users_filters_search_clear:focus
{
  opacity: .6;
}
.users_filters_search_clear svg
{
  height: 100%;
  width: 100%;
}
.users_filters_id
{
  align-items: center;
  appearance: none;
  background: var(--color-accent);
  border: none;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  display: none;
  font: inherit;
  margin-right: 10px;
  outline: none;
  padding: 0 15px;
  width: 70px;
}
.users_filters_id:hover,
.users_filters_id:focus
{
  background-color: var(--color-accent-down);
}
.users_filters_id svg
{
  fill: currentColor;
  height: 16px;
  margin-left: 5px;
  transition: 75ms ease-out;
  width: 16px;
}
.users_filters_id.is-null svg
{
  opacity: 0;
}
.users_filters_id.is-asc svg
{
  opacity: 1;
  transform: scale(1, -1);
}
.users_filters_id.is-desc svg
{
  opacity: 1;
}

.users
{
  margin-top: 30px;
  position: relative;
}
.users,
.users tbody
{
  box-sizing: border-box;
  display: block;
  width: 100%;
}
.users thead,
.users tr
{
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 50px;
  width: 100%;
}
.users_item
{
  border: 1px solid hsla(0, 0%, 0%, .1);
  border-top: none;
  transition: background-color .25s ease-out;
}
.users.is-sorting .users_item-move
{
  transition: none;
}

.users:not(.is-sorting) .users_item-leave-to
{
  opacity: 0;
  transform: translateX(-30px);
}
.users:not(.is-sorting) .users_item-leave-active
{
  position: absolute;
}

.users_item:hover,
.users_item:focus-within
{
  background-color: hsla(0, 0%, 0%, .05);
}
thead
{
  background-color: var(--color-accent);
  position: sticky;
  top: 0;
  z-index: 1;
}
thead .users_col
{
  font-family: var(--font-accent);
  font-weight: 600;
  color: #fff;
}
.users_col
{
  padding: 0 15px;
  text-align: left;
  min-width: 0;
}
.users_col_text
{
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.users_item_id
{
  flex-shrink: 0;
  width: 40px;
}
.users_item_username,
.users_item_firstName,
.users_item_lastName
{
  flex: 1;
}

.users_sortById
{
  align-items: center;
  background-color: var(--color-accent);
  display: flex;
  height: 100%;
  padding: 0;
  width: 70px;
}
.users_sortById button
{
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  height: 100%;
  outline: none;
  padding: 0 15px;
  width: 100%;
}
.users_sortById button:hover,
.users_sortById button:focus
{
  background-color: var(--color-accent-down);
}
.users_sortById button svg
{
  fill: currentColor;
  height: 16px;
  margin-left: 5px;
  transition: 75ms ease-out;
  width: 16px;
}
.users_sortById .is-null svg
{
  opacity: 0;
}
.users_sortById .is-asc svg
{
  opacity: 1;
  transform: scale(1, -1);
}
.users_sortById .is-desc svg
{
  opacity: 1;
}


.users_item_bttn_wrap
{
  height: 44px;
  padding: 0;
  width: 44px;
}
.users_item_bttn
{
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 100%;
  justify-content: center;
  opacity: .25;
  outline: 0;
  padding: 10px;
  transition: 75ms ease-out;
  width: 100%;
}
.users_item_bttn:hover,
.users_item_bttn:focus
{
  opacity: .6;
}
.users_item_bttn svg
{
  height: 100%;
  width: 100%;
}
.users_item_bttn_edit svg
{
  height: 90%;
  width: 90%;
}

@media screen and (max-width: 600px)
{
  .users_filters_id
  {
    display: flex;
  }
  .users thead
  {
    display: none;
  }
  .users tr
  {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
  }
  .users tr:not(:last-child)
  {
    margin-bottom: 30px;
  }
  .users_item:hover,
  .users_item:focus-within
  {
    background: none;
  }
  .users_col
  {
    align-items: center;
    border-top: 1px solid hsla(0, 0%, 0%, .1);
    display: flex;
    grid-column: 1 / span 2;
    height: 50px;
    padding: 0;
    width: 100%;
  }
  .users_col:not(.users_item_bttn_wrap)::before
  {
    align-items: center;
    align-self: stretch;
    background-color: var(--color-accent);
    box-shadow: 0 -1px 0 0 hsla(0, 0%, 0%, .1), 0 0 0 1px var(--color-accent);
    box-sizing: border-box;
    color: #fff;
    content: attr(data-title) ': ';
    display: flex;
    flex-shrink: 0;
    font-family: var(--font-accent);
    font-weight: 600;
    justify-content: flex-end;
    margin-right: 10px;
    padding: 0 10px;
    width: 110px;
  }
  .users_item_bttn_wrap
  {
    background-color: hsla(0, 0%, 0%, .05);
    grid-column: 1;
  }
  .users_item_bttn_wrap + .users_item_bttn_wrap
  {
    background-color: hsla(0, 0%, 0%, .05);
    grid-column: 2;
  }
}
@media screen and (max-width: 400px)
{
  .page_users .form_notification_user
  {
    width: calc(100% - 30px);
  }
}
</style>