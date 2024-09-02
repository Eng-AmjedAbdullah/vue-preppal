import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('swiper')) {
              return 'vendor_swiper'; // This will create a chunk for Swiper
            }
            if (id.includes('glightbox')) {
              return 'vendor_glightbox'; // This will create a chunk for GLightbox
            }
            if (id.includes('aos')) {
              return 'vendor_aos'; // This will create a chunk for AOS
            }
            if (id.includes('bootstrap')) {
              return 'vendor_bootstrap'; // This will create a chunk for Bootstrap
            }
            return 'vendor'; // All other node_modules will be in this chunk
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 kB
  }
});
