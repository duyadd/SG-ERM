import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, DollarSign, Percent, Calculator } from 'lucide-react';

interface SuggestVariablePayProps {
  currentRole: UserRole;
}

interface CompanyData {
  name: string;
  currentProfit: number;
  previousProfit: number;
  growth: number;
  variablePay: number;
}

const initialCompanies: CompanyData[] = [
  { name: 'Company A', currentProfit: 15000, previousProfit: 12000, growth: 25.0, variablePay: 0 },
  { name: 'Company B', currentProfit: 12000, previousProfit: 11000, growth: 9.1, variablePay: 0 },
  { name: 'Company C', currentProfit: 18000, previousProfit: 15000, growth: 20.0, variablePay: 0 },
  { name: 'Company D', currentProfit: 14000, previousProfit: 13500, growth: 3.7, variablePay: 0 },
  { name: 'Company E', currentProfit: 9000, previousProfit: 10000, growth: -10.0, variablePay: 0 },
];

export function SuggestVariablePay({ currentRole }: SuggestVariablePayProps) {
  const [companies, setCompanies] = useState<CompanyData[]>(initialCompanies);
  const [profitWeight, setProfitWeight] = useState(0.6);
  const [growthWeight, setGrowthWeight] = useState(0.4);
  const [baseMultiplier, setBaseMultiplier] = useState(0.05);

  const canEdit = currentRole === 'Super User' || currentRole === 'User Manager';

  const calculateVariablePay = (company: CompanyData) => {
    const profitScore = company.currentProfit * profitWeight;
    const growthScore = (company.growth / 100) * company.currentProfit * growthWeight;
    return (profitScore + growthScore) * baseMultiplier;
  };

  const handleCalculate = () => {
    const updatedCompanies = companies.map(company => ({
      ...company,
      variablePay: calculateVariablePay(company)
    }));
    setCompanies(updatedCompanies);
  };

  const chartData = companies.map(company => ({
    name: company.name,
    'Current Profit': company.currentProfit,
    'Previous Profit': company.previousProfit,
    'Growth %': company.growth,
    'Variable Pay': company.variablePay
  }));

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel - Configuration */}
      <div className="w-80 bg-white border-r p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Variable Pay Configuration</h2>
        </div>

        {/* Formula Weights */}
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 text-orange-900">Calculation Formula</h3>
            <div className="text-xs text-gray-700 space-y-2">
              <p className="font-mono bg-white p-2 rounded border">
                VP = (P × Wp + G × P × Wg) × M
              </p>
              <div className="space-y-1 text-xs">
                <p><span className="font-semibold">VP:</span> Variable Pay</p>
                <p><span className="font-semibold">P:</span> Current Net Profit</p>
                <p><span className="font-semibold">Wp:</span> Profit Weight</p>
                <p><span className="font-semibold">G:</span> Growth Rate</p>
                <p><span className="font-semibold">Wg:</span> Growth Weight</p>
                <p><span className="font-semibold">M:</span> Base Multiplier</p>
              </div>
            </div>
          </div>

          {/* Profit Weight */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Profit Weight (Wp)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={profitWeight}
              onChange={(e) => setProfitWeight(Number(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Growth Weight */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Growth Weight (Wg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={growthWeight}
              onChange={(e) => setGrowthWeight(Number(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Base Multiplier */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-purple-600" />
              Base Multiplier (M)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={baseMultiplier}
              onChange={(e) => setBaseMultiplier(Number(e.target.value))}
              disabled={!canEdit}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Weight Total Check */}
          <div className="bg-gray-100 rounded p-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Weight:</span>
              <span className={`font-semibold ${
                (profitWeight + growthWeight).toFixed(1) === '1.0' 
                  ? 'text-green-600' 
                  : 'text-orange-600'
              }`}>
                {(profitWeight + growthWeight).toFixed(1)}
              </span>
            </div>
            {(profitWeight + growthWeight).toFixed(1) !== '1.0' && (
              <p className="text-xs text-orange-600 mt-1">
                ⚠ Weights should sum to 1.0
              </p>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!canEdit}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded px-4 py-3 font-medium transition-colors shadow-sm flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Calculator className="w-4 h-4" />
          Calculate Variable Pay
        </button>

        {/* Reset Button */}
        <button
          onClick={() => {
            setProfitWeight(0.6);
            setGrowthWeight(0.4);
            setBaseMultiplier(0.05);
          }}
          disabled={!canEdit}
          className="w-full border-2 border-gray-300 text-gray-700 rounded px-4 py-2 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Reset to Default
        </button>
      </div>

      {/* Right Panel - Results */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Annual Variable Pay Analysis</h1>
          <p className="text-gray-600">Calculate variable pay based on net profit and growth metrics</p>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Company</th>
                <th className="px-4 py-3 text-right font-semibold">Previous Year<br/>Profit (K)</th>
                <th className="px-4 py-3 text-right font-semibold">Current Year<br/>Profit (K)</th>
                <th className="px-4 py-3 text-right font-semibold">Growth<br/>(%)</th>
                <th className="px-4 py-3 text-right font-semibold">Variable Pay<br/>(K)</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr 
                  key={company.name} 
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  } border-b border-gray-200 hover:bg-orange-50 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{company.name}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    ${company.previousProfit.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <input
                      type="number"
                      value={company.currentProfit}
                      onChange={(e) => {
                        const updated = [...companies];
                        updated[index].currentProfit = Number(e.target.value);
                        updated[index].growth = ((updated[index].currentProfit - updated[index].previousProfit) / updated[index].previousProfit) * 100;
                        setCompanies(updated);
                      }}
                      disabled={!canEdit}
                      className="w-full text-right px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    company.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <div className="flex items-center justify-end gap-1">
                      <TrendingUp className={`w-4 h-4 ${company.growth < 0 ? 'rotate-180' : ''}`} />
                      {company.growth.toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">
                    ${company.variablePay > 0 ? company.variablePay.toLocaleString(undefined, {maximumFractionDigits: 0}) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3 text-right">
                  ${companies.reduce((sum, c) => sum + c.previousProfit, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  ${companies.reduce((sum, c) => sum + c.currentProfit, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {((companies.reduce((sum, c) => sum + c.currentProfit, 0) - companies.reduce((sum, c) => sum + c.previousProfit, 0)) / 
                    companies.reduce((sum, c) => sum + c.previousProfit, 0) * 100).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right text-green-700">
                  ${companies.reduce((sum, c) => sum + c.variablePay, 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Profit Comparison Chart */}
          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Profit Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Previous Profit" fill="#9ca3af" />
                <Bar dataKey="Current Profit" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Growth & Variable Pay Chart */}
          <div className="bg-white rounded-lg border border-gray-300 p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Growth Impact on Variable Pay</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="Growth %" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="Variable Pay" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h4 className="text-sm font-semibold text-gray-700">Total Variable Pay</h4>
            </div>
            <p className="text-2xl font-bold text-green-700">
              ${companies.reduce((sum, c) => sum + c.variablePay, 0).toLocaleString(undefined, {maximumFractionDigits: 0})}K
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-semibold text-gray-700">Average Growth</h4>
            </div>
            <p className="text-2xl font-bold text-blue-700">
              {(companies.reduce((sum, c) => sum + c.growth, 0) / companies.length).toFixed(1)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-orange-600" />
              <h4 className="text-sm font-semibold text-gray-700">Companies Analyzed</h4>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {companies.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
