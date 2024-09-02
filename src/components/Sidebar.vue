<template>
    <div class="sidebar" v-if="show">
      <div class="sidebar-content">
        <h2>Ask PrepPal</h2>
        <textarea v-model="prompt" placeholder="Enter your question or prompt"></textarea>
        <button @click="generateText">Generate</button>
        <div v-if="generatedText">
          <p>{{ generatedText }}</p>
        </div>
      </div>
      <button class="close-button" @click="closeSidebar">
        <i class="bi bi-x"></i>
      </button>
    </div>
  </template>
  <style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: left 0.3s ease-in-out;
  z-index: 100;
}

.sidebar-content {
  padding: 20px;
  height: calc(100% - 60px);
  overflow-y: auto;
}

.sidebar textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
}

.sidebar button {
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.close-button i {
  font-size: 20px;
  color: #333;
}
</style>