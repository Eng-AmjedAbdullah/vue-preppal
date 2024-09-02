<template>
    <div>
      <label for="prompt">Enter your prompt:</label>
      <textarea id="prompt" v-model="prompt"></textarea>
      <button @click="generateText">Generate</button>
      <p v-if="generatedText">
        {{ generatedText }}
      </p>
    </div>
  </template>
  <script>
import axios from 'axios';

export default {
  data() {
    return {
      prompt: '',
      generatedText: null,
    };
  },
  methods: {
    async generateText() {
      try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
          model: 'text-davinci-003', // Choose your OpenAI model
          prompt: this.prompt,
          max_tokens: 100, // Adjust for desired output length
          temperature: 0.7, // Adjust for creativity
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VUE_APP_OPENAI_API_KEY}`, // Fetch API key from environment variable
          },
        });
        this.generatedText = response.data.choices[0].text.trim();
      } catch (error) {
        console.error('Error generating text:', error);
      }
    },
  },
};
</script>