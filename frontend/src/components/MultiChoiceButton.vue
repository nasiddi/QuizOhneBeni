<template>
  <div>
    <b-button
      :variant="color"
      :style="{width: '100%'}"
      size="lg"
      class="mt-2"
      @click="validateAnswer(button[0])"
    >{{ button[1] }}</b-button>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    button: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    question: {},
    color: 'primary',
  }),
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async goToQuestion(points) {
      this.cat[points] = false;
      this.$http.post('jobs/catupdate', this.cat)
        .then(
          this.$router.push({
            name: 'dashboard',
          }),
        );
    },
    async validateAnswer(answer) {
      if (answer) {
        this.color = 'success';
      } else {
        this.color = 'danger';
      }
    },
  },
};
</script>
