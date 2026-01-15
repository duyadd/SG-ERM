import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type UserRole, type PageType } from '../../Header';
import { PAGE_PATHS } from '../../../constants/pagePaths';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TotalRewardAnalysisProps {
  currentRole: UserRole;
  onNavigate?: (page: PageType) => void;
}

export function TotalRewardAnalysis({ currentRole, onNavigate }: TotalRewardAnalysisProps) {
  const [selectedTier, setSelectedTier] = useState('Tier 1');
  const [selectedCompany, setSelectedCompany] = useState('Company A');
  const [selectedPosition, setSelectedPosition] = useState('CEO');
  const [employeeName, setEmployeeName] = useState('Mahesh Malhotra');
  const [role, setRole] = useState('CEO');
  const [salary, setSalary] = useState(50);
  const [targetBonus, setTargetBonus] = useState(400);
  const [benefits, setBenefits] = useState(50);

  const years = [2023, 2024, 2025];
  const rewardData = years.map((year) => ({
    year: year.toString(),
    basePay: salary * 12,
    bonus: targetBonus,
    benefits: benefits,
  }));

  const totalBonusAmount = targetBonus;
  const totalBenefitsAmount = benefits;
  const totalBasePay = salary * 12;
  const totalReward = totalBonusAmount + totalBenefitsAmount + totalBasePay;

  const rewardBreakdown = [
    { label: 'Base Pay', value: totalBasePay, color: '#4472C4', path: PAGE_PATHS.SUGGEST_BASE_PAY },
    { label: 'Bonus', value: totalBonusAmount, color: '#ED7D31', path: PAGE_PATHS.SUGGEST_VARIABLE_PAY },
    { label: 'Benefits', value: totalBenefitsAmount, color: '#A5A5A5', path: PAGE_PATHS.BENEFITS_ALLOWANCES },
  ];

  const chartColors = {
    basePay: '#4472C4',
    bonus: '#ED7D31',
    benefits: '#A5A5A5',
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Total Reward Analysis</h1>
      
      <div className="flex gap-4 mb-6">
        <div className="relative">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]"
          >
            <option>Tier 1</option>
            <option>Tier 2</option>
            <option>Tier 3</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
        <div className="relative">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]"
          >
            <option>Company A</option>
            <option>Company B</option>
            <option>Company C</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
        <div className="relative">
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]"
          >
            <option>CEO</option>
            <option>CFO</option>
            <option>CTO</option>
            <option>COO</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-300">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-3 text-gray-800 font-semibold">Employee Name</td>
              <td className="px-4 py-3 text-gray-600">{employeeName}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-3 text-gray-800 font-semibold">Position</td>
              <td className="px-4 py-3 text-gray-600">{role}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-3 text-gray-800 font-semibold">Salary</td>
              <td className="px-4 py-3 text-gray-600">{`US $${salary.toLocaleString()}`}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="px-4 py-3 text-gray-800 font-semibold">Annually Target Bonus</td>
              <td className="px-4 py-3 text-gray-600">{`US $100`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Yearly Comparison of Total Reward</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rewardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="basePay" fill={chartColors.basePay} />
            <Bar dataKey="bonus" fill={chartColors.bonus} />
            <Bar dataKey="benefits" fill={chartColors.benefits} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reward Breakdown</h3>
        <table className="w-full">
          <tbody>
            {rewardBreakdown.map((item, index) => {
              const percentage = ((item.value / totalReward) * 100).toFixed(2);
              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-gray-800 font-semibold">
                    <button
                      onClick={() => onNavigate && onNavigate(item.path)}
                      className="text-left hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-right">{`US $${item.value.toLocaleString()}`}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-xs text-gray-600">{percentage}%</span>
                      <div className="h-4 w-32 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${(item.value / totalReward) * 100}%`, backgroundColor: item.color }}
                          className="h-full transition-all"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 text-gray-800 font-semibold">Total Compensation</td>
              <td className="px-4 py-3 text-gray-800 font-semibold text-right">{`US $${totalReward.toLocaleString()}`}</td>
              <td className="px-4 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-gray-400 text-sm">
        Executive → Total Reward Analysis
      </div>
    </div>
  );
}