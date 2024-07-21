<template>
    <div class="custom-card">
      <h2>{{ name }}</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <!-- Hier zeigen wir nur die Länge des Arrays an -->
        <p>Anzahl der Datenpunkte: {{ data.length }}</p>
        <!-- Wenn Sie die ersten paar Elemente anzeigen möchten: -->
        <p>Erste 5 Elemente:</p>
        <ul>
          <li v-for="(item, index) in data.slice(0, 5)" :key="index">
            {{ item }}
          </li>
        </ul>
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
