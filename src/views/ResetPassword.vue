<template>
  <div class="reset-password-container">
    <h2>Reset Your Password</h2>
    <form @submit.prevent="handleResetPassword">
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" v-model="newPassword" placeholder="New Password" required />
      </div>
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      </div>
      <input type="submit" value="Reset Password" class="btn solid" />
    </form>
  </div>
</template>

<script>
import { auth } from '../firebase';
import { confirmPasswordReset } from 'firebase/auth';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      oobCode: '' // Out-of-band code from Firebase reset email link
    };
  },
  methods: {
    async handleResetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      try {
        await confirmPasswordReset(auth, this.oobCode, this.newPassword);
        alert('Password has been reset successfully!');
        this.$router.push('/auth'); // Redirect to login page
      } catch (error) {
        console.error('Error resetting password:', error);
        alert('Failed to reset password. Please try again.');
      }
    }
  },
  created() {
    // Retrieve the oobCode from the query parameters in the URL
    const queryParams = new URLSearchParams(window.location.search);
    this.oobCode = queryParams.get('oobCode');
  }
};
</script>

<style scoped>
/* Add necessary styles for reset password form */
.reset-password-container {
  max-width: 400px;
  margin: 100px auto;
  text-align: center;
}
.input-field {
  margin: 10px 0;
}
</style>
