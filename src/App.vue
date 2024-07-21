<template>
  <div id="app" class="app">
    <div style="position: relative">
      <div class="stroke"></div>
      <h1>The Magnificent Seven Companies</h1>
    </div>
    <div class="box-overview">
      <CustomCard v-for="ticker in stockTickers" :key="ticker.symbol" :ticker="ticker.symbol" :name="ticker.name"
        :data="stockData[ticker.symbol]" :loading="loading[ticker.symbol]" :error="error[ticker.symbol]" />
    </div>
    <div class="box-diagramm">
      <RevenueChart :stockData="stockData" class="line-chart" />
      <RevenueDonutChart :stockData="stockData" class="donut-chart" />
    </div>
    <div class="box-diagramm">
      <RevenueBarChart :stockData="stockData" class="bar-chart" />
      <GrossMarginBarChart :stockData="stockData" class="bar-chart" />
      <RevenueGrowthChart :stockData="stockData" class="bar-chart" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import CustomCard from '@/component/CustomCard.vue';
// import ApiService from '@/services/apiService';
import RevenueChart from './component/RevenueChart.vue';
import RevenueDonutChart from './component/RevenueDonutChart.vue'
import RevenueBarChart from './component/RevenueBarChart.vue';
import GrossMarginBarChart from './component/grossMarginBarChart.vue'
import RevenueGrowthChart from './component/RevenueGrowthChart.vue'

export default {
  name: 'App',
  components: {
    CustomCard,
    RevenueChart,
    RevenueDonutChart,
    RevenueBarChart,
    GrossMarginBarChart,
    RevenueGrowthChart

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
        },
        NetIncome: {
          'Q1 2021': '23630', 'Q2 2021': '21744', 'Q3 2021': '20551', 'Q4 2021': '20721',
          'Q1 2022': '34630', 'Q2 2022': '19442', 'Q3 2022': '20721', 'Q4 2022': '30006',
          'Q1 2023': '24160', 'Q2 2023': '19881', 'Q3 2023': '22956', 'Q4 2023': '22957'
        },
        GrossMargin: {
          'Q1 2021': '42.5', 'Q2 2021': '43.3', 'Q3 2021': '43.1', 'Q4 2021': '43.8',
          'Q1 2022': '43.7', 'Q2 2022': '43.3', 'Q3 2022': '42.3', 'Q4 2022': '42.5',
          'Q1 2023': '44.3', 'Q2 2023': '44.5', 'Q3 2023': '44.1', 'Q4 2023': '45.2'
        }
      },
      '$AMZN': {
        name: 'Amazon',
        Revenue: {
          'Q1 2021': '108518', 'Q2 2021': '113080', 'Q3 2021': '110812', 'Q4 2021': '137412',
          'Q1 2022': '116444', 'Q2 2022': '121234', 'Q3 2022': '127101', 'Q4 2022': '149204',
          'Q1 2023': '127358', 'Q2 2023': '134383', 'Q3 2023': '143083', 'Q4 2023': '169961'
        },
        NetIncome: {
          'Q1 2021': '8107', 'Q2 2021': '7778', 'Q3 2021': '3156', 'Q4 2021': '14323',
          'Q1 2022': '-3844', 'Q2 2022': '-2028', 'Q3 2022': '2872', 'Q4 2022': '278',
          'Q1 2023': '3172', 'Q2 2023': '6746', 'Q3 2023': '9880', 'Q4 2023': '10624'
        },
        GrossMargin: {
          'Q1 2021': '39.6', 'Q2 2021': '40.3', 'Q3 2021': '41.5', 'Q4 2021': '42.4',
          'Q1 2022': '42.0', 'Q2 2022': '41.8', 'Q3 2022': '42.1', 'Q4 2022': '43.8',
          'Q1 2023': '45.4', 'Q2 2023': '46.0', 'Q3 2023': '46.5', 'Q4 2023': '46.8'
        }
      },
      '$GOOG': {
        name: 'Alphabet',
        Revenue: {
          'Q1 2021': '55314', 'Q2 2021': '61880', 'Q3 2021': '65118', 'Q4 2021': '75325',
          'Q1 2022': '68011', 'Q2 2022': '69685', 'Q3 2022': '69092', 'Q4 2022': '76048',
          'Q1 2023': '69787', 'Q2 2023': '74604', 'Q3 2023': '76693', 'Q4 2023': '86310'
        },
        NetIncome: {
          'Q1 2021': '17930', 'Q2 2021': '18525', 'Q3 2021': '18936', 'Q4 2021': '20642',
          'Q1 2022': '16436', 'Q2 2022': '16002', 'Q3 2022': '13910', 'Q4 2022': '13624',
          'Q1 2023': '15051', 'Q2 2023': '18368', 'Q3 2023': '19689', 'Q4 2023': '20687'
        },
        GrossMargin: {
          'Q1 2021': '55.4', 'Q2 2021': '56.8', 'Q3 2021': '57.0', 'Q4 2021': '56.9',
          'Q1 2022': '55.9', 'Q2 2022': '55.2', 'Q3 2022': '54.5', 'Q4 2022': '53.8',
          'Q1 2023': '55.2', 'Q2 2023': '55.8', 'Q3 2023': '56.1', 'Q4 2023': '56.5'
        }
      },
      '$META': {
        name: 'Meta',
        Revenue: {
          'Q1 2021': '26171', 'Q2 2021': '29077', 'Q3 2021': '29010', 'Q4 2021': '33671',
          'Q1 2022': '27908', 'Q2 2022': '28822', 'Q3 2022': '27714', 'Q4 2022': '32165',
          'Q1 2023': '28645', 'Q2 2023': '31999', 'Q3 2023': '34146', 'Q4 2023': '40111'
        },
        NetIncome: {
          'Q1 2021': '9497', 'Q2 2021': '10394', 'Q3 2021': '9194', 'Q4 2021': '10285',
          'Q1 2022': '7465', 'Q2 2022': '6687', 'Q3 2022': '4395', 'Q4 2022': '4652',
          'Q1 2023': '5709', 'Q2 2023': '7788', 'Q3 2023': '11581', 'Q4 2023': '14017'
        },
        GrossMargin: {
          'Q1 2021': '80.5', 'Q2 2021': '81.0', 'Q3 2021': '80.0', 'Q4 2021': '80.3',
          'Q1 2022': '79.8', 'Q2 2022': '79.1', 'Q3 2022': '78.5', 'Q4 2022': '77.8',
          'Q1 2023': '78.5', 'Q2 2023': '79.2', 'Q3 2023': '80.0', 'Q4 2023': '80.5'
        }
      },
      '$MSFT': {
        name: 'Microsoft',
        Revenue: {
          'Q1 2021': '41706', 'Q2 2021': '46152', 'Q3 2021': '45317', 'Q4 2021': '51728',
          'Q1 2022': '49360', 'Q2 2022': '51865', 'Q3 2022': '50122', 'Q4 2022': '52747',
          'Q1 2023': '52857', 'Q2 2023': '56194', 'Q3 2023': '56517', 'Q4 2023': '62140'
        },
        NetIncome: {
          'Q1 2021': '15457', 'Q2 2021': '16458', 'Q3 2021': '16458', 'Q4 2021': '18765',
          'Q1 2022': '18765', 'Q2 2022': '16731', 'Q3 2022': '16741', 'Q4 2022': '16740',
          'Q1 2023': '17556', 'Q2 2023': '18299', 'Q3 2023': '21872', 'Q4 2023': '20075'
        },
        GrossMargin: {
          'Q1 2021': '69.7', 'Q2 2021': '70.2', 'Q3 2021': '69.7', 'Q4 2021': '69.8',
          'Q1 2022': '68.7', 'Q2 2022': '68.4', 'Q3 2022': '68.3', 'Q4 2022': '67.2',
          'Q1 2023': '67.7', 'Q2 2023': '68.3', 'Q3 2023': '69.0', 'Q4 2023': '69.5'
        }
      },
      '$NVDA': {
        name: 'NVIDIA',
        Revenue: {
          'Q1 2021': '5661', 'Q2 2021': '6507', 'Q3 2021': '7103', 'Q4 2021': '7643',
          'Q1 2022': '8288', 'Q2 2022': '6704', 'Q3 2022': '5931', 'Q4 2022': '6051',
          'Q1 2023': '7192', 'Q2 2023': '13507', 'Q3 2023': '18120', 'Q4 2023': '22137'
        },
        NetIncome: {
          'Q1 2021': '1912', 'Q2 2021': '2374', 'Q3 2021': '2464', 'Q4 2021': '3003',
          'Q1 2022': '3443', 'Q2 2022': '656', 'Q3 2022': '680', 'Q4 2022': '1414',
          'Q1 2023': '2043', 'Q2 2023': '6188', 'Q3 2023': '9243', 'Q4 2023': '12285'
        },
        GrossMargin: {
          'Q1 2021': '64.1', 'Q2 2021': '64.8', 'Q3 2021': '65.2', 'Q4 2021': '65.5',
          'Q1 2022': '65.5', 'Q2 2022': '43.5', 'Q3 2022': '53.6', 'Q4 2022': '63.3',
          'Q1 2023': '66.8', 'Q2 2023': '70.1', 'Q3 2023': '71.2', 'Q4 2023': '72.5'
        }
      },
      '$TSLA': {
        name: 'Tesla',
        Revenue: {
          'Q1 2021': '10389', 'Q2 2021': '11958', 'Q3 2021': '13757', 'Q4 2021': '17719',
          'Q1 2022': '18756', 'Q2 2022': '16934', 'Q3 2022': '21454', 'Q4 2022': '24318',
          'Q1 2023': '23329', 'Q2 2023': '24927', 'Q3 2023': '23350', 'Q4 2023': '25167'
        },
        NetIncome: {
          'Q1 2021': '438', 'Q2 2021': '1142', 'Q3 2021': '1618', 'Q4 2021': '2321',
          'Q1 2022': '3318', 'Q2 2022': '2259', 'Q3 2022': '3292', 'Q4 2022': '3687',
          'Q1 2023': '2513', 'Q2 2023': '2704', 'Q3 2023': '1853', 'Q4 2023': '2486'
        },
        GrossMargin: {
          'Q1 2021': '26.5', 'Q2 2021': '28.4', 'Q3 2021': '30.5', 'Q4 2021': '27.4',
          'Q1 2022': '32.9', 'Q2 2022': '25.0', 'Q3 2022': '25.1', 'Q4 2022': '23.8',
          'Q1 2023': '19.3', 'Q2 2023': '18.2', 'Q3 2023': '17.9', 'Q4 2023': '18.9'
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

h1 {
  margin-left: 32px;
  font-size: 36px;
  font-weight: 500;
  line-height: 42.66px;
  text-align: left;
}
.stroke{
  position: absolute;
  background: #39DAFF;
  border-radius: 0 100px 100px 0;
  height: 32px;
  width: 100vw;
  right: 100%;
  top: 32px;
}
.app {
  max-width: 1280px;
  padding: 36px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.box-diagramm {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

.line-chart {
  height: 30vh;
  width: 66%;
  background: #011F35;
  border-radius: 20px;
  padding: 20px 32px;
}

.donut-chart {
  height: 30vh;
  width: 33%;
  background: #011F35;
  border-radius: 20px;
  padding: 20px 49px;
}

.bar-chart {
  height: 30vh;
  width: 33%;
  background-color: #011F35;
  border-radius: 20px;
  padding: 20px;
}

.box-overview {
  display: flex;
  gap: 24px;
  overflow: auto;
  background: #023A6233;
  height: 190px;
  padding: 24px;
  border-radius: 20px;
}
</style>
