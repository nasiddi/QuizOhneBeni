<template>
  <div>
    <b-row size="lg">
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
    subs: {
      type: Object,
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
        if (this.validateAnswer(this.button[0])) {
          return 'success';
        }
        return 'danger';
      }
      return 'primary';
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
