<template>
    <div class="custom-card">
      <h2>{{ name }}</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        
      </div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomCard',
    props: {
      ticker: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      data: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: null
      }
    }
  }
  </script>

<style scoped>
.custom-card {
    background-color: #023A6233;
    padding: 24px;
    border-radius: 20px;
}
</style>
