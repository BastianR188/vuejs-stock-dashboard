<template>
  <div class="custom-card">
    <h2>{{ name }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="(value, key) in data" :key="key">
        <strong>{{ key }}: </strong> 
        <span :style="{ color: getValueColor(key, getLastValue(value)) }">
          {{ getLastValue(value) }}
          <span v-if="key === 'Net Income'">
            <span v-if="isPositive(getLastValue(value))">↑</span>
            <span v-else>↓</span>
          </span>
        </span>
      </div>
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
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  methods: {
    getLastValue(obj) {
      const values = Object.values(obj);
      return values[values.length - 1];
    },
    getValueColor(key, value) {
      if (key === 'Net Income' || key === 'Gross Margin') {
        const numValue = this.parseValue(value);
        return numValue >= 0 ? 'green' : 'red';
      }
      return 'inherit'; // Standardfarbe für andere Werte
    },
    parseValue(value) {
      // Entfernt Prozentzeichen und wandelt in Zahl um
      return parseFloat(value.replace('%', '').replace(/,/g, ''));
    },
    isPositive(value) {
      const numValue = this.parseValue(value);
      return numValue >= 0;
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

