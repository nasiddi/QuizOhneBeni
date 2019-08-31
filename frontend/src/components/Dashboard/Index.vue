<template>
  <div>
    <b-row
      size="lg"
      align-h="center"
      class="mt-4"><h1>Quiz à Litness</h1>
    </b-row>
    <b-row
      v-if="Object.keys(json).length !== 0 && questions !== null"
      size="lg"
      class="mt-4">
      <b-col>
        <CatCard
          :cat="json.cat1"
          :questions="questions.cat1"/>
      </b-col>
      <b-col>
        <CatCard
          :cat="json.cat2"
          :questions="questions.cat2"/>

      </b-col>
      <b-col>
        <CatCard
          :cat="json.cat3"
          :questions="questions.cat3"/>
      </b-col>
      <b-col>
        <CatCard
          :cat="json.cat4"
          :questions="questions.cat4"/>

      </b-col>
      <b-col>
        <CatCard
          :cat="json.cat5"
          :questions="questions.cat5"/>

      </b-col>
      <b-col>
        <CatCard
          :cat="json.cat6"
          :questions="questions.cat6"/>


      </b-col>
    </b-row>
  </div>
</template>

<script>
import CatCard from './CatCard';

export default {
  components: {
    CatCard,
  },
  data: () => ({
    json: {},
    questions: null,
  }),
  created() {
    this.$http.post('jobs/resetanswers');
    this.$http.post('jobs/catclicked').then((res) => {
      this.json = res.body;
    });
    this.$http.post('jobs/questions').then((res) => {
      this.questions = res.body;
    });
  },
  methods: {
    async reload() {
      let notifLoading = null;
      this.$http
        .post('jobs/reload')
        .then((notifLoading = this.$snotify.info('Reloading', { timeout: 0 })))
        .then((res) => {
          this.$snotify.remove(notifLoading.id);
          if (res.body === 'failed') {
            this.$snotify.error('Loading failed');
          } else {
            this.$snotify.success(res.body);
          }
        });
    },
  },
};
</script>
