<template>
  <footer id="footer" class="footer">

    <div class="container">
      <div class="copyright text-center ">
        <p>© <span>Copyright</span> <strong class="px-1 sitename">PrepPal-platform</strong> <span>All Rights Reserved</span></p>
      </div>
      <div class="social-links d-flex justify-content-center">
        <a href=""><i class="bi bi-twitter-x"></i></a>
        <a href=""><i class="bi bi-facebook"></i></a>
        <a href=""><i class="bi bi-instagram"></i></a>
        <a href=""><i class="bi bi-linkedin"></i></a>
      </div>
      <div class="credits">
      
        Designed by <a href="haya">Eng.Haya Fadeh</a>
      </div>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
/* Footer Styles */
.footer {
  padding: 40px 0;
  font-size: 14px;
  background-color: rgba(250, 250, 250, 0.05);
}

.footer .copyright {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.footer .social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 5px;
  transition: 0.3s;
}

.footer .social-links a:hover {
  color: #27a776;
  border-color: #27a776;
}
</style>
