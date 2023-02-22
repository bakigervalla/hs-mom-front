import React from 'react';
import { LineChart, Line, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '5PM',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '6PM',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '7PM',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '8PM',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '9PM',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    }
];

export const HSLineChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}