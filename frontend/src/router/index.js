import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';
import fas from '@fortawesome/fontawesome-free-solid';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import VueLodash from 'vue-lodash';

import 'vue-snotify/styles/material.scss';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

import Question from '@/components/Question';
import EstimateQuestion from '@/components/EstimateQuestion';
import Group from '@/components/Group';
import Answer from '@/components/Answer';
import AnswerEntry from '@/components/AnswerEntry';
import Info from '@/components/Info';
import Reroute from '@/components/Snippets/Reroute';
import Finish from '@/components/Finish';


import Home from '@/components/Home';

import Login from '@/components/Auth/Login';

import DashboardIndex from '@/components/Dashboard/Index';

import Auth from '@/components/Auth/utils';

const VueMoment = require('vue-moment');
const VueCookie = require('vue-cookie');

const config = require('./../config');

faLibrary.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Meta);
Vue.use(VueMoment);
Vue.use(VueCookie);

Vue.prototype._ = VueLodash;

Vue.http.options.root = config.rootUrl;
Vue.http.interceptors.push((request) => {
  request.headers.set('X-Access-Token', Vue.cookie.get(config.authTokenCookie));
});

Vue.use(Auth);

Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.rightTop,
  },
});

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/question',
      name: 'question',
      component: Question,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
    {
      path: '/estimatequestion',
      name: 'estimatequestion',
      component: EstimateQuestion,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
    {
      path: '/group',
      name: 'group',
      component: Group,
    },
    {
      path: '/answer',
      name: 'answer',
      component: Answer,
    },
    {
      path: '/answerentry',
      name: 'answerentry',
      component: AnswerEntry,
    },
    {
      path: '/reroute',
      name: 'reroute',
      component: Reroute,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
    {
      path: '/finish',
      name: 'finish',
      component: Finish,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardIndex,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
    {
      path: '/info',
      name: 'info',
      component: Info,
      beforeEnter: Vue.prototype.$auth.requireAuth,
    },
  ],
});
