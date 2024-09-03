<template>
  <section id="hero" class="hero d-flex flex-column justify-content-center align-items-center" data-aos="fade" data-aos-delay="1500">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 text-center">
          <h2><span>PrepPal</span> - Your Interactive Guide to Emergency Preparedness</h2>
          <p>Embark on a journey of learning and readiness with PrepPal, where we transform emergency preparedness into an engaging experience for all ages. Our platform, powered by advanced AI and technology, offers interactive scenarios, personalized guidance, and inclusive features to ensure everyone is equipped to handle emergencies with confidence.</p>
          <router-link to="/auth" class="btn-get-started">Join the PrepPal Community</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script logic needed for the home view
</script>

<style scoped>
.hero {
  width: 100%;
  min-height: 30vh;
  background: #000;
  background-size: cover;
  position: relative;
  padding: 140px 0 60px 0;
}

.hero h2 {
  margin: 0 0 10px 0;
  font-size: 38px;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-secondary);
}

.hero p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30px;
  font-size: 18px;
}

.hero .btn-get-started {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 14px;
  display: inline-block;
  padding: 12px 40px;
  border-radius: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: 0.3s;
  color: #fff;
  background: var(--color-primary);
}

.hero .btn-get-started:hover {
  background: #2cbc85;
}
</style>
