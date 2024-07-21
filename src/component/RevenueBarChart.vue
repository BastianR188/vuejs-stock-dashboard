<template>
    <div class="chart-container">
        <canvas ref="revenueBarChart"></canvas>
    </div>
</template>

<script>
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: 'RevenueBarChart',
    props: {
        stockData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null,
            colors: [
                '#39DAFF',
                '#31BFE2',
                '#29A5C5',
                '#218AA8',
                '#196F8C',
                '#11546F',
                '#093A52'
            ]
        }
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = this.$refs.revenueBarChart.getContext('2d');

            // Extrahieren und Sortieren der Net Income TTM Werte
            const netIncomeData = Object.entries(this.stockData)
                .map(([, data]) => ({
                    name: data.name,
                    value: parseFloat(Object.values(data.NetIncome).pop())
                }))
                .sort((a, b) => b.value - a.value);

            const labels = netIncomeData.map(item => item.name);
            const data = netIncomeData.map(item => item.value);

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: this.colors,
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', // Balken von links nach rechts
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            grid: {
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff'
                            },
                            title: {
                                display: true,
                                text: 'Net Income (in millions USD)',
                                color: '#ffffff'
                            }
                        },
                        y: {
                            grid: {
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Keine Legende erforderlich
                        },
                        title: {
                            display: true,
                            text: 'Net Income TTM',
                            color: '#ffffff',
                            font: {
                                size: 20,
                                weight: 600
                            },
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                            align: 'start'
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                            color: '#ffffff',
                            font: {
                                weight: 'bold'
                            },
                            formatter: (value) => value.toLocaleString()
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        }
    }
}
</script>

<style scoped>
.chart-container {
    position: relative;
}
</style>