import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VuePreloader } from 'vue-preloader'; // Import VuePreloader
import 'vue-preloader/dist/style.css';
// Importing CSS libraries globally
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'aos/dist/aos.css';


// Importing JavaScript libraries globally
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swiper from 'swiper/bundle';
import GLightbox from 'glightbox';
import AOS from 'aos';

// Initialize libraries
AOS.init();
GLightbox();

const app = createApp(App);

// Register VuePreloader globally
app.component('VuePreloader', VuePreloader);

app.mixin({
  mounted() {
    // Initialize Swiper if the container is found
    if (this.$el.querySelector('.swiper-container')) {
      new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  },
});

app.use(router);
app.mount('#app');
