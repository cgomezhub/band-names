import React, { useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export const BandChart = () => {
    const { socket } = useContext(SocketContext);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            crearGrafica(bands);
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [socket]);

    const crearGrafica = (bands = []) => {
        const ctx = chartRef.current.getContext('2d');
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                animation: false,
                scales: {
                    xAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    };

    return (
        <canvas id="myChart" ref={chartRef}></canvas>
    );
};