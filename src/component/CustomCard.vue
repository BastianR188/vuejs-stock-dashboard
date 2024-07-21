<template>
  <div class="custom-card">
    <div class="title">
      <img :src="getImageSrc(ticker)" alt="">
      <h2>{{ name }}</h2>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="box-data">
      <div>Revenue {{ getLastDate() }}</div>
      <div class="box">
        <div class="revenue"><strong>{{ getLastValue(data['Revenue']) }}</strong></div>
        <div class="other">
          <div>
            <span :style="{ color: getValueColor(getRevenueDifference()) }">
              <strong>{{ getRevenueDifference() }}</strong>
              <span v-if="isPositive(getRevenueDifference())"> ↑</span>
              <span v-else> ↓</span>
            </span>
          </div>
          <div>
            <span :style="{ color: getValueColor(getRevenueGrowth()) }">
              <strong>{{ getRevenueGrowth() }}</strong>
            </span>
          </div>
        </div>

      </div>
      <span class="box-footer">In Bill USD</span>
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
    getImageSrc(ticker) {
      try {
        return require(`@/assets/${ticker}.svg`);
      } catch (e) {
        console.error(e);
        return '';
      }
    },
    getLastValue(obj) {
      if (!obj) return 'N/A'; // Fallback, falls das Objekt undefined ist
      const values = Object.values(obj);
      return values[values.length - 1];
    },
    getSecondLastValue(obj) {
      if (!obj) return 'N/A'; // Fallback, falls das Objekt undefined ist
      const values = Object.values(obj);
      return values[values.length - 2];
    },
    getLastDate() {
      const revenueData = this.data['Revenue'];
      if (revenueData && typeof revenueData === 'object') {
        const keys = Object.keys(revenueData);
        return keys[keys.length - 1]; // Gibt den letzten Key (Datum) zurück
      }
      return 'N/A'; // Fallback, falls keine Daten vorhanden sind
    },
    getRevenueDifference() {
      const lastValue = parseFloat(this.getLastValue(this.data['Revenue']).replace(/,/g, ''));
      const secondLastValue = parseFloat(this.getSecondLastValue(this.data['Revenue']).replace(/,/g, ''));
      const difference = lastValue - secondLastValue;
      return difference.toLocaleString();
    },
    getRevenueGrowth() {
      const lastValue = parseFloat(this.getLastValue(this.data['Revenue']).replace(/,/g, ''));
      const secondLastValue = parseFloat(this.getSecondLastValue(this.data['Revenue']).replace(/,/g, ''));
      const growth = secondLastValue ? ((lastValue - secondLastValue) / secondLastValue) * 100 : 0;
      return growth.toFixed(2) + '%';
    },
    getValueColor(value) {
      const numValue = this.parseValue(value);
      return numValue >= 0 ? 'green' : 'red';
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
  font-size: 20px;
  font-weight: 500;
  line-height: 23.7px;
  text-align: left;
}

img {
  width: 23.7px;
  height: 23.7px;
}
.title{
  display: flex;
  gap: 8px;
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
  font-size: 12px;
  font-weight: 400;
  line-height: 14.22px;
  text-align: left;

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

.box-footer {
  font-size: 8px;
  font-weight: 400;
  line-height: 9.48px;
  text-align: left;

}
</style>
