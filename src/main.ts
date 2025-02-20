import './style.css';

import App from './App.vue';
import { DnDKit } from './index';
import { createApp } from 'vue';

createApp(App).use(DnDKit).mount('#app');
