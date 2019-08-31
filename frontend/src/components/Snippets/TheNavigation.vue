<template>
  <b-navbar
    :type="navbarType"
    :variant="navbarVariant"
    toggleable="md"
  >

    <b-nav-toggle target="nav_collapse"/>

    <b-navbar-brand
      v-if="loggedIn"
      :to="{ name: 'dashboard' }"
    >
      <font-awesome-icon icon="th" /> Dashboard
    </b-navbar-brand>
    <b-navbar-brand
      v-else
      :to="{ name: 'home' }"
    >
      Login
    </b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav
    >

      <b-navbar-nav
        v-if="loggedIn"
        class="ml-auto"
      >
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <font-awesome-icon icon="user" /> {{ tokenDetails.name }}
          </template>
          <b-dropdown-item :to="{ name: 'settings' }">
            <font-awesome-icon icon="cogs" /> Settings
          </b-dropdown-item>
          <b-dropdown-item :to="{ name: 'finish' }">
            Finish
          </b-dropdown-item>
          <b-dropdown-item-button @click="resetCat()">Reset</b-dropdown-item-button>
          <b-dropdown-item :to="{ name: 'info' }">
            <font-awesome-icon icon="info-circle" /> Info
          </b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item @click="logout">
            <font-awesome-icon icon="sign-out-alt" /> Logout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav
        v-else
        class="ml-auto"
      >
        <b-nav-item :to="{ name: 'login' }">
          <font-awesome-icon icon="sign-in-alt" /> Login
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  computed: {
    loggedIn() {
      return this.$auth.isLoggedIn();
    },
    tokenDetails() {
      return this.$auth.getTokenDecoded();
    },
    navbarType() {
      return this.$store.getters.setting('navbar.type', 'dark');
    },
    navbarVariant() {
      return this.$store.getters.setting('navbar.variant', 'dark');
    },
  },
  created() {
    this.$router.afterEach(() => {
      this.$forceUpdate();
    });
  },
  methods: {
    logout() {
      this.$auth.logoutHard();
    },
    async resetCat() {
      this.$http.post('jobs/catreset').then((res) => {
        this.$router.push({
          name: 'reroute',
          params: res.body,
        });
      });
    },
    isRoutePrefix(prefix) {
      return this.$router.currentRoute.path.split('/')[1] === prefix;
    },
  },
};
</script>
