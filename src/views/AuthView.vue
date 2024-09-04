<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- Sign In Form -->
        <form @submit.prevent="handleLogin" class="sign-in-form">
          <h2 class="title">Sign in</h2>
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
          <p class="social-text">Or Sign in with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon facebook" @click.prevent="handleSocialLogin('facebook')">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon google" @click.prevent="handleSocialLogin('google')">
              <i class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon apple" @click.prevent="handleSocialLogin('apple')">
              <i class="fab fa-apple"></i>
            </a>
          </div>
        </form>

        <!-- Sign Up Form -->
        <form @submit.prevent="handleRegister" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" v-model="registerData.username" placeholder="Username" required />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="registerData.email" placeholder="Email" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="registerData.password" placeholder="Password" required />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" v-model="registerData.confirmPassword" placeholder="Confirm Password" required />
          </div>
          <div class="input-field">
            <i class="fas fa-calendar-alt"></i>
            <input type="number" v-model="registerData.age" placeholder="Age" required min="4" max="100" @input="handleAgeInput" />
          </div>
          <div class="input-field" v-if="isChild">
            <i class="fas fa-envelope"></i>
            <input type="email" v-model="registerData.parentEmail" placeholder="Parent's Email" :required="isChild" />
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
            Ready to empower yourself and your loved ones with knowledge?
            Sign up now and start learning how to stay safe in any emergency.
          </p>
          <button class="btn transparent" id="sign-up-btn" @click="toggleMode">Sign up</button>
        </div>
        <img src="/logo.png" class="image" alt="Sign up" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Already part of the PrePal family?</h3>
          <p>
            Welcome back! Sign in to continue your journey towards becoming a preparedness pro.
            Your safety adventure awaits!
          </p>
          <button class="btn transparent" id="sign-in-btn" @click="toggleMode">Sign in</button>
        </div>
        <img src="/logo.png" class="image" alt="Sign in" />
      </div>
    </div>
  </div>
</template>

<script>
import { auth, googleProvider, facebookProvider, appleProvider, db } from '../firebase'; // Import Firebase configuration
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import emailjs from 'emailjs-com'; // Import EmailJS

// EmailJS configuration constants
const serviceID = 'service_ay3nce4';
const templateIDConsent = 'template_y8zghha';  // Parental consent email template ID
const templateIDReset = 'template_reset_password'; // Reset password email template ID
const templateIDSuccess = 'template_dcy2p5j'; // Child registration success email template ID
const userID = '156vV7tB4bmBnhXSI';

// Email service object for sending emails via EmailJS
const emailService = {
  async sendParentalConsentEmail(parentEmail, templateParams) {
    try {
      emailjs.init(userID);
      await emailjs.send(serviceID, templateIDConsent, templateParams);
      console.log('Parental consent email sent successfully!');
      alert('An email has been sent to your parent for consent. Please wait for approval.');
    } catch (error) {
      console.error('Failed to send parental consent email:', error);
      alert('Failed to send parental consent email. Please try again.');
    }
  },
  async sendRegistrationSuccessEmail(childEmail, username) {
    try {
      emailjs.init(userID);
      await emailjs.send(serviceID, templateIDSuccess, {
        to_email: childEmail,
        username: username,
      });
      console.log('Child registration success email sent!');
    } catch (error) {
      console.error('Failed to send child registration success email:', error);
      alert('Failed to send registration success email.');
    }
  },
  async sendResetPasswordEmail(email) {
    try {
      emailjs.init(userID);
      await emailjs.send(serviceID, templateIDReset, {
        to_email: email
      });
      console.log('Reset password email sent successfully!');
      alert('Check your email to reset your password.');
    } catch (error) {
      console.error('Failed to send reset password email:', error);
      alert('Failed to send reset password email. Please try again.');
    }
  }
};

export default {
  name: 'AuthPage',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
      registerData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: null,
        parentEmail: ''
      },
      isChild: false
    };
  },
  watch: {
    'registerData.age'(newVal) {
      this.isChild = newVal < 13;
    }
  },
  methods: {
    handleAgeInput() {
      this.isChild = this.registerData.age < 13;
    },
    async handleRegister() {
      if (this.registerData.age < 13) {
        // For child users, send parental consent email
        const verificationLink = `https://vue-preppal.web.app/parent-registration?childEmail=${encodeURIComponent(this.registerData.email)}&username=${encodeURIComponent(this.registerData.username)}`;
        try {
          await emailService.sendParentalConsentEmail(this.registerData.parentEmail, {
            parent_email: this.registerData.parentEmail,
            verificationLink: verificationLink,
          });
        } catch (error) {
          console.error('Failed to send parental consent email:', error);
          alert('Failed to send parental consent email. Please try again.');
        }
      } else {
        // For regular users, proceed with registration
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.registerData.email, this.registerData.password);
          const user = userCredential.user;

          // Store user data in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            username: this.registerData.username,
            email: this.registerData.email,
            age: this.registerData.age,
            parentEmail: this.registerData.parentEmail,
            isParentApproved: this.registerData.age >= 13 // Automatically true for users 13 or older
          });

          alert('Registration successful! Redirecting to your dashboard...');
          await emailService.sendRegistrationSuccessEmail(this.registerData.email, this.registerData.username);
          // Redirect to dashboard or another action
        } catch (error) {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      }
    },
    async handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
        alert('Login successful!');
        // Redirect to dashboard or another action
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
    async handleSocialLogin(providerName) {
      let provider;
      if (providerName === 'google') {
        provider = googleProvider;
      } else if (providerName === 'facebook') {
        provider = facebookProvider;
      } else if (providerName === 'apple') {
        provider = appleProvider;
      }

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user data is complete
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // If the user document doesn't exist, it means user data is incomplete
          alert('Please complete your registration details.');
          this.$router.push('/complete-registration'); // Redirect to a route where they can complete registration
        } else {
          const userData = userDoc.data();
          if (!userData.age || (userData.age < 13 && !userData.isParentApproved)) {
            alert('Please complete your registration details.');
            this.$router.push('/complete-registration'); // Redirect to a route where they can complete registration
          } else {
            alert('Login successful with ' + providerName + '!');
            // Redirect to dashboard or another action
          }
        }

      } catch (error) {
        console.error('Social login failed:', error);
        alert('Social login failed. Please try again.');
      }
    },
    async handleForgotPassword() {
      if (!this.loginEmail) {
        alert('Please enter your email address.');
        return;
      }

      try {
        await sendPasswordResetEmail(auth, this.loginEmail);
        await emailService.sendResetPasswordEmail(this.loginEmail);
      } catch (error) {
        console.error('Error sending reset password email:', error);
        alert('Failed to send reset password email. Please try again.');
      }
    },
    toggleMode() {
      const container = document.querySelector('.container');
      container.classList.toggle('sign-up-mode');
    }
  },
};
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
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
  font-family: "Poppins", sans-serif;
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

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
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

</style>
