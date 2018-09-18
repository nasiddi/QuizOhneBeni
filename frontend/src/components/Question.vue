<template>
  <div>
    <b-card
      :title="question.q"
      class="mt-3"
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      align="center">
      <MultiChoiceButton
        v-for="(value, key) in question.a"
        :key="key"
        :button="[value, key]"
      />
    </b-card>
  </div>
</template>

<script>
import MultiChoiceButton from './MultiChoiceButton';


export default {
  components: {
    MultiChoiceButton,
  },
  props: {
  },
  data: () => ({
    question: {},
  }),
  computed: {
  },
  watch: {
  },
  created() {
    this.question = this.$route.params;
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
      if (this.question.a[answer][0]) {
        // eslint-disable-next-line no-param-reassign
        this.question.a[answer][1] = 'success';
      } else {
        // eslint-disable-next-line no-param-reassign
        this.question.a[answer][1] = 'danger';
      }
    },
  },
};
</script>
