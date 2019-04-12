<template>
  <div>
    <b-jumbotron class="text-center mt-4">

      <h1>WLAN: quiz<br> Passwort: litnesss<br>Link: http://greece.quiz/group</h1>
    </b-jumbotron>
    <b-button
      type="teste"
      variant="primary"
      size="lg"
      block
      class="mt-3"
      @click.prevent="goToQuestion()"
    >Test Frage</b-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goToQuestion() {
      const question = {
        a: {
          lit: false,
          ob: false,
          easy: false,
          elefantös: false,
          'di puuri litness': true,
        },
        audio: '',
        img: '',
        q: 'Wie sind die Ferie?',
      };
      this.$router.push({
        name: 'question',
        params: question,
      });
    },
  },
};
</script>
