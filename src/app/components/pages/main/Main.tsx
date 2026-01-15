import { ChevronDown } from 'lucide-react';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

/* ---------- Top section data ---------- */

const poolData = [
  { company: 'Company A', pool: '$3000', executives: 11 },
  { company: 'Company B', pool: '$1000', executives: 15 },
  { company: 'Company C', pool: '$600', executives: 5 },
  { company: 'Company D', pool: '$400', executives: 6 },
];

const barChartData = [
  { year: '2023', value: 3200 },
  { year: '2024', value: 5100 },
  { year: '2025', value: 4900 },
];

const pieChartData = [
  { name: 'Company A', value: 3000, color: '#4472C4' },
  { name: 'Company B', value: 1000, color: '#ED7D31' },
  { name: 'Company C', value: 600, color: '#A5A5A5' },
  { name: 'Company D', value: 400, color: '#FFC000' },
];

/* ---------- Bottom stacked bar chart data (RAW VALUES ONLY) ---------- */

const bonusAllocationData = [
  { company: 'Company D', CEO: 100, CFO: 90, CTO: 0, COO: 80, CMO: 0 },
  { company: 'Company C', CEO: 120, CFO: 30, CTO: 15, COO: 0, CMO: 0 },
  { company: 'Company B', CEO: 300, CFO: 200, CTO: 0, COO: 50, CMO: 0 },
  { company: 'Company A', CEO: 180, CFO: 100, CTO: 50, COO: 70, CMO: 50 },
];

const COLORS = {
  CEO: '#4472C4',
  CFO: '#ED7D31',
  CTO: '#A5A5A5',
  COO: '#FFC000',
  CMO: '#70AD47',
};

export function Main() {
  // Ensure data arrays exist and have values
  const safePoolData = poolData || [];
  const safeBarChartData = barChartData || [];
  const safePieChartData = pieChartData || [];
  const safeBonusAllocationData = bonusAllocationData || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* ================= TOP 3 BLOCKS ================= */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Total Compensation Pool */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-gray-600 mb-2">
            Total Compensation Pool:{' '}
            <span className="text-gray-900">$5000</span>
          </div>

          <div className="mt-4 border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="px-4 py-3 text-left">Company</th>
                  <th className="px-4 py-3 text-left">Pool</th>
                  <th className="px-4 py-3 text-left">No. of Executives</th>
                </tr>
              </thead>
              <tbody>
                {safePoolData.map((row, index) => (
                  <tr
                    key={row.company}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-3">{row.company}</td>
                    <td className="px-4 py-3">{row.pool}</td>
                    <td className="px-4 py-3">{row.executives}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="mb-">Total Compensation Pool Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={safeBarChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Bar dataKey="value" fill="#4472C4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span>Group contribution by:</span>
            <div className="relative">
              <select className="px-3 py-1 border border-gray-300 rounded bg-white appearance-none pr-8 text-sm">
                <option>Netprofit</option>
                <option>Revenue</option>
                <option>Headcount</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={safePieChartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {safePieChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-4 mt-4 text-xs">
            {safePieChartData.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM STACKED BAR ================= */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3>Bonus Allocation by Executive Position</h3>

          <div className="relative">
            <select className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10">
              <option>Tier 1</option>
              <option>Tier 2</option>
              <option>Tier 3</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={safeBonusAllocationData}
            layout="vertical"
            stackOffset="expand"   // ✅ NORMALIZED TO 100%
            margin={{ left: 20, right: 120 }}
            barCategoryGap={18}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              domain={[0, 1]}
              ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
            />

            <YAxis type="category" dataKey="company" width={90} />

            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{ right: 0 }}
            />

            <Bar dataKey="CEO" stackId="a" fill={COLORS.CEO} isAnimationActive={false} />
            <Bar dataKey="CFO" stackId="a" fill={COLORS.CFO} isAnimationActive={false} />
            <Bar dataKey="CTO" stackId="a" fill={COLORS.CTO} isAnimationActive={false} />
            <Bar dataKey="COO" stackId="a" fill={COLORS.COO} isAnimationActive={false} />
            <Bar dataKey="CMO" stackId="a" fill={COLORS.CMO} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-gray-400 text-sm mt-6">Main</div>
    </div>
  );
}
