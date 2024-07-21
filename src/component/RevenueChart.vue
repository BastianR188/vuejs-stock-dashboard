<template>
    <div class="chart-container">
        <canvas ref="revenueChart"></canvas>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    name: 'RevenueChart',
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
    watch: {
        stockData: {
            handler() {
                if (this.chart) {
                    this.chart.destroy();
                }
                this.createChart();
            },
            deep: true
        }
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = this.$refs.revenueChart.getContext('2d');
            const labels = ['Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021',
                'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022',
                'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];

            const datasets = Object.entries(this.stockData).map(([, data], index) => {
                const revenueValues = Object.values(data.Revenue).map(value => parseFloat(value));
                return {
                    label: data.name, // Verwenden Sie den Firmennamen aus den Testdaten
                    data: revenueValues,
                    borderColor: this.colors[index % this.colors.length],
                    backgroundColor: this.colors[index % this.colors.length],
                    tension: 0.1
                };
            }).sort((a, b) => b.data[b.data.length - 1] - a.data[a.data.length - 1]);

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#ffffff'
                            },
                            title: {
                                display: true,
                                text: 'Revenue (in millions USD)',
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff'
                            }
                        },
                        x: {
                            grid: {
                                color: '#ffffff'
                            },
                            title: {
                                display: true,
                                text: 'Quarter',
                                color: '#ffffff'
                            },
                            ticks: {
                                color: '#ffffff'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#ffffff',
                                boxWidth: 32,
                                boxHeight: 12,
                                padding: 8,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Revenue by Company (Quarterly)',
                            color: '#ffffff',
                            font: {
                                size: 20,
                                weight: 600,
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
    height: 80vh;
    width: 100%;
}
</style>