<template>
  <div>
    <b-card
      :title="cat.name"
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center">
      <b-button
        :variant="'primary'"
        :disabled="!cat['10']"
        :style="{width: '100%'}"
        size="lg"
        class="mt-2"
        @click="goToQuestion(10)"
      >10</b-button>
      <b-button
        :variant="'primary'"
        :disabled="!cat['20']"
        :style="{width: '100%'}"
        size="lg"
        class="mt-2"
        @click="goToQuestion(20)"
      >20</b-button>
      <b-button
        :variant="'primary'"
        :disabled="!cat['30']"
        :style="{width: '100%'}"
        size="lg"
        class="mt-2"
        @click="goToQuestion(30)"
      >30</b-button>
      <b-button
        :variant="'primary'"
        :disabled="!cat['40']"
        :style="{width: '100%'}"
        size="lg"
        class="mt-2"
        @click="goToQuestion(40)"
      >40</b-button>
      <b-button
        :variant="'primary'"
        :disabled="!cat['50']"
        :style="{width: '100%'}"
        size="lg"
        class="mt-2"
        @click="goToQuestion(50)"
      >50</b-button>
    </b-card>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    cat: {
      type: Object,
      required: true,
    },
    questions: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
  }),
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    async goToQuestion(points) {
      this.cat[points] = false;
      this.$http.post('jobs/catupdate', this.cat)
        .then(
          this.$router.push({
            name: 'question',
            params: { question: this.questions[points], cat: this.cat.name, points },
          }),
        );
    },
  },
};
</script>
