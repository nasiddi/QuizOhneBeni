<template>
  <div>
    <b-button
      :variant="colorA"
      :style="{width: '100%'}"
      class="mt-2"
      @click="submitAnswer('a')"
    >a</b-button>
    <b-button
      :variant="colorB"
      :style="{width: '100%'}"
      class="mt-2"
      @click="submitAnswer('b')"
    >b</b-button>
    <b-button
      :variant="colorC"
      :style="{width: '100%'}"
      class="mt-2"
      @click="submitAnswer('c')"
    >c</b-button>
    <b-button
      :variant="colorD"
      :style="{width: '100%'}"
      class="mt-2"
      @click="submitAnswer('d')"
    >d</b-button>
    <b-button
      :variant="colorE"
      :style="{width: '100%'}"
      class="mt-2"
      @click="submitAnswer('e')"
    >e</b-button>
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
    colorA: 'primary',
    colorB: 'primary',
    colorC: 'primary',
    colorD: 'primary',
    colorE: 'primary',
    group: null,
  }),
  computed: {
  },
  watch: {
  },
  created() {
    this.group = this.$route.params.group;
  },
  mounted() {
  },
  methods: {
    async submitAnswer(selected) {
      this.$http.post('jobs/saveanswer', { group: this.group, answer: selected })
        .then((res) => {
          this.json = res.body;
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
