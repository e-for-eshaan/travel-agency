import React from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

const DayBasePricing = ({ data }) => {
    // Register the required Chart elements and scales
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

    const chartData = {

        labels: ["Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: data ?? 0,
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Set the width and height of the Line chart */}
            <Line
                data={chartData}
                options={chartOptions} />
        </div>
    );
};

export default DayBasePricing;
