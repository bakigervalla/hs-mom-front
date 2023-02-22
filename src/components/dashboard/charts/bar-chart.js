import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'S',
        Paid: 9000/1000,
        Organic: 8500/1000,
        amt: 2400/1000,
    },
    {
        name: 'M',
        Paid: 8000/1000,
        Organic: 7398/1000,
        amt: 2210/1000,
    },
    {
        name: 'W',
        Paid: 2000/1000,
        Organic: 9800/1000,
        amt: 2290/1000,
    },
    {
        name: 'T',
        Paid: 2780/1000,
        Organic: 3908/1000,
        amt: 2000/1000,
    },
    {
        name: 'F',
        Paid: 1890/1000,
        Organic: 4800/1000,
        amt: 2181/1000,
    },
    {
        name: 'S',
        Paid: 2390/1000,
        Organic: 3800/1000,
        amt: 2500/1000,
    }
];

export const HSBarChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis orientation='right' tickCount={3} unit="K"/>
                <Tooltip />
                <Bar dataKey="Organic" fill="#CAECFF" />
                <Bar dataKey="Paid" fill="#1E2875" />
            </BarChart>
        </ResponsiveContainer>
    );
}