<template>
  <div>
    <b-row size="lg">
      <b-col>
        <b-button
          :variant="color"
          :style="{width: '100%'}"
          size="lg"
          class="mt-2"
          @click="showColor()"
        >{{ letter + ') ' + button[1] }}</b-button>
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
  data: () => ({}),
  computed: {
    color() {
      if (!this.solution) {
        return 'primary';
      }
      return this.validateAnswer(this.button[0]);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    validateAnswer(answer) {
      if (answer) {
        return 'success';
      }
      return 'danger';
    },
    showColor() {
      this.solution = true;
    },
  },
};
</script>
