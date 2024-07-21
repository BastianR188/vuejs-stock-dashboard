<template>
  <div class="custom-card">
    <h2>{{ name }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="box-data">
      <div>Revenue {{ getLastDate() }}</div>
      <div class="box">
        <div class="revenue"><strong>{{ getLastValue(data['Revenue']) }}</strong></div>
        <div class="other">
          <div>
            <span :style="{ color: getValueColor('Net Income', getLastValue(data['Net Income'])) }">
              <strong>{{ getLastValue(data['Net Income']) }}</strong>
              <span v-if="isPositive(getLastValue(data['Net Income']))"> ↑</span>
              <span v-else> ↓</span>
            </span>
          </div>
          <div>
            <span :style="{ color: getValueColor('Gross Margin', getLastValue(data['Gross Margin'])) }">
              <strong>{{ getLastValue(data['Gross Margin']) }}</strong>
            </span>
          </div>
        </div>
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
      if (!obj) return 'N/A'; // Fallback, falls das Objekt undefined ist
      const values = Object.values(obj);
      return values[values.length - 1];
    },
    getLastDate() {
      // Nehmen Sie den ersten Eintrag in data (z.B. Revenue)
      const firstEntry = Object.values(this.data)[0];
      if (firstEntry && typeof firstEntry === 'object') {
        const keys = Object.keys(firstEntry);
        return keys[keys.length - 1];
      }
      return 'N/A'; // Fallback, falls keine Daten vorhanden sind
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
  background: #011F35;
  padding: 24px;
  border-radius: 20px;
  min-width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
}

h2 {
  margin: 0 !important;
}

.box {
  display: flex;
  align-items: center;
  gap: 5px;
}

.box-data {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.revenue {
  font-size: 24px;
  font-weight: 500;
  line-height: 28.44px;
  text-align: left;
}

.other {
  font-size: 13px;
  font-weight: 500;
  line-height: 15.41px;
  text-align: left;
  white-space: nowrap;
}
</style>
