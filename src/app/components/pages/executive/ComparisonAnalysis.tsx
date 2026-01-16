import React, { useState, useMemo } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { type UserRole } from '../../Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ComparisonAnalysisProps {
  currentRole: UserRole;
}

// Mock data for executives with their compensation details
const mockExecutives = [
  {
    id: 1,
    name: 'Mahesh Malhotra',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'CEO',
    basePay: 600,
    bonus: 400,
    benefits: 50,
    netProfit: 1050,
    growth: 12.5,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'CFO',
    basePay: 450,
    bonus: 300,
    benefits: 40,
    netProfit: 1050,
    growth: 8.3,
  },
  {
    id: 3,
    name: 'Priya Singh',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'COO',
    basePay: 500,
    bonus: 350,
    benefits: 45,
    netProfit: 895,
    growth: 10.2,
  },
  {
    id: 4,
    name: 'Vikram Patel',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'CTO',
    basePay: 550,
    bonus: 380,
    benefits: 48,
    netProfit: 978,
    growth: 11.8,
  },
  {
    id: 5,
    name: 'Anjali Reddy',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Sales',
    basePay: 400,
    bonus: 250,
    benefits: 35,
    netProfit: 685,
    growth: 6.5,
  },
  {
    id: 6,
    name: 'Sanjay Gupta',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Operations',
    basePay: 420,
    bonus: 280,
    benefits: 38,
    netProfit: 738,
    growth: 7.2,
  },
];

const companies = ['Company A', 'Company B', 'Company C'];
const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
const positions = ['CEO', 'CFO', 'CTO', 'COO', 'VP Sales', 'VP Operations'];

const metrics = [
  { id: 'basePay', label: 'Base Pay', color: '#4472C4' },
  { id: 'bonus', label: 'Bonus', color: '#ED7D31' },
  { id: 'benefits', label: 'Benefits', color: '#A5A5A5' },
  { id: 'netProfit', label: 'Net Profit', color: '#70AD47' },
  { id: 'growth', label: 'Growth %', color: '#FFC000' },
];

export function ComparisonAnalysis({ currentRole }: ComparisonAnalysisProps) {
  // Filter states
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['basePay', 'bonus']);
  const [searchExecutive, setSearchExecutive] = useState('');

  // Filtered data
  const filteredExecutives = useMemo(() => {
    return mockExecutives.filter((exec) => {
      const matchCompany = selectedCompanies.length === 0 || selectedCompanies.includes(exec.company);
      const matchTier = selectedTiers.length === 0 || selectedTiers.includes(exec.tier);
      const matchPosition = selectedPositions.length === 0 || selectedPositions.includes(exec.position);
      const matchSearch = exec.name.toLowerCase().includes(searchExecutive.toLowerCase());

      return matchCompany && matchTier && matchPosition && matchSearch;
    });
  }, [selectedCompanies, selectedTiers, selectedPositions, searchExecutive]);

  // Chart data
  const chartData = useMemo(() => {
    return filteredExecutives.map((exec) => ({
      name: exec.name.split(' ')[0],
      ...Object.fromEntries(
        selectedMetrics.map((metric) => [metric, exec[metric as keyof typeof exec]])
      ),
    }));
  }, [filteredExecutives, selectedMetrics]);

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metricId) ? prev.filter((m) => m !== metricId) : [...prev, metricId]
    );
  };

  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const handleTierToggle = (tier: string) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const handlePositionToggle = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position) ? prev.filter((p) => p !== position) : [...prev, position]
    );
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* LEFT SIDEBAR: Filters */}
      <div className="w-80 bg-white border-r border-gray-300 p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Filters</h2>

        {/* Executive Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Executive</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchExecutive}
            onChange={(e) => setSearchExecutive(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Company</h3>
          <div className="space-y-2">
            {companies.map((company) => (
              <label key={company} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company)}
                  onChange={() => handleCompanyToggle(company)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{company}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tier Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tier</h3>
          <div className="space-y-2">
            {tiers.map((tier) => (
              <label key={tier} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(tier)}
                  onChange={() => handleTierToggle(tier)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{tier}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Position Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Position</h3>
          <div className="space-y-2">
            {positions.map((position) => (
              <label key={position} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPositions.includes(position)}
                  onChange={() => handlePositionToggle(position)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{position}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Metrics Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Metrics to Compare</h3>
          <div className="space-y-2">
            {metrics.map((metric) => (
              <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={() => handleMetricToggle(metric.id)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{metric.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={() => {
            setSelectedCompanies([]);
            setSelectedTiers([]);
            setSelectedPositions([]);
            setSearchExecutive('');
            setSelectedMetrics(['basePay', 'bonus']);
          }}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* RIGHT CONTENT: Comparison Data */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Comparison Analysis</h1>
          <p className="text-gray-600">
            Showing {filteredExecutives.length} executive{filteredExecutives.length !== 1 ? 's' : ''} •{' '}
            {selectedMetrics.length} metric{selectedMetrics.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredExecutives.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-300">
            <p className="text-gray-500 text-lg">No executives match the selected filters</p>
          </div>
        ) : (
          <>
            {/* Chart Visualization */}
            {selectedMetrics.length > 0 && chartData.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Comparison Chart</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.map((metric) => {
                      const metricColor = metrics.find((m) => m.id === metric)?.color || '#000';
                      return <Bar key={metric} dataKey={metric} fill={metricColor} />;
                    })}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Detailed Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Executive</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tier</th>
                      {selectedMetrics.map((metric) => {
                        const metricLabel = metrics.find((m) => m.id === metric)?.label;
                        return (
                          <th key={metric} className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            {metricLabel}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExecutives.map((exec, idx) => (
                      <tr
                        key={exec.id}
                        className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{exec.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{exec.position}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{exec.company}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                            {exec.tier}
                          </span>
                        </td>
                        {selectedMetrics.map((metric) => (
                          <td key={metric} className="px-4 py-3 text-sm text-right text-gray-700">
                            {metric === 'growth'
                              ? `${exec[metric as keyof typeof exec]}%`
                              : `US $${(exec[metric as keyof typeof exec] as number).toLocaleString()}`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            {filteredExecutives.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {selectedMetrics.map((metric) => {
                  const metricInfo = metrics.find((m) => m.id === metric);
                  const values = filteredExecutives.map((exec) => exec[metric as keyof typeof exec] as number);
                  const average = values.reduce((a, b) => a + b, 0) / values.length;
                  const max = Math.max(...values);
                  const min = Math.min(...values);

                  return (
                    <div key={metric} className="bg-white rounded-lg p-4 border border-gray-300">
                      <h3 className="text-sm font-medium text-gray-600 mb-3">{metricInfo?.label}</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Average</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {metric === 'growth' ? `${average.toFixed(2)}%` : `US $${average.toFixed(0)}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Max</p>
                          <p className="text-sm font-medium text-green-600">
                            {metric === 'growth' ? `${max.toFixed(2)}%` : `US $${max.toLocaleString()}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Min</p>
                          <p className="text-sm font-medium text-orange-600">
                            {metric === 'growth' ? `${min.toFixed(2)}%` : `US $${min.toLocaleString()}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-gray-400 text-sm">Executive → Comparison Analysis</div>
      </div>
    </div>
  );
}
