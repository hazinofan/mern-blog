import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PostsCommentsChart() {
    const [monthlyData, setMonthlyData] = useState(new Array(12).fill(0)); // Initialize with 12 zeros
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/post/getPostsByMonth', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust this based on your auth logic
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Update the monthlyData array with counts from the response
                const updatedData = new Array(12).fill(0);
                data.forEach(item => {
                    updatedData[item._id - 1] = item.count;
                });
                setMonthlyData(updatedData);
            } catch (error) {
                console.error('Error fetching monthly data:', error);
            }
        }

        fetchData();
    }, []);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Posts Count',
                data: monthlyData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return <Bar data={data} options={options} />;
}

export default PostsCommentsChart;
