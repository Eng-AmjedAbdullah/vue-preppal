<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- Sign In Form for Parent -->
        <form @submit.prevent="handleLogin" class="sign-in-form">
          <h2 class="title">Parent Sign in</h2>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="loginEmail" placeholder="Email" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="loginPassword" placeholder="Password" required />
          </div>
          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" />
              <label for="remember">Remember Me</label>
            </div>
            <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">Forgot Password?</a>
          </div>
          <input type="submit" value="Login" class="btn solid" />
        </form>

        <!-- Sign Up Form for Parent -->
        <form @submit.prevent="handleParentRegister" class="sign-up-form">
          <h2 class="title">Parent Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="parentRegisterData.username" placeholder="Username" required />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="parentRegisterData.email" placeholder="Email" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="parentRegisterData.password" placeholder="Password" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="parentRegisterData.confirmPassword" placeholder="Confirm Password" required />
          </div>
          <input type="submit" class="btn" value="Sign up" />
        </form>
      </div>
    </div>

    <!-- Panels for animations -->
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here?</h3>
          <p>
            Sign up as a parent to approve your child's registration and monitor their activity.
          </p>
          <button class="btn transparent" id="sign-up-btn" @click="toggleMode">Sign up</button>
        </div>
        <img src="/logo.png" class="image" alt="Sign up" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Already have an account?</h3>
          <p>
            Sign in to approve your child's registration or monitor their activity.
          </p>
          <button class="btn transparent" id="sign-in-btn" @click="toggleMode">Sign in</button>
        </div>
        <img src="/logo.png" class="image" alt="Sign in" />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase'; // Import Firebase configuration
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import emailjs from 'emailjs-com'; // Import EmailJS

const userID = '156vV7tB4bmBnhXSI'; // Your EmailJS user ID
const serviceID = 'service_ay3nce4'; // Your EmailJS service ID
const templateIDParentSuccess = 'template_dcy2p5j'; // Template ID for notifying child after parent registration

const emailService = {
  async sendParentRegistrationSuccessEmail(childEmail, parentName) {
    try {
      emailjs.init(userID);
      await emailjs.send(serviceID, templateIDParentSuccess, {
        to_email: childEmail,
        parent_name: parentName,
      });
      console.log('Parent registration success email sent to child!');
    } catch (error) {
      console.error('Failed to send parent registration success email:', error);
      alert('Failed to notify the child after parent registration.');
    }
  }
};

export default {
  name: 'ParentRegistrationPage',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      parentRegisterData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    async handleParentRegister() {
      try {
        if (this.parentRegisterData.password !== this.parentRegisterData.confirmPassword) {
          alert("Passwords do not match. Please try again.");
          return;
        }

        await createUserWithEmailAndPassword(auth, this.parentRegisterData.email, this.parentRegisterData.password);
        alert('Parent registration successful! Now, notifying the child.');
        
        const childEmail = this.$route.query.childEmail; // Assuming the child email is passed as a query parameter
        await emailService.sendParentRegistrationSuccessEmail(childEmail, this.parentRegisterData.username);
        
        // Redirect to parent login page
        this.$router.push('/auth'); // Adjust this path if the parent login page is different
      } catch (error) {
        console.error('Parent registration failed:', error);
        alert('Parent registration failed. Please try again.');
      }
    },

    async handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
        alert('Login successful!');
        // Redirect to parent dashboard or another action
        this.$router.push('/parent-dashboard'); // Adjust the route to your parent dashboard page
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    },

    async handleForgotPassword() {
      if (!this.loginEmail) {
        alert('Please enter your email address.');
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.loginEmail);
        console.log('Reset password email sent successfully!');
        alert('Check your email to reset your password.');
      } catch (error) {
        console.error('Failed to send reset password email:', error);
        alert('Failed to send reset password email. Please try again.');
      }
    },

    toggleMode() {
      const container = document.querySelector('.container');
      container.classList.toggle('sign-up-mode');
    }
  }
};
</script>
<style scoped>
/* Styles similar to those in AuthView.vue for consistency */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff;
  overflow: hidden;
}

body,
input {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  left: 75%;
  width: 50%;
  transform: translate(-50%, -50%);
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  position: relative;
}

.input-field i {
  margin-right: 10px;
  color: #000000;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  flex: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  padding: 10px;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 70%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  align-items: flex-start;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
  width: 70%;
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 380px;
  margin-bottom: 10px;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

.forgot-password {
  color: #4481eb;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.remember-me input {
  margin-right: 5px;
  color: #4481eb;
}

.alert {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  max-width: 700px;
  margin: 10px auto;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
  color: #333;
}

.social-media {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}
</style>
