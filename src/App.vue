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
import DataService from '@/services/dataService';

export default {
  name: 'App',
  components: {
    CustomCard
  },
  setup() {
    const stockTickers = [
      { symbol: '$AAPL', name: 'Apple Inc.' },
      { symbol: '$MSFT', name: 'Microsoft Corporation' },
      { symbol: '$GOOG', name: 'Alphabet Inc.' },
      { symbol: '$NVDA', name: 'NVIDIA Corporation' },
      { symbol: '$AMZN', name: 'Amazon.com, Inc.' },
      { symbol: '$META', name: 'Meta Platforms, Inc.' }
    ];
    
    const stockData = ref({});
    const loading = reactive({});
    const error = reactive({});

    const fetchStockData = async (ticker) => {
      loading[ticker] = true;
      error[ticker] = null;
      try {
        const response = await ApiService.fetchData(ticker);
        console.log(`Raw data for ${ticker}:`, response); // Log raw data

        if (Array.isArray(response)) {
          stockData.value[ticker] = DataService.sortDataByDate(response);
        } else {
          console.error(`Unexpected data structure for ${ticker}:`, response);
          stockData.value[ticker] = [];
          error[ticker] = `Invalid data structure for ${ticker}`;
        }
      } catch (err) {
        console.error(`Error fetching data for ${ticker}:`, err);
        error[ticker] = `Error fetching data for ${ticker}: ${err.message}`;
        stockData.value[ticker] = [];
      } finally {
        loading[ticker] = false;
      }
    };

    const fetchAllStockData = () => {
      stockTickers.forEach(({ symbol }) => fetchStockData(symbol));
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
