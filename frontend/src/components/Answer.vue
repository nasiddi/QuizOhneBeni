<template>
  <div>
    <b-card
      :style="{width: '100%'}"
      :title="'Gruppe ' + group"
      class="text-center py-1 mt-3"/>
    <b-button
      :style="{width: '100%'}"
      variant="primary"
      class="mt-2"
      @click="submitAnswer('a')"
    >a</b-button>
    <b-button
      :style="{width: '100%'}"
      variant="primary"
      class="mt-2"
      @click="submitAnswer('b')"
    >b</b-button>
    <b-button
      :style="{width: '100%'}"
      variant="primary"
      class="mt-2"
      @click="submitAnswer('c')"
    >c</b-button>
    <b-button
      :style="{width: '100%'}"
      variant="primary"
      class="mt-2"
      @click="submitAnswer('d')"
    >d</b-button>
    <b-button
      :style="{width: '100%'}"
      variant="primary"
      class="mt-2"
      @click="submitAnswer('e')"
    >e</b-button>
    <b-button
      :style="{width: '100%'}"
      variant="secondary"
      class="mt-4"
      @click="switchAnswerMode"
    >Eingabefeld</b-button>
    <b-alert
      :show="dismissCountDown"
      fade
      variant="success"
      class="mt-2"
      @dismissed="dismissCountDown=0"
    >Antwort <b>{{ selectedAnswer }}</b> eingegeben</b-alert>
    <b-alert
      :show="dismissCountDownError"
      fade
      variant="danger"
      class="mt-2"
      @dismissed="dismissCountDownError=0"
    >{{ errorMessage }}</b-alert>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data: () => ({
    selectedAnswer: '',
    group: undefined,
    error: false,
    dismissCountDown: 0,
    dismissCountDownError: 0,
    errorMessage: '',
  }),
  computed: {},
  watch: {},
  created() {
    this.group = this.$route.params.group;
    if (this.group === undefined || this.group == null) {
      this.$router.push({ name: 'group' });
    }
  },
  mounted() {},
  methods: {
    async submitAnswer(selected) {
      if (this.group === undefined || this.group == null) {
        this.$router.push({ name: 'group' });
      }
      this.$http
        .post('openjobs/saveanswer', { group: this.group, answer: selected })
        .then((res) => {
          if (res.body === 'failed') {
            this.errorMessage = 'Speichern fehlgeschlagen';
            this.dismissCountDownError = 5;
          } else {
            this.selectedAnswer = res.body;
            this.dismissCountDown = 5;
          }
        });
    },
    switchAnswerMode() {
      this.$http
        .post('openjobs/entryfield')
        .then((res) => {
          if (res.body === false) {
            this.errorMessage = 'Now is not the time for that';
            this.dismissCountDownError = 5;
          } else {
            this.$router.push({
              name: 'answerentry',
              params: { group: this.group },
            });
          }
        });
    },
  },
};
</script>
