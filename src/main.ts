import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { createPinia } from 'pinia'; // Импортируем Pinia

const app = createApp(App);

app.use(vuetify);
app.use(createPinia()); // Подключаем Pinia

app.mount('#app');