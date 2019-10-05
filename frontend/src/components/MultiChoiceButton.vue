<template>
  <div>
    <b-row size="lg">
      <b-col>
        <b-button
          :variant="color"
          :style="{width: '100%'}"
          size="lg"
          class="mt-2"
          @click="markSelection"
        >{{ answerText }}</b-button>
      </b-col>
      <b-col
        v-for="sub in subs"
        :key="sub"
        class="px-0 mx-0">
        <b-btn
          :variant="color"
          :style="{width: '30px'}"
          class="mt-2 px-0 mx-0"
          size="lg"
        >{{ sub }}</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    button: {
      type: Array,
      required: true,
    },
    subs: {
      type: Array,
      required: true,
    },
    letter: {
      type: String,
      required: true,
    },
    solution: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    localSolution: false,
  }),
  computed: {
    color() {
      if (this.solution || this.localSolution) {
        if (this.button[0] === null) {
          return 'primary';
        }
        if (this.validateAnswer(this.button[0])) {
          return 'success';
        }
        return 'danger';
      }
      return 'primary';
    },
    answerText() {
      if (this.letter !== '') {
        return `${this.letter}) ${this.button[1]}`;
      }
      return this.button[1];
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    validateAnswer(answer) {
      return answer;
    },
    markSelection() {
      this.localSolution = true;
    },
  },
};
</script>
