import React, { useState } from 'react';
import { TrendingUp, Award, DollarSign, Target, AlertCircle, Settings, X } from 'lucide-react';
import { type UserRole } from '../../Header';

interface AnnualBonusForecastProps {
  currentRole: UserRole;
}

interface BonusConfig {
  bscMetric: BSCMetric;
  bscPercent80: number;
  bscPercent100: number;
  bscPercent120: number;
  growthMetric: GrowthMetric;
  growthPercent: number;
}

interface CompanyFinancials {
  company: string;
  tier: string;
  expectedCeoBalanceScore: number; // Forecast - user editable directly in table
  netProfit: number;
  revenue: number;
  ebit: number;
  ebitda: number;
  basePay: number;
  previousNetProfit: number;
  previousRevenue: number;
  previousEbit: number;
  previousEbitda: number;
  debtReduction: number;
  config: BonusConfig;
}

type BSCMetric = 'netProfit' | 'revenue' | 'ebit' | 'ebitda' | 'basePay';
type GrowthMetric = 'netProfit' | 'revenue' | 'ebit' | 'ebitda' | 'debtReduction';

const defaultConfig: BonusConfig = {
  bscMetric: 'netProfit',
  bscPercent80: 3,
  bscPercent100: 5,
  bscPercent120: 8,
  growthMetric: 'netProfit',
  growthPercent: 3,
};

const initialCompanies: CompanyFinancials[] = [
  {
    company: 'Shunkhlai',
    tier: 'Tier 1',
    expectedCeoBalanceScore: 95,
    netProfit: 15000,
    revenue: 120000,
    ebit: 18000,
    ebitda: 22000,
    basePay: 150,
    previousNetProfit: 12000,
    previousRevenue: 100000,
    previousEbit: 15000,
    previousEbitda: 19000,
    debtReduction: 5000,
    config: { ...defaultConfig },
  },
  {
    company: 'APU',
    tier: 'Tier 1',
    expectedCeoBalanceScore: 88,
    netProfit: 12000,
    revenue: 95000,
    ebit: 14000,
    ebitda: 17000,
    basePay: 120,
    previousNetProfit: 11000,
    previousRevenue: 92000,
    previousEbit: 13500,
    previousEbitda: 16500,
    debtReduction: 3000,
    config: { ...defaultConfig },
  },
  {
    company: 'Skytel',
    tier: 'Tier 2',
    expectedCeoBalanceScore: 75,
    netProfit: 9000,
    revenue: 80000,
    ebit: 11000,
    ebitda: 14000,
    basePay: 100,
    previousNetProfit: 8500,
    previousRevenue: 78000,
    previousEbit: 10500,
    previousEbitda: 13500,
    debtReduction: 2000,
    config: { ...defaultConfig, bscPercent80: 2, bscPercent100: 4, bscPercent120: 6 },
  },
  {
    company: 'GSB',
    tier: 'Tier 2',
    expectedCeoBalanceScore: 105,
    netProfit: 11000,
    revenue: 88000,
    ebit: 13000,
    ebitda: 16000,
    basePay: 110,
    previousNetProfit: 9000,
    previousRevenue: 82000,
    previousEbit: 11000,
    previousEbitda: 14000,
    debtReduction: 4000,
    config: { ...defaultConfig, bscPercent80: 2, bscPercent100: 4, bscPercent120: 6 },
  },
  {
    company: 'DC',
    tier: 'Tier 2',
    expectedCeoBalanceScore: 82,
    netProfit: 7000,
    revenue: 65000,
    ebit: 8500,
    ebitda: 10500,
    basePay: 90,
    previousNetProfit: 8000,
    previousRevenue: 70000,
    previousEbit: 9000,
    previousEbitda: 11000,
    debtReduction: 1000,
    config: { ...defaultConfig, bscPercent80: 2, bscPercent100: 4, bscPercent120: 6 },
  },
];

const metricLabels: Record<BSCMetric | GrowthMetric, string> = {
  netProfit: 'Net Profit',
  revenue: 'Revenue',
  ebit: 'EBIT',
  ebitda: 'EBITDA',
  basePay: 'Base Pay',
  debtReduction: 'Debt Reduction',
};

export function AnnualBonusForecast({ currentRole }: AnnualBonusForecastProps) {
  const [companies, setCompanies] = useState<CompanyFinancials[]>(initialCompanies);
  const [selectedYear, setSelectedYear] = useState('2025');
  const [editingCompany, setEditingCompany] = useState<number | null>(null);
  const [selectedTiers, setSelectedTiers] = useState<string[]>(['Tier 1', 'Tier 2']);
  const [editingCell, setEditingCell] = useState<{ companyIdx: number; field: 'expectedCeoBalanceScore' } | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const canEdit = currentRole === 'Super User' || currentRole === 'User Manager';

  const getMetricValue = (company: CompanyFinancials, metric: BSCMetric | GrowthMetric): number => {
    switch (metric) {
      case 'netProfit': return company.netProfit;
      case 'revenue': return company.revenue;
      case 'ebit': return company.ebit;
      case 'ebitda': return company.ebitda;
      case 'basePay': return company.basePay;
      case 'debtReduction': return company.debtReduction;
      default: return 0;
    }
  };

  const getPreviousMetricValue = (company: CompanyFinancials, metric: GrowthMetric): number => {
    switch (metric) {
      case 'netProfit': return company.previousNetProfit;
      case 'revenue': return company.previousRevenue;
      case 'ebit': return company.previousEbit;
      case 'ebitda': return company.previousEbitda;
      case 'debtReduction': return 0;
      default: return 0;
    }
  };

  const calculateBSCBonus = (company: CompanyFinancials, achievementLevel: 80 | 100 | 120): number => {
    const metricValue = getMetricValue(company, company.config.bscMetric);
    
    if (achievementLevel === 80) {
      return (metricValue * company.config.bscPercent80) / 100;
    } else if (achievementLevel === 100) {
      return (metricValue * company.config.bscPercent100) / 100;
    } else if (achievementLevel === 120) {
      return (metricValue * company.config.bscPercent120) / 100;
    }
    
    return 0;
  };

  const calculateActualBSCBonus = (company: CompanyFinancials): number => {
    if (company.expectedCeoBalanceScore < 80) return 0;
    
    const metricValue = getMetricValue(company, company.config.bscMetric);
    let percentage = 0;
    
    if (company.expectedCeoBalanceScore >= 120) {
      percentage = company.config.bscPercent120;
    } else if (company.expectedCeoBalanceScore >= 100) {
      percentage = company.config.bscPercent100;
    } else if (company.expectedCeoBalanceScore >= 80) {
      percentage = company.config.bscPercent80;
    }
    
    return (metricValue * percentage) / 100;
  };

  const calculateGrowth = (company: CompanyFinancials): number => {
    if (company.config.growthMetric === 'debtReduction') {
      return company.debtReduction;
    }
    
    const currentValue = getMetricValue(company, company.config.growthMetric);
    const previousValue = getPreviousMetricValue(company, company.config.growthMetric);
    
    if (previousValue === 0) return 0;
    return currentValue - previousValue;
  };

  const calculateGrowthBonus = (company: CompanyFinancials): number => {
    const growth = calculateGrowth(company);
    if (growth <= 0) return 0;
    return (growth * company.config.growthPercent) / 100;
  };

  const getTotalBonus = (company: CompanyFinancials): number => {
    return calculateActualBSCBonus(company) + calculateGrowthBonus(company);
  };

  const toggleTier = (tier: string) => {
    setSelectedTiers(prev => 
      prev.includes(tier) 
        ? prev.filter(t => t !== tier)
        : [...prev, tier]
    );
  };

  const filteredCompanies = companies.filter(c => selectedTiers.includes(c.tier));

  const grandTotalBSC80 = filteredCompanies.reduce((sum, c) => sum + calculateBSCBonus(c, 80), 0);
  const grandTotalBSC100 = filteredCompanies.reduce((sum, c) => sum + calculateBSCBonus(c, 100), 0);
  const grandTotalBSC120 = filteredCompanies.reduce((sum, c) => sum + calculateBSCBonus(c, 120), 0);
  const grandTotalActualBSC = filteredCompanies.reduce((sum, c) => sum + calculateActualBSCBonus(c), 0);
  const grandTotalGrowth = filteredCompanies.reduce((sum, c) => sum + calculateGrowthBonus(c), 0);
  const grandTotal = filteredCompanies.reduce((sum, c) => sum + getTotalBonus(c), 0);

  const availableTiers = ['Tier 1', 'Tier 2', 'Tier 3'];

  const updateCompanyConfig = (index: number, config: BonusConfig) => {
    const updated = [...companies];
    updated[index].config = config;
    setCompanies(updated);
  };

  const handleCellClick = (companyIdx: number) => {
    if (!canEdit) return;
    const originalIndex = companies.findIndex(c => c.company === filteredCompanies[companyIdx].company);
    setEditingCell({ companyIdx: originalIndex, field: 'expectedCeoBalanceScore' });
    setEditValue(String(companies[originalIndex].expectedCeoBalanceScore));
  };

  const handleCellChange = (value: string) => {
    setEditValue(value);
  };

  const handleCellBlur = () => {
    if (editingCell && editValue !== '') {
      const updated = [...companies];
      const newValue = Math.max(0, Math.min(150, Number(editValue)));
      updated[editingCell.companyIdx].expectedCeoBalanceScore = newValue;
      setCompanies(updated);
    }
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Annual Bonus Forecast</h1>
          <p className="text-gray-600">Forecast by Company - Based on CEO BSC and Growth Performance</p>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-orange-600" />
            <p className="text-xs text-gray-500">BSC Bonus Pool</p>
          </div>
          <p className="text-xl font-bold text-gray-900">
            ${grandTotalActualBSC.toLocaleString()}K
          </p>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <p className="text-xs text-gray-500">Growth Bonus Pool</p>
          </div>
          <p className="text-xl font-bold text-gray-900">
            ${grandTotalGrowth.toLocaleString()}K
          </p>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-orange-600" />
            <p className="text-xs text-gray-500">Total Bonus Pool</p>
          </div>
          <p className="text-xl font-bold text-orange-700">
            ${grandTotal.toLocaleString()}K
          </p>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-gray-600" />
            <p className="text-xs text-gray-500">Companies</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{filteredCompanies.length}</p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Forecast by Company</h3>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600 mr-2">Filter by Tier:</span>
            {availableTiers.map(tier => (
              <button
                key={tier}
                onClick={() => toggleTier(tier)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedTiers.includes(tier)
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <th className="px-4 py-3 text-left font-semibold border-r border-orange-400" rowSpan={2}>Company</th>
                <th className="px-4 py-3 text-center font-semibold border-r border-orange-400" rowSpan={2}>
                  Expected CEO BSC<br/>(%)
                </th>
                <th className="px-4 py-3 text-center font-semibold border-r border-orange-400" colSpan={3}>
                  BSC Bonus Forecast (K)
                </th>
                <th className="px-4 py-3 text-center font-semibold border-r border-orange-400" rowSpan={2}>
                  Growth<br/>(K)
                </th>
                <th className="px-4 py-3 text-center font-semibold border-r border-orange-400" rowSpan={2}>
                  Growth<br/>Bonus (K)
                </th>
                <th className="px-4 py-3 text-center font-semibold border-r border-orange-400" rowSpan={2}>
                  Total<br/>Bonus (K)
                </th>
                <th className="px-4 py-3 text-center font-semibold" rowSpan={2}>
                  Config
                </th>
              </tr>
              <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <th className="px-4 py-2 text-center text-sm font-medium border-r border-orange-400">
                  @ 80%
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border-r border-orange-400">
                  @ 100%
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium border-r border-orange-400">
                  @ 120%
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, idx) => {
                const originalIndex = companies.findIndex(c => c.company === company.company);
                const bscBonus80 = calculateBSCBonus(company, 80);
                const bscBonus100 = calculateBSCBonus(company, 100);
                const bscBonus120 = calculateBSCBonus(company, 120);
                const actualBSC = calculateActualBSCBonus(company);
                const growth = calculateGrowth(company);
                const growthBonus = calculateGrowthBonus(company);
                const total = getTotalBonus(company);
                const isBSCEligible = company.expectedCeoBalanceScore >= 80;
                const isEditing = editingCell?.companyIdx === originalIndex;

                return (
                  <tr 
                    key={company.company}
                    className={`border-b border-gray-200 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-orange-50 transition-colors`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div>{company.company}</div>
                      <div className="text-xs text-gray-500">{company.tier}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          max="150"
                          autoFocus
                          value={editValue}
                          onChange={(e) => handleCellChange(e.target.value)}
                          onBlur={handleCellBlur}
                          onKeyDown={handleCellKeyDown}
                          className="w-16 px-2 py-1 border border-orange-500 rounded text-center focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                        />
                      ) : (
                        <span
                          onClick={() => handleCellClick(idx)}
                          className={`inline-block px-2 py-1 rounded text-sm font-semibold cursor-pointer transition-all ${
                            canEdit ? 'hover:bg-orange-100' : ''
                          } ${
                            company.expectedCeoBalanceScore >= 120 ? 'bg-green-100 text-green-800' :
                            company.expectedCeoBalanceScore >= 100 ? 'bg-orange-100 text-orange-800' :
                            company.expectedCeoBalanceScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          {company.expectedCeoBalanceScore}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isBSCEligible ? (
                        <span className={company.expectedCeoBalanceScore >= 80 && company.expectedCeoBalanceScore < 100 ? 'font-bold text-green-700' : 'text-gray-400'}>
                          ${bscBonus80.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isBSCEligible ? (
                        <span className={company.expectedCeoBalanceScore >= 100 && company.expectedCeoBalanceScore < 120 ? 'font-bold text-green-700' : 'text-gray-400'}>
                          ${bscBonus100.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isBSCEligible ? (
                        <span className={company.expectedCeoBalanceScore >= 120 ? 'font-bold text-green-700' : 'text-gray-400'}>
                          ${bscBonus120.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-right ${growth > 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {growth > 0 ? '+' : ''}{growth.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {growthBonus > 0 ? (
                        <span className="text-green-700">${growthBonus.toLocaleString()}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-orange-700">
                      ${total.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setEditingCompany(originalIndex)}
                        disabled={!canEdit}
                        className="text-orange-600 hover:text-orange-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold border-t-2 border-gray-400">
                <td className="px-4 py-3" colSpan={2}>Total</td>
                <td className="px-4 py-3 text-right text-gray-600">${grandTotalBSC80.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-600">${grandTotalBSC100.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-600">${grandTotalBSC120.toLocaleString()}</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right text-green-700">${grandTotalGrowth.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-orange-700">${grandTotal.toLocaleString()}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="flex justify-end mb-2">
      <button
            className="w-80 py-2 px-8 rounded-xl border-2 border-green-500 bg-green-100 text-gray-700 font-medium
                   hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Update Forecast
      </button>
      </div>

      {/* Configuration Modal */}
      {editingCompany !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">Configure Bonus Parameters</h3>
                <p className="text-sm text-orange-100">{companies[editingCompany].company} - {companies[editingCompany].tier}</p>
              </div>
              <button
                onClick={() => setEditingCompany(null)}
                className="text-white hover:text-orange-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* BSC Configuration */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">CEO Balance Score Card</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Metric</label>
                  <select
                    value={companies[editingCompany].config.bscMetric}
                    onChange={(e) => updateCompanyConfig(editingCompany, {
                      ...companies[editingCompany].config,
                      bscMetric: e.target.value as BSCMetric
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="netProfit">Net Profit</option>
                    <option value="revenue">Revenue</option>
                    <option value="ebit">EBIT</option>
                    <option value="ebitda">EBITDA</option>
                    <option value="basePay">Base Pay</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      @ 80% (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={companies[editingCompany].config.bscPercent80}
                      onChange={(e) => updateCompanyConfig(editingCompany, {
                        ...companies[editingCompany].config,
                        bscPercent80: Number(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      @ 100% (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={companies[editingCompany].config.bscPercent100}
                      onChange={(e) => updateCompanyConfig(editingCompany, {
                        ...companies[editingCompany].config,
                        bscPercent100: Number(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      @ 120%+ (%)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={companies[editingCompany].config.bscPercent120}
                      onChange={(e) => updateCompanyConfig(editingCompany, {
                        ...companies[editingCompany].config,
                        bscPercent120: Number(e.target.value)
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="bg-white border border-orange-200 rounded p-3 text-xs text-gray-700">
                  <p>Current BSC Score: <strong>{companies[editingCompany].expectedCeoBalanceScore}%</strong></p>
                  <p className="mt-1">
                    Example: At {companies[editingCompany].expectedCeoBalanceScore}% BSC, this company will receive{' '}
                    <strong>
                      {companies[editingCompany].expectedCeoBalanceScore >= 120 
                        ? companies[editingCompany].config.bscPercent120 
                        : companies[editingCompany].expectedCeoBalanceScore >= 100
                        ? companies[editingCompany].config.bscPercent100
                        : companies[editingCompany].expectedCeoBalanceScore >= 80
                        ? companies[editingCompany].config.bscPercent80
                        : 0}%
                    </strong>{' '}
                    of {metricLabels[companies[editingCompany].config.bscMetric]}
                  </p>
                </div>
              </div>

              {/* Growth Configuration */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Growth Factor</h4>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Growth Metric</label>
                  <select
                    value={companies[editingCompany].config.growthMetric}
                    onChange={(e) => updateCompanyConfig(editingCompany, {
                      ...companies[editingCompany].config,
                      growthMetric: e.target.value as GrowthMetric
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                  >
                    <option value="netProfit">Net Profit Growth</option>
                    <option value="revenue">Revenue Growth</option>
                    <option value="ebit">EBIT Growth</option>
                    <option value="ebitda">EBITDA Growth</option>
                    <option value="debtReduction">Debt Reduction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bonus Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={companies[editingCompany].config.growthPercent}
                    onChange={(e) => updateCompanyConfig(editingCompany, {
                      ...companies[editingCompany].config,
                      growthPercent: Number(e.target.value)
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="bg-white border border-green-200 rounded p-3 text-xs text-gray-700">
                  <p>
                    Current Growth: <strong className={calculateGrowth(companies[editingCompany]) > 0 ? 'text-green-600' : 'text-red-600'}>
                      {calculateGrowth(companies[editingCompany]) > 0 ? '+' : ''}{calculateGrowth(companies[editingCompany]).toLocaleString()}K
                    </strong>
                  </p>
                  <p className="mt-1">
                    Example: {companies[editingCompany].config.growthPercent}% of growth ={' '}
                    <strong>${calculateGrowthBonus(companies[editingCompany]).toLocaleString()}K</strong> bonus
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setEditingCompany(null)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => setEditingCompany(null)}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors font-medium shadow-sm"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}