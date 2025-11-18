        document.addEventListener('DOMContentLoaded', function() {
            // Lógica para Sidebar retrátil
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('sidebar-collapsed');
            });
            
            // Configurações comuns para os gráficos
            const chartDefaultOptions = {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#9ca3af' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#9ca3af' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            };

            const lineChartOptions = {
                 ...chartDefaultOptions,
                 elements: {
                    line: { tension: 0.4, borderWidth: 2 },
                    point: { radius: 0 }
                }
            }
            
            // Gráfico de CPU
            const cpuCtx = document.getElementById('cpuChart').getContext('2d');
            new Chart(cpuCtx, {
                type: 'line',
                data: {
                    labels: Array(12).fill('').map((_, i) => `${i*2}h`),
                    datasets: [{
                        label: 'Uso de CPU',
                        data: [20, 25, 40, 35, 50, 45, 60, 55, 70, 65, 75, 35],
                        borderColor: '#8b5cf6', // violet-500
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                    }]
                },
                options: { ...lineChartOptions, scales: {...lineChartOptions.scales, y: {...lineChartOptions.scales.y, max: 100 }}}
            });

            // Gráfico de RAM
            const ramCtx = document.getElementById('ramChart').getContext('2d');
            new Chart(ramCtx, {
                type: 'line',
                data: {
                    labels: Array(12).fill('').map((_, i) => `${i*2}h`),
                    datasets: [{
                        label: 'Uso de RAM (GB)',
                        data: [8, 10, 12, 11, 15, 14, 18, 17, 20, 19, 22, 16],
                        borderColor: '#3b82f6', // blue-500
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                    }]
                },
                options: { ...lineChartOptions, scales: {...lineChartOptions.scales, y: {...lineChartOptions.scales.y, max: 32 }}}
            });

            // Gráfico de Disco
            const diskCtx = document.getElementById('diskChart').getContext('2d');
            new Chart(diskCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Usado (GB)', 'Livre (GB)'],
                    datasets: [{
                        data: [290, 210], // Ex: 290GB de 500GB usados
                        backgroundColor: ['#8b5cf6', '#3f3f46'],
                        borderColor: '#18181b',
                        borderWidth: 4,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#9ca3af',
                                usePointStyle: true,
                            }
                        }
                    }
                }
            });
        });
