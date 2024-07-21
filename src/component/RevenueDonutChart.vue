<template>
    <div class="chart-container">
        <canvas ref="revenueDonutChart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: 'RevenueDonutChart',
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
            const ctx = this.$refs.revenueDonutChart.getContext('2d');

            // Extrahieren und Sortieren der letzten Umsatzwerte
            const lastRevenueData = Object.entries(this.stockData)
                .map(([, data]) => ({
                    name: data.name,
                    value: parseFloat(Object.values(data.Revenue).pop())
                }))
                .sort((a, b) => b.value - a.value);

            const labels = lastRevenueData.map(item => item.name);
            const data = lastRevenueData.map(item => item.value);

            this.chart = new Chart(ctx, {
                type: 'doughnut',
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
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: false,
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#ffffff',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Revenue Breakdown Magnificent Seven',
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