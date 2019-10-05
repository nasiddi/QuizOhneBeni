<template>
  <div>
    <b-card
      v-if="question !== undefined"
      :header="infos"
      class="mt-3"
      border-variant="primary"
      header-bg-variant="transparent"
      header-text-variant="black"
      align="center">
      <b-card-title v-html="question.q"/>

      <b-button
        v-if="questions.length !== 0"
        :style="{width: '100%'}"
        class="mt-2"
        @click.prevent="nextQuestion()"
      ><font-awesome-icon icon="play-circle" /></b-button>

      <div v-if="guessButtons.length > 0">
        <MultiChoiceButton
          v-for="g in guessButtons"
          :key="g[0]"
          :button="g[1]"
          :letter="''"
          :subs="g[2]"
          :solution="solution"
        />

      </div>
    </b-card>
    <b-row>
      <b-button
        class="mt-2 mx-2"
        @click="loadSubmissions()"
      >Load Submissions</b-button>
      <b-button
        class="mt-2 mx-2"
        @click="showSubmissions()"
      >Show Submissions</b-button>
      <b-button
        class="mt-2 mx-2"
        @click="showSolution()"
      >Show Solution</b-button>
      <div
        v-for="ans in answered"
        :key="ans"
        class="mt-2 mx-2">
        {{ ans }}&nbsp;
      </div>
    </b-row>
  </div>
</template>

<script>
import MultiChoiceButton from './MultiChoiceButton';

export default {
  components: {
    MultiChoiceButton,
  },
  props: {},
  data: () => ({
    questions: {},
    question: '',
    showSubs: [],
    answerDict: {},
    timer: 1000,
    solution: false,
    answered: [],
    infos: '',
    guessButtons: [],
  }),
  computed: {},
  watch: {},
  created() {
    this.infos = this.$route.params.infos;
    this.$http.post('jobs/estimatequestions').then((res) => {
      if (res.body === 'failed') {
        this.$snotify.error('Loading failed');
      } else {
        this.questions = res.body;
        this.question = this.questions.shift();
      }
    });
  },
  mounted() {},
  methods: {
    showSubmissions() {
      // eslint-disable-next-line no-restricted-syntax
      this.guessButtons = Object.keys(this.answerDict)
        .map(key => [key, [this.answerDict[key].winner, key], this.answerDict[key].subs])
        .sort((first, second) => first[0] - second[0]);
    },
    showSolution() {
      this.answerDict[this.question.a] = { subs: [], winner: null };
      this.showSubmissions();
      this.solution = true;
    },
    async loadSubmissions() {
      this.answerDict = {};
      this.$http.post('jobs/loadanswers').then((res) => {
        if (res.body === 'failed') {
          this.$snotify.error('Loading failed');
        } else {
          const items = Object.keys(res.body).map(key => [key, res.body[key]]);

          // eslint-disable-next-line no-unused-vars
          const answersFiltered = items.filter((value, index, arr) => value[1] !== '');
          if (answersFiltered.length === 0) {
            return;
          }

          const answeresInts = answersFiltered.map(a => [parseInt(a[0], 10), parseInt(a[1], 10)]);
          this.answered = answeresInts.map(a => a[0]);
          const guesses = answeresInts.map(a => a[1]);
          const trueValue = parseInt(this.question.a, 10);

          answeresInts.forEach((a) => {
            if (!(a[1] in this.answerDict)) {
              this.answerDict[a[1]] = { subs: [], winner: false };
            }
            this.answerDict[a[1]].subs.push(a[0]);
            // eslint-disable-next-line
          });
          const winner = guesses.reduce((prev, curr) => (Math.abs(curr - trueValue)
              < Math.abs(prev - trueValue) ? curr : prev));
          this.answerDict[winner].winner = true;
        }
      });
    },
    nextQuestion() {
      this.$http.post('jobs/resetanswers');
      this.solution = false;
      this.question = this.questions.shift();
      this.guessButtons = [];
      this.answerDict = {};
      this.answered = [];
    },
  },
};
</script>
