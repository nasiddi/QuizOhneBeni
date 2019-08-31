<template>
  <div>
    <b-alert
      :show="error"
      variant="danger"
      class="mt-2"
    >Group Missing</b-alert>

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
    >Speichern fehlgeschlagen</b-alert>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data: () => ({
    selectedAnswer: '',
    group: null,
    error: false,
    dismissCountDown: 0,
    dismissCountDownError: 0,
  }),
  computed: {},
  watch: {},
  created() {
    this.group = this.$route.params.group;
    if (this.group === null) {
      this.error = true;
    }
  },
  mounted() {},
  methods: {
    async submitAnswer(selected) {
      this.$http
        .post('openjobs/saveanswer', { group: this.group, answer: selected })
        .then((res) => {
          if (res.body === 'failed') {
            this.dismissCountDownError = 5;
          } else {
            this.selectedAnswer = res.body;
            this.dismissCountDown = 5;
          }
        });
    },
  },
};
</script>
