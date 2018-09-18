<template>
  <div>
    <b-form-select
      v-model="group"
      :options="groups"
      class="mb-3 mt-3" />
    <b-button
      :variant="'primary'"
      :style="{width: '100%'}"
      class="mt-2"
      @click="goToAnswer()"
    >Continue</b-button>
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
    groups: [{ value: null, text: 'Gruppe wählen' }, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    group: null,
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
    async goToAnswer() {
      this.$router.push({
        name: 'answer',
        params: { group: this.group },
      });
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
