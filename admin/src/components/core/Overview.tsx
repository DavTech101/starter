'use client';

import React from 'react';
import { Euro } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type OverviewProps = {
  data: any[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Bar dataKey='total' fill='#3498db' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
