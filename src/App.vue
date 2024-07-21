<template>
  <div id="app">
    <CustomCard
      v-for="ticker in stockTickers"
      :key="ticker.symbol"
      :ticker="ticker.symbol"
      :name="ticker.name"
      :data="stockData[ticker.symbol]"
      :loading="loading[ticker.symbol]"
      :error="error[ticker.symbol]"
    />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import CustomCard from '@/component/CustomCard.vue';
import ApiService from '@/services/apiService';

export default {
  name: 'App',
  components: {
    CustomCard
  },
  setup() {
    const stockTickers = [
      { symbol: '$AAPL', name: 'Apple Inc.', indices: { Revenue: 1, 'Net Income': 32, 'Gross Margin': 19 } },
      { symbol: '$AMZN', name: 'Amazon.com, Inc.', indices: { Revenue: 5, 'Net Income': 37, 'Gross Margin': 11 } },
      { symbol: '$GOOG', name: 'Alphabet Inc.', indices: { Revenue: 1, 'Net Income': 37, 'Gross Margin': 21 } },
      { symbol: '$META', name: 'Meta Platforms, Inc.', indices: { Revenue: 1, 'Net Income': 23, 'Gross Margin': 7 } },
      { symbol: '$MSFT', name: 'Microsoft Corporation', indices: { Revenue: 5, 'Net Income': 26, 'Gross Margin': 11 } },
      { symbol: '$NVDA', name: 'NVIDIA Corporation', indices: { Revenue: 1, 'Net Income': 25, 'Gross Margin': 7 } },
      { symbol: '$TSLA', name: 'Tesla, Inc.', indices: { Revenue: 9, 'Net Income': 40, 'Gross Margin': 22 } }
    ];

    const stockData = ref({});
    const loading = reactive({});
    const error = reactive({});

    const fetchStockData = async (ticker) => {
      loading[ticker.symbol] = true;
      error[ticker.symbol] = null;
      try {
        const response = await ApiService.fetchData(ticker.symbol, Object.values(ticker.indices));
        console.log(`Raw data for ${ticker.symbol}:`, response);

        if (Array.isArray(response)) {
          // Mapping der Daten
          const mappedData = Object.keys(ticker.indices).reduce((acc, key, index) => {
            const dataObject = response[index];
            if (dataObject && typeof dataObject === 'object') {
              // Entferne den ersten Eintrag (der leere Schlüssel-Wert-Paar)
              const rest = { ...dataObject };
              delete rest[""];
              acc[key] = rest;
            } else {
              acc[key] = dataObject;
            }
            return acc;
          }, {});

          stockData.value[ticker.symbol] = mappedData;
          console.log(`Mapped data for ${ticker.symbol}:`, mappedData);
        } else {
          console.error(`Unexpected data structure for ${ticker.symbol}:`, response);
          stockData.value[ticker.symbol] = {};
          error[ticker.symbol] = `Invalid data structure for ${ticker.symbol}`;
        }
      } catch (err) {
        console.error(`Error fetching data for ${ticker.symbol}:`, err);
        error[ticker.symbol] = `Error fetching data for ${ticker.symbol}: ${err.message}`;
        stockData.value[ticker.symbol] = {};
      } finally {
        loading[ticker.symbol] = false;
      }
    };

    const fetchAllStockData = () => {
      stockTickers.forEach((ticker) => fetchStockData(ticker));
    };

    onMounted(() => {
      fetchAllStockData();
    });

    return {
      stockTickers,
      stockData,
      loading,
      error,
    };
  },
};
</script>

<style>
body {
  margin: 0;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  min-height: 100vh;
  min-width: 100%;
  color: #ffff;
}
</style>
