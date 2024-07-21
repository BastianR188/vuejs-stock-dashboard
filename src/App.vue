<template>
  <div id="app">
    <CustomCard v-for="ticker in stockTickers" :key="ticker.symbol" :ticker="ticker.symbol" :name="ticker.name"
      :data="stockData[ticker.symbol]" :loading="loading[ticker.symbol]" :error="error[ticker.symbol]" />
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
      { symbol: '$AAPL', name: 'Apple Inc.', indices: [5, 36, 23] },
      { symbol: '$AMZN', name: 'Amazon.com, Inc.', indices: [9, 41, 15] },
      { symbol: '$GOOG', name: 'Alphabet Inc.', indices: [5, 41, 25] },
      { symbol: '$META', name: 'Meta Platforms, Inc.', indices: [5, 27, 11] },
      { symbol: '$MSFT', name: 'Microsoft Corporation', indices: [9, 30, 15] },
      { symbol: '$NVDA', name: 'NVIDIA Corporation', indices: [5, 29, 11] },
      { symbol: '$TSLA', name: 'Tesla, Inc.', indices: [13, 44, 26] }
    ];


    const stockData = ref({});
    const loading = reactive({});
    const error = reactive({});

    const fetchStockData = async (ticker) => {
      loading[ticker.symbol] = true;
      error[ticker.symbol] = null;
      try {
        console.log(`Fetching data for ${ticker.symbol}`);
        const response = await ApiService.fetchData(ticker.symbol, ticker.indices);
        console.log(`Filtered data for ${ticker.symbol}:`, response);

        if (Array.isArray(response)) {
          stockData.value[ticker.symbol] = response;
        } else {
          console.error(`Unexpected data structure for ${ticker.symbol}:`, response);
          stockData.value[ticker.symbol] = [];
          error[ticker.symbol] = `Invalid data structure for ${ticker.symbol}`;
        }
      } catch (err) {
        console.error(`Error fetching data for ${ticker.symbol}:`, err);
        error[ticker.symbol] = `Error fetching data for ${ticker.symbol}: ${err.message}`;
        stockData.value[ticker.symbol] = [];
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
