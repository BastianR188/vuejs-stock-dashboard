<template>
  <div id="app">
    <div class="box-overview">
      <CustomCard v-for="ticker in stockTickers" :key="ticker.symbol" :ticker="ticker.symbol" :name="ticker.name"
        :data="stockData[ticker.symbol]" :loading="loading[ticker.symbol]" :error="error[ticker.symbol]" />
    </div>
    <div>
      <RevenueChart :stockData="stockData" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import CustomCard from '@/component/CustomCard.vue';
// import ApiService from '@/services/apiService';
import RevenueChart from './component/RevenueChart.vue';

export default {
  name: 'App',
  components: {
    CustomCard,
    RevenueChart
  },
  setup() {
    // const stockTickers = [
    //   { symbol: '$AAPL', name: 'Apple', indices: { Revenue: 1, 'Net Income': 32, 'Gross Margin': 19 } },
    //   { symbol: '$AMZN', name: 'Amazon', indices: { Revenue: 5, 'Net Income': 37, 'Gross Margin': 11 } },
    //   { symbol: '$GOOG', name: 'Alphabet', indices: { Revenue: 1, 'Net Income': 37, 'Gross Margin': 21 } },
    //   { symbol: '$META', name: 'Meta', indices: { Revenue: 1, 'Net Income': 23, 'Gross Margin': 7 } },
    //   { symbol: '$MSFT', name: 'Microsoft Corporation', indices: { Revenue: 5, 'Net Income': 26, 'Gross Margin': 11 } },
    //   { symbol: '$NVDA', name: 'NVIDIA Corporation', indices: { Revenue: 1, 'Net Income': 25, 'Gross Margin': 7 } },
    //   { symbol: '$TSLA', name: 'Tesla', indices: { Revenue: 9, 'Net Income': 40, 'Gross Margin': 22 } }
    // ];

    // const stockData = ref({});
    // const loading = reactive({});
    // const error = reactive({});
    const testStockData = {
      '$AAPL': {
        name: 'Apple',
        Revenue: {
          'Q1 2021': '111439', 'Q2 2021': '89584', 'Q3 2021': '81434', 'Q4 2021': '83360',
          'Q1 2022': '123945', 'Q2 2022': '97278', 'Q3 2022': '82959', 'Q4 2022': '90146',
          'Q1 2023': '117154', 'Q2 2023': '94836', 'Q3 2023': '81797', 'Q4 2023': '89498'
        }
      },
      '$AMZN': {
        name: 'Amazon',
        Revenue: {
          'Q1 2021': '108518', 'Q2 2021': '113080', 'Q3 2021': '110812', 'Q4 2021': '137412',
          'Q1 2022': '116444', 'Q2 2022': '121234', 'Q3 2022': '127101', 'Q4 2022': '149204',
          'Q1 2023': '127358', 'Q2 2023': '134383', 'Q3 2023': '143083', 'Q4 2023': '169961'
        }
      },
      '$GOOG': {
        name: 'Alphabet',
        Revenue: {
          'Q1 2021': '55314', 'Q2 2021': '61880', 'Q3 2021': '65118', 'Q4 2021': '75325',
          'Q1 2022': '68011', 'Q2 2022': '69685', 'Q3 2022': '69092', 'Q4 2022': '76048',
          'Q1 2023': '69787', 'Q2 2023': '74604', 'Q3 2023': '76693', 'Q4 2023': '86310'
        }
      },
      '$META': {
        name: 'Meta',
        Revenue: {
          'Q1 2021': '26171', 'Q2 2021': '29077', 'Q3 2021': '29010', 'Q4 2021': '33671',
          'Q1 2022': '27908', 'Q2 2022': '28822', 'Q3 2022': '27714', 'Q4 2022': '32165',
          'Q1 2023': '28645', 'Q2 2023': '31999', 'Q3 2023': '34146', 'Q4 2023': '40111'
        }
      },
      '$MSFT': {
        name: 'Microsoft',
        Revenue: {
          'Q1 2021': '41706', 'Q2 2021': '46152', 'Q3 2021': '45317', 'Q4 2021': '51728',
          'Q1 2022': '49360', 'Q2 2022': '51865', 'Q3 2022': '50122', 'Q4 2022': '52747',
          'Q1 2023': '52857', 'Q2 2023': '56194', 'Q3 2023': '56517', 'Q4 2023': '62140'
        }
      },
      '$NVDA': {
        name: 'NVIDIA',
        Revenue: {
          'Q1 2021': '5661', 'Q2 2021': '6507', 'Q3 2021': '7103', 'Q4 2021': '7643',
          'Q1 2022': '8288', 'Q2 2022': '6704', 'Q3 2022': '5931', 'Q4 2022': '6051',
          'Q1 2023': '7192', 'Q2 2023': '13507', 'Q3 2023': '18120', 'Q4 2023': '22137'
        }
      },
      '$TSLA': {
        name: 'Tesla',
        Revenue: {
          'Q1 2021': '10389', 'Q2 2021': '11958', 'Q3 2021': '13757', 'Q4 2021': '17719',
          'Q1 2022': '18756', 'Q2 2022': '16934', 'Q3 2022': '21454', 'Q4 2022': '24318',
          'Q1 2023': '23329', 'Q2 2023': '24927', 'Q3 2023': '23350', 'Q4 2023': '25167'
        }
      }
    };

    const stockTickers = Object.keys(testStockData).map(symbol => ({
      symbol,
      name: testStockData[symbol].name,
      indices: { Revenue: 1 }
    }));

    const stockData = ref(testStockData);
    const loading = reactive(Object.fromEntries(stockTickers.map(ticker => [ticker.symbol, false])));
    const error = reactive(Object.fromEntries(stockTickers.map(ticker => [ticker.symbol, null])));

    onMounted(() => {
      console.log('Test stock data loaded:', stockData.value);
    });

    return {
      stockTickers,
      stockData,
      loading,
      error,

    // const fetchStockData = async (ticker) => {
    //   loading[ticker.symbol] = true;
    //   error[ticker.symbol] = null;
    //   try {
    //     const response = await ApiService.fetchData(ticker.symbol, Object.values(ticker.indices));
    //     console.log(`Raw data for ${ticker.symbol}:`, response);

    //     if (Array.isArray(response)) {
    //       // Mapping der Daten
    //       const mappedData = Object.keys(ticker.indices).reduce((acc, key, index) => {
    //         const dataObject = response[index];
    //         if (dataObject && typeof dataObject === 'object') {
    //           // Entferne den ersten Eintrag (der leere Schlüssel-Wert-Paar)
    //           const rest = { ...dataObject };
    //           delete rest[""];
    //           acc[key] = rest;
    //         } else {
    //           acc[key] = dataObject;
    //         }
    //         return acc;
    //       }, {});

    //       stockData.value[ticker.symbol] = mappedData;
    //       console.log(`Mapped data for ${ticker.symbol}:`, mappedData);
    //     } else {
    //       console.error(`Unexpected data structure for ${ticker.symbol}:`, response);
    //       stockData.value[ticker.symbol] = {};
    //       error[ticker.symbol] = `Invalid data structure for ${ticker.symbol}`;
    //     }
    //   } catch (err) {
    //     console.error(`Error fetching data for ${ticker.symbol}:`, err);
    //     error[ticker.symbol] = `Error fetching data for ${ticker.symbol}: ${err.message}`;
    //     stockData.value[ticker.symbol] = {};
    //   } finally {
    //     loading[ticker.symbol] = false;
    //   }
    // };

    // const fetchAllStockData = () => {
    //   stockTickers.forEach((ticker) => fetchStockData(ticker));
    // };

    // onMounted(() => {
    //   fetchAllStockData();
    // });

    // return {
    //   stockTickers,
    //   stockData,
    //   loading,
    //   error,
    };
  },
};
</script>

<style>
body {
  font-family: Rubik;
  margin: 0;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  min-height: 100vh;
  min-width: 100%;
  color: #ffff;
}

.box-overview {
  display: flex;
  gap: 15px;
  margin: 35px;
  overflow: auto;
  background: #023A6233;
}
</style>
