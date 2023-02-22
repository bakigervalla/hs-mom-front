import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Paid', value: 52000/1000 },
    { name: 'Organic', value: 4400/1000 },
];
const COLORS = ['#1E2875', '#CAECFF'];

export const HSDonutChart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie dataKey="value"
                    data={data}
                    cx={145} cy={110} innerRadius={55} outerRadius={80}
                    fill="#1E2875" />
                <Tooltip />
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </PieChart>
        </ResponsiveContainer>
    );
}