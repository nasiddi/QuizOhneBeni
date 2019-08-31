<template>
  <div>
    <b-row size="lg">
      <b-col>
        <b-button
          :variant="color"
          :style="{width: '100%'}"
          size="lg"
          class="mt-2"
          @click="markCurrentGroup"
        >{{ letter + ') ' + button[1] }}</b-button>
      </b-col>
      <b-col
        v-if="currentSub != ''"
        class="px-0 mx-0">
        <b-btn
          :variant="color"
          :style="{width: '30px'}"
          class="mt-2 px-0 mx-0"
          size="lg"
        >{{ currentSub }}</b-btn>
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
    markAnswer: false,
    currentSub: '',
  }),
  computed: {
    color() {
      if (this.solution) {
        this.markCurrentGroup(this.button[0]);
        if (this.validateAnswer(this.button[0])) {
          return 'success';
        }
        return 'danger';
      }
      return 'primary';
    },
    subColor() {
      if (this.solution) {
        return this.validateAnswer(this.button[0]);
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
    markCurrentGroup() {
      if (this.solution) {
        if (this.validateAnswer(this.button[0])) {
          this.currentSub = String.fromCodePoint(128293);
        } else {
          this.currentSub = String.fromCodePoint(128167);
        }
      } else if (this.currentSub === '') {
        this.currentSub = String.fromCodePoint(128513);
      } else {
        this.currentSub = '';
      }
    },
  },
};
</script>
