import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VuePreloader } from 'vue-preloader'; 

// Importing necessary styles and libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Ensure bootstrap-icons is correctly loaded
import 'swiper/swiper-bundle.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.css';  // Ensure FontAwesome styles are correctly loaded
import '@fortawesome/fontawesome-free/js/all.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swiper from 'swiper/bundle';
import GLightbox from 'glightbox';
import AOS from 'aos';

// Initialize AOS and GLightbox
AOS.init();
GLightbox();

const app = createApp(App);

// Register VuePreloader globally
app.component('VuePreloader', VuePreloader);

app.mixin({
  mounted() {
    // Initialize Swiper if the swiper-container is found
    if (document.querySelector('.swiper-container')) {
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

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
