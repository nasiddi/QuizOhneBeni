<template>
  <b-card>
    <b-button
      :variant="'primary'"
      :style="{width: '100%'}"
      class="mt-2"
      @click="resetCat()"
    >Reset Cat</b-button>
  </b-card>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    async resetCat() {
      this.$http.post('jobs/catreset')
        .then((res) => {
          this.$router.push({
            name: 'home',
            params: res.body,
          });
        });
    },
  },
};
</script>
