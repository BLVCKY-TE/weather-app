import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HourlyGraph = ({ forecastData }) => {
  const [chartData, setChartData] = useState(null);

  // Transform the forecast data into the format needed for the chart
  useEffect(() => {
    if (forecastData) {
      const hourlyData = forecastData.list.filter((item) => {
        const timestamp = new Date(item.dt * 1000); 
        const today = new Date();
        return timestamp.getDate() === today.getDate(); // Only include data for today
      });

      // Prepare data for the chart
      const labels = hourlyData.map(item => {
        const timestamp = new Date(item.dt * 1000);
        return `${timestamp.getHours()}:${timestamp.getMinutes()}`;
      });
      const temperatures = hourlyData.map(item => item.main.temp);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            fill: false, // No filling beneath the line
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of points
            pointRadius: 5, // Size of the points
            borderWidth: 2, // Width of the line
            tension: 0.1, // A small curve for the line
          }
        ]
      });
    }
  }, [forecastData]);

  return (
    <div className="weather-chart-container">
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: false, // Hide the chart title
              },
              tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Tooltip background
              }
            },
            scales: {
              x: {
                display: true, // Show the x-axis (time of day)
                title: {
                  display: false, // Hide the title of the axis
                },
                ticks: {
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                display: true, // Show the y-axis (temperature)
                title: {
                  display: false, // Hide the title of the axis
                },
                ticks: {
                  font: {
                    size: 14,
                  },
                  callback: (value) => `${value}°C`, // Show temperature with degree symbol
                },
              }
            },
            elements: {
              point: {
                radius: 5, // Make sure the points are visible
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default HourlyGraph;
