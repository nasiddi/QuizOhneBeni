<template>
  <div>
    <b-card
      :header="infos"
      :title="question.q"
      class="mt-3"
      border-variant="primary"
      header-bg-variant="transparent"
      header-text-variant="black"
      align="center">

      <b-img
        v-if="image !== ''"
        :src="require(`../../media/${image}.png`)"
        fluid
        rounded/>

      <b-button
        v-if="question.img !== '' && bText[0] === '' && imagePos.length !== 0"
        :style="{width: '100%'}"
        class="mt-2"
        @click.prevent="changeImage()"
      ><font-awesome-icon icon="play-circle" /></b-button>

      <b-row>
        <b-col>
          <b-button
            v-for="song in songs"
            :key="song[0]"
            :style="{width: '100%'}"
            class="mt-2"
            @click.prevent="playSound(song)"
          ><font-awesome-icon icon="play-circle" />
          </b-button>
        </b-col>
        <b-col>
          <b-button
            v-for="song in songs"
            :key="song[0]"
            :style="{width: '100%'}"
            class="mt-2"
            @click.prevent="playFull(song)"
          ><font-awesome-icon icon="play-circle" /> full
          </b-button>
        </b-col>
      </b-row>
      <div v-if="answers.length > 1">
        <MultiChoiceButton
          :button="aText"
          :letter="'a'"
          :subs="a"
          :solution="solution"
        />
        <MultiChoiceButton
          :button="bText"
          :letter="'b'"
          :subs="b"
          :solution="solution"

        />
        <MultiChoiceButton
          :button="cText"
          :letter="'c'"
          :subs="c"
          :solution="solution"

        />
        <MultiChoiceButton
          :button="dText"
          :letter="'d'"
          :subs="d"
          :solution="solution"

        />
        <MultiChoiceButton
          :button="eText"
          :letter="'e'"
          :subs="e"
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
    question: {},
    showSubs: [],
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    aText: ['', ''],
    bText: ['', ''],
    cText: ['', ''],
    dText: ['', ''],
    eText: ['', ''],
    test: '',
    mediaURL: 'http://localhost:8558/',
    audio: null,
    timer: 1000,
    songs: [],
    imagePos: [],
    image: '',
    answers: [],
    subs: {},
    solution: false,
    answered: [],
    infos: '',
  }),
  computed: {},
  watch: {},
  created() {
    this.question = this.$route.params.question;
    this.infos = `${this.$route.params.cat} ${this.$route.params.points}`;
    let counter = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(this.question.a)) {
      this.answers.push(value);
      switch (counter) {
      case 0:
        this.aText = [value, key];
        break;
      case 1:
        this.bText = [value, key];
        break;
      case 2:
        this.cText = [value, key];
        break;
      case 3:
        this.dText = [value, key];
        break;
      case 4:
        this.eText = [value, key];
        break;
      default:
        break;
      }
      counter += 1;
    }

    if (this.question.audio !== '') {
      const sounds = this.question.audio.split(';');
      sounds.forEach((s) => {
        this.songs.push([s, 0]);
      });
    }

    if (this.question.img !== '') {
      if (this.question.img.includes(';')) {
        const i = this.question.img.split(';');
        i.forEach((s) => {
          this.imagePos.push(s);
        });
      } else {
        this.image = this.question.img;
      }
    }

    if (this.question.entry) {
      this.$http.post('jobs/activateentry');
      this.$router.push({
        name: 'estimatequestion',
        params: { question: this.question, infos: this.infos },
      });
    } else {
      this.$http.post('jobs/deactivateentry');
    }
  },
  mounted() {},
  methods: {
    async showSubmissions() {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(this.subs)) {
        switch (value) {
        case 'a':
          this.updateChoice(key, this.a);
          break;
        case 'b':
          this.updateChoice(key, this.b);
          break;
        case 'c':
          this.updateChoice(key, this.c);
          break;
        case 'd':
          this.updateChoice(key, this.d);
          break;
        case 'e':
          this.updateChoice(key, this.e);
          break;
        default:
          break;
        }
      }
    },
    updateChoice(key, choice) {
      if (!choice.includes(key)) {
        choice.push(key);
      }
    },
    showSolution() {
      this.solution = true;
    },
    playFull(song) {
      // eslint-disable-next-line
      song[1] = 11;
      this.playSound(song);
    },
    async loadSubmissions() {
      this.$http.post('jobs/loadanswers').then((res) => {
        if (res.body === 'failed') {
          this.$snotify.error('Loading failed');
        } else {
          this.subs = res.body;
          // eslint-disable-next-line no-restricted-syntax
          for (const [key, value] of Object.entries(this.subs)) {
            if (value !== '' && !this.answered.includes(key)) {
              this.answered.push(key);
            }
          }
        }
      });
    },
    getMediaUrl(name) {
      return this.mediaURL + name;
    },
    playSound(name) {
      // eslint-disable-next-line
      const uri = this.getMediaUrl(
        // eslint-disable-next-line
        name[0] + (name[1] > 10 ? "" : "_" + name[1]) + ".mp3"
      );
      if (this.audio !== null && (!this.audio.paused || !this.audio.ended)) {
        this.audio.pause();
        this.audio = null;
        return;
      }
      this.audio = new Audio(uri);
      this.audio.play();
      // eslint-disable-next-line
      name[1] += 1;
    },
    changeImage() {
      this.image = this.imagePos.shift();
    },
  },
};
</script>
