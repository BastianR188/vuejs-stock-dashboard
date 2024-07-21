<template>
    <div class="chart-container">
        <canvas ref="grossMarginBarChart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);

export default {
    name: 'GrossMarginBarChart',
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
            const ctx = this.$refs.grossMarginBarChart.getContext('2d');

            // Extrahieren und Sortieren der Gross Margin Werte für das letzte Quartal
            const grossMarginData = Object.entries(this.stockData)
                .map(([, data]) => ({
                    name: data.name,
                    value: parseFloat(Object.values(data.GrossMargin).pop())
                }))
                .sort((a, b) => b.value - a.value);

            const labels = grossMarginData.map(item => item.name);
            const data = grossMarginData.map(item => item.value);

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
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            grid: {
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff',
                                callback: function (value) {
                                    return value + '%';
                                }
                            },
                            title: {
                                display: true,
                                text: 'Gross Margin (%)',
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
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Gross Margin in % LQ',
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
                            formatter: (value) => value.toFixed(1) + '%'
                        }
                    }
                }
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