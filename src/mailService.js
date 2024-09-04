// src/emailService.js

import emailjs from '@emailjs/browser';


// EmailJS configuration
const serviceID = 'service_ay3nce4';
const templateID = 'template_y8zghha';
const userID = '156vV7tB4bmBnhXSI';

/**
 * Sends an email to the parent requesting consent for a child account.
 * @param {string} parentEmail - The email address of the parent.
 * @param {Object} templateParams - The parameters for the email template.
 */
export async function sendParentalConsentEmail(parentEmail, templateParams) {
  try {
    // Ensure EmailJS is initialized
    if (!emailjs.init) {
      emailjs.init(userID);
    }

    // Send the email
    await emailjs.send(serviceID, templateID, templateParams, userID);
    console.log('Email sent successfully!');
    alert('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
    alert('Failed to send parental consent email. Please try again.');
  }
}
