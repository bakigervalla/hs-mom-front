import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {

        BaunceRate: 4000/100,
        pv: 2400/100,
        amt: 2400/100,
    },
    {
        BaunceRate: 3000/100,
        pv: 1398/100,
        amt: 2210/100,
    },
    {
        BaunceRate: 2000/100,
        pv: 9800/100,
        amt: 2290/100,
    },
    {
        BaunceRate: 2780/100,
        pv: 3908/100,
        amt: 2000/100,
    },
    {
        BaunceRate: 1890/100,
        pv: 4800/100,
        amt: 2181/100,
    },
    {
        BaunceRate: 2390/100,
        pv: 3800/100,
        amt: 2500/100,
    },
    {
        BaunceRate: 3490/100,
        pv: 4300/100,
        amt: 2100/100,
    },
];

export const HSAreaChart = () => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis orientation='right' tickCount={3} unit="%"/>
                <Tooltip />
                <Area type="monotone" dataKey="BaunceRate" stroke="#6EBC7F" fill="#D1EAD7" />
            </AreaChart>
        </ResponsiveContainer>
    );
}