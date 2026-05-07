'use client';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EnergyChart = ({ percentage = 0, color = '#10B981', bgColor = '#E5E7EB', size = 200 }) => {

  const radius = size / 2;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;

  const data = [
    { name: 'انرژی', value: percentage, fill: color },
    { name: 'باقی‌مانده', value: 100 - percentage, fill: bgColor },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={normalizedRadius}
            outerRadius={radius}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            paddingAngle={0}
            cornerRadius={percentage > 0 ? 10 : 0}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute flex flex-col items-center justify-center text-[#1E2022]">
        <span className="text-2xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default EnergyChart;
