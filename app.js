function generateData() {
    return Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
}

// Chart Configurations
const config = (label, color) => ({
    type: 'line',
    data: {
        labels: Array.from({ length: 50 }, (_, i) => i),
        datasets: [{
            label: label,
            data: generateData(),
            borderColor: color,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            backgroundColor: "rgba(0,0,0,0)"
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: { color: '#ccc' },
                grid: { color: '#555' }
            },
            y: {
                ticks: { color: '#ccc' },
                grid: { color: '#555' }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#0fdb84'
                }
            }
        },
        animation: false
    }
});

// Initialize Charts
const ecgChart = new Chart(document.getElementById('ecgChart').getContext('2d'), config('ECG Signal', 'red'));
const heartRateChart = new Chart(document.getElementById('heartRateChart').getContext('2d'), config('Heart Rate', 'yellow'));
const bloodPressureChart = new Chart(document.getElementById('bloodPressureChart').getContext('2d'), config('Blood Pressure', 'blue'));

// Update Status Label Based on Random Conditions
function updateStatus() {
    const status = document.getElementById('statusLabel');
    const randomValue = Math.random();
    if (randomValue > 0.7) {
        status.textContent = 'Status: Danger';
        status.className = 'danger';
    } else if (randomValue > 0.3) {
        status.textContent = 'Status: Normal';
        status.className = 'normal';
    } else {
        status.textContent = 'Status: Safe';
        status.className = 'safe';
    }
}

// Real-time Data Updates
function updateCharts() {
    [ecgChart, heartRateChart, bloodPressureChart].forEach(chart => {
        chart.data.datasets[0].data.push(Math.floor(Math.random() * 100));
        chart.data.datasets[0].data.shift();
        chart.update();
    });
    updateStatus();
}

// Update every 500ms
setInterval(updateCharts, 500);

// this is abhishek 