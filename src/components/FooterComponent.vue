<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>PrepPal</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="">Haya Fadeh</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
  // No script logic needed for footer
</script>

<style scoped>
.footer {
  margin-top: 30px;
  padding: 30px 0;
  font-size: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-family: var(--font-default);
  color: var(--color-default);
  background-color: #000;
  --color-default: #fafafa;
  --color-primary: #27a776;
  --color-secondary: #161718;
}



.footer .credits {
  padding-top: 6px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.footer .credits a {
  color: var(--color-primary);
}
</style>
