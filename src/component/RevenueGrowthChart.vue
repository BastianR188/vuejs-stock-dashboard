<template>
    <div class="chart-container">
        <canvas ref="revenueGrowthChart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: 'RevenueGrowthChart',
    props: {
        stockData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null,
            colors: ['#39DAFF', '#31BFE2', '#29A5C5', '#218AA8']
        }
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = this.$refs.revenueGrowthChart.getContext('2d');

            const companies = Object.keys(this.stockData);
            const quarters = ['Q1 2024', 'Q4 2023', 'Q3 2023', 'Q2 2023'];

            const datasets = quarters.map((quarter, index) => ({
                label: quarter,
                data: companies.map(company => {
                    const revenueData = this.stockData[company].Revenue;
                    const revenueValues = Object.values(revenueData).slice(-5); // Letzte fünf Werte
                    const currentRevenue = parseFloat(revenueValues[4 - index] || 0);
                    const previousRevenue = parseFloat(revenueValues[3 - index] || 0);
                    const growth = previousRevenue ? (currentRevenue - previousRevenue) / previousRevenue * 100 : 0;
                    return growth.toFixed(2);
                }),
                backgroundColor: this.colors[index],
                borderColor: '#ffffff',
                borderWidth: 1
            }));

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: companies.map(company => this.stockData[company].name),
                    datasets: datasets.reverse() // Wichtig: Umkehrung der Datensätze
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            stacked: false,
                            grid: {
                                display: false // Entfernt vertikale Linien
                            },
                            ticks: {
                                color: '#ffffff'
                            },
                        },
                        y: {
                            stacked: false,
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
                                text: 'Revenue Growth (%)',
                                color: '#ffffff'
                            }
                        }
                    },
                    plugins: {
                        datalabels: false,
                        legend: {
                            position: 'right',
                            reverse: true, // Wichtig: Umkehrung der Legende
                            labels: {
                                color: '#ffffff',
                                boxWidth: 20,
                            }
                        },
                        title: {
                            display: true,
                            text: 'Revenue Growth in % YoY',
                            color: '#ffffff',
                            font: {
                                size: 20
                            },
                            align: 'start',
                            padding: {
                                top: 10,
                                bottom: 30
                            }
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