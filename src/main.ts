import './style.css';

import App from './App.vue';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { createApp } from 'vue';
import gsap from 'gsap';
import router from './router';

gsap.registerPlugin(ScrollToPlugin, TextPlugin);

createApp(App).use(router).mount('#app');
