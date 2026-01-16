import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { type UserRole } from '../../Header';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonAnalysisProps {
  currentRole: UserRole;
}

type ComparisonType = 'company-vs-company' | 'executives-in-company' | 'position-across-company' | 'tier-comparison';

// Mock data for executives with their compensation details across years
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
    year: 2024,
  },
  {
    id: 11,
    name: 'Mahesh Malhotra',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'CEO',
    basePay: 580,
    bonus: 380,
    benefits: 48,
    netProfit: 1008,
    year: 2023,
  },
  {
    id: 12,
    name: 'Mahesh Malhotra',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'CEO',
    basePay: 560,
    bonus: 360,
    benefits: 45,
    netProfit: 965,
    year: 2022,
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
    netProfit: 790,
    year: 2024,
  },
  {
    id: 21,
    name: 'Rajesh Kumar',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'CFO',
    basePay: 435,
    bonus: 290,
    benefits: 38,
    netProfit: 763,
    year: 2023,
  },
  {
    id: 3,
    name: 'Amit Singh',
    company: 'Company A',
    tier: 'Tier 2',
    position: 'CTO',
    basePay: 500,
    bonus: 350,
    benefits: 45,
    netProfit: 895,
    year: 2024,
  },
  {
    id: 31,
    name: 'Amit Singh',
    company: 'Company A',
    tier: 'Tier 2',
    position: 'CTO',
    basePay: 480,
    bonus: 330,
    benefits: 42,
    netProfit: 852,
    year: 2023,
  },
  {
    id: 4,
    name: 'Priya Singh',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'COO',
    basePay: 520,
    bonus: 360,
    benefits: 46,
    netProfit: 926,
    year: 2024,
  },
  {
    id: 41,
    name: 'Priya Singh',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'COO',
    basePay: 495,
    bonus: 340,
    benefits: 43,
    netProfit: 878,
    year: 2023,
  },
  {
    id: 5,
    name: 'Vikram Patel',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'CTO',
    basePay: 550,
    bonus: 380,
    benefits: 48,
    netProfit: 978,
    year: 2024,
  },
  {
    id: 51,
    name: 'Vikram Patel',
    company: 'Company B',
    tier: 'Tier 2',
    position: 'CTO',
    basePay: 525,
    bonus: 360,
    benefits: 45,
    netProfit: 930,
    year: 2023,
  },
  {
    id: 8,
    name: 'Ravi Kumar',
    company: 'Company B',
    tier: 'Tier 1',
    position: 'CEO',
    basePay: 650,
    bonus: 420,
    benefits: 55,
    netProfit: 1125,
    year: 2024,
  },
  {
    id: 81,
    name: 'Ravi Kumar',
    company: 'Company B',
    tier: 'Tier 1',
    position: 'CEO',
    basePay: 620,
    bonus: 400,
    benefits: 52,
    netProfit: 1072,
    year: 2023,
  },
  {
    id: 6,
    name: 'Anjali Reddy',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Sales',
    basePay: 400,
    bonus: 250,
    benefits: 35,
    netProfit: 685,
    year: 2024,
  },
  {
    id: 61,
    name: 'Anjali Reddy',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Sales',
    basePay: 385,
    bonus: 240,
    benefits: 33,
    netProfit: 658,
    year: 2023,
  },
  {
    id: 7,
    name: 'Sanjay Gupta',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Operations',
    basePay: 420,
    bonus: 280,
    benefits: 38,
    netProfit: 738,
    year: 2024,
  },
  {
    id: 71,
    name: 'Sanjay Gupta',
    company: 'Company C',
    tier: 'Tier 3',
    position: 'VP Operations',
    basePay: 405,
    bonus: 270,
    benefits: 36,
    netProfit: 711,
    year: 2023,
  },
  {
    id: 9,
    name: 'Deepak Joshi',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'VP Finance',
    basePay: 480,
    bonus: 320,
    benefits: 42,
    netProfit: 842,
    year: 2024,
  },
  {
    id: 91,
    name: 'Deepak Joshi',
    company: 'Company A',
    tier: 'Tier 1',
    position: 'VP Finance',
    basePay: 460,
    bonus: 310,
    benefits: 40,
    netProfit: 810,
    year: 2023,
  },
  {
    id: 10,
    name: 'Sarah Johnson',
    company: 'Company B',
    tier: 'Tier 3',
    position: 'CEO',
    basePay: 620,
    bonus: 410,
    benefits: 52,
    netProfit: 1082,
    year: 2024,
  },
  {
    id: 101,
    name: 'Sarah Johnson',
    company: 'Company B',
    tier: 'Tier 3',
    position: 'CEO',
    basePay: 595,
    bonus: 390,
    benefits: 49,
    netProfit: 1034,
    year: 2023,
  },
];

// Company metadata with financial metrics by year
const companyDataByYear = {
  'Company A': {
    2024: { revenue: 250, ebitda: 45, ebit: 35, debt: 80, employees: 450, executives: 4 },
    2023: { revenue: 230, ebitda: 40, ebit: 31, debt: 85, employees: 440, executives: 4 },
    2022: { revenue: 210, ebitda: 36, ebit: 27, debt: 90, employees: 430, executives: 3 },
  },
  'Company B': {
    2024: { revenue: 180, ebitda: 32, ebit: 25, debt: 55, employees: 320, executives: 3 },
    2023: { revenue: 165, ebitda: 29, ebit: 22, debt: 58, employees: 310, executives: 3 },
    2022: { revenue: 150, ebitda: 26, ebit: 20, debt: 62, employees: 300, executives: 2 },
  },
  'Company C': {
    2024: { revenue: 120, ebitda: 22, ebit: 16, debt: 38, employees: 280, executives: 2 },
    2023: { revenue: 110, ebitda: 20, ebit: 15, debt: 40, employees: 270, executives: 2 },
    2022: { revenue: 100, ebitda: 18, ebit: 13, debt: 42, employees: 260, executives: 2 },
  },
};

const companies = ['Company A', 'Company B', 'Company C'];
const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
const positions = ['CEO', 'CFO', 'CTO', 'COO', 'VP Sales', 'VP Operations', 'VP Finance'];
const years = [2022, 2023, 2024];

// Compensation Metrics
const compensationMetrics = [
  { id: 'basePay', label: 'Base Pay', color: '#4472C4', category: 'Compensation' },
  { id: 'bonus', label: 'Bonus', color: '#ED7D31', category: 'Compensation' },
  { id: 'benefits', label: 'Benefits', color: '#A5A5A5', category: 'Compensation' },
];

// Financial Metrics
const financialMetrics = [
  { id: 'revenue', label: 'Revenue (M)', color: '#70AD47', category: 'Financial' },
  { id: 'ebitda', label: 'EBITDA (M)', color: '#FFC000', category: 'Financial' },
  { id: 'ebit', label: 'EBIT (M)', color: '#FF6B6B', category: 'Financial' },
  { id: 'debt', label: 'Debt (M)', color: '#595959', category: 'Financial' },
  { id: 'netProfit', label: 'Net Profit', color: '#70AD47', category: 'Financial' },
];

// Operational Metrics
const operationalMetrics = [
  { id: 'growth', label: 'Growth %', color: '#FFC000', category: 'Operational' },
];

const allMetrics = [...compensationMetrics, ...financialMetrics, ...operationalMetrics];

const comparisonTypes: { value: ComparisonType; label: string; description: string }[] = [
  {
    value: 'company-vs-company',
    label: 'Company vs Company',
    description: 'Compare companies by financial metrics and company data',
  },
  {
    value: 'executives-in-company',
    label: 'Executives in Company',
    description: 'Compare executives within a specific company',
  },
  {
    value: 'position-across-company',
    label: 'Same Position Across Companies',
    description: 'Compare same position roles across companies and tiers',
  },
  {
    value: 'tier-comparison',
    label: 'Tier Comparison',
    description: 'Compare compensation by organizational tier with ranges',
  },
];

export function ComparisonAnalysis({ currentRole }: ComparisonAnalysisProps) {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('company-vs-company');

  // Type-specific filters
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([companies[0], companies[1]]);
  const [selectedCompanyForExecs, setSelectedCompanyForExecs] = useState<string>(companies[0]);
  const [selectedPosition, setSelectedPosition] = useState<string>(positions[0]);
  const [selectedPositionTiers, setSelectedPositionTiers] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);

  // Year selection
  const [selectedYears, setSelectedYears] = useState<number[]>([2024, 2023]);

  // Metric selection (separated by category)
  const [selectedCompensationMetrics, setSelectedCompensationMetrics] = useState<string[]>(['basePay', 'bonus']);
  const [selectedFinancialMetrics, setSelectedFinancialMetrics] = useState<string[]>([]);
  const [selectedOperationalMetrics, setSelectedOperationalMetrics] = useState<string[]>([]);

  // Filtered and processed data
  const filteredExecutives = useMemo(() => {
    let filtered = mockExecutives.filter((exec) => selectedYears.includes(exec.year));

    switch (comparisonType) {
      case 'company-vs-company':
        filtered = filtered.filter((exec) => selectedCompanies.includes(exec.company));
        break;

      case 'executives-in-company':
        filtered = filtered.filter((exec) => exec.company === selectedCompanyForExecs);
        break;

      case 'position-across-company':
        filtered = filtered.filter((exec) => exec.position === selectedPosition);
        if (selectedPositionTiers.length > 0) {
          filtered = filtered.filter((exec) => selectedPositionTiers.includes(exec.tier));
        }
        break;

      case 'tier-comparison':
        filtered = selectedTiers.length > 0 ? filtered.filter((exec) => selectedTiers.includes(exec.tier)) : filtered;
        break;
    }

    return filtered;
  }, [comparisonType, selectedCompanies, selectedCompanyForExecs, selectedPosition, selectedPositionTiers, selectedTiers, selectedYears]);

  // Calculate growth for financial metrics
  const calculateFinancialGrowth = (company: string, years: number[]) => {
    if (years.length < 2) return 0;
    const sortedYears = [...years].sort((a, b) => a - b);
    const startYear = sortedYears[0];
    const endYear = sortedYears[sortedYears.length - 1];
    
    const startData = companyDataByYear[company as keyof typeof companyDataByYear]?.[startYear as keyof typeof companyDataByYear[keyof typeof companyDataByYear]];
    const endData = companyDataByYear[company as keyof typeof companyDataByYear]?.[endYear as keyof typeof companyDataByYear[keyof typeof companyDataByYear]];
    
    if (!startData || !endData) return 0;
    
    // Calculate average growth across revenue, ebitda, ebit
    const revenueGrowth = ((endData.revenue - startData.revenue) / startData.revenue) * 100;
    const ebitdaGrowth = ((endData.ebitda - startData.ebitda) / startData.ebitda) * 100;
    const ebitGrowth = ((endData.ebit - startData.ebit) / startData.ebit) * 100;
    
    return (revenueGrowth + ebitdaGrowth + ebitGrowth) / 3;
  };

  // Aggregated data for comparison
  const aggregatedData = useMemo(() => {
    const selectedMetrics = [...selectedCompensationMetrics, ...selectedFinancialMetrics, ...selectedOperationalMetrics];

    if (comparisonType === 'company-vs-company') {
      const grouped: Record<string, any> = {};
      
      filteredExecutives.forEach((exec) => {
        const key = `${exec.company}_${exec.year}`;
        if (!grouped[key]) {
          grouped[key] = {
            name: exec.company,
            displayName: `${exec.company}\n${exec.year}`,
            year: exec.year,
            count: 0,
            ...Object.fromEntries(selectedMetrics.map((m) => [m, 0])),
          };
        }
        grouped[key].count++;
        selectedMetrics.forEach((metric) => {
          if (metric === 'growth') {
            grouped[key].growth = calculateFinancialGrowth(exec.company, selectedYears);
          } else {
            grouped[key][metric] += (exec[metric as keyof typeof exec] as number) / selectedMetrics.length;
          }
        });
      });

      // Add company financial metrics
      Object.keys(grouped).forEach((key) => {
        const [company, yearStr] = key.split('_');
        const year = parseInt(yearStr);
        const companyFinancials = companyDataByYear[company as keyof typeof companyDataByYear]?.[year as keyof typeof companyDataByYear[keyof typeof companyDataByYear]];
        
        if (companyFinancials) {
          if (selectedFinancialMetrics.includes('revenue')) grouped[key].revenue = companyFinancials.revenue;
          if (selectedFinancialMetrics.includes('ebitda')) grouped[key].ebitda = companyFinancials.ebitda;
          if (selectedFinancialMetrics.includes('ebit')) grouped[key].ebit = companyFinancials.ebit;
          if (selectedFinancialMetrics.includes('debt')) grouped[key].debt = companyFinancials.debt;
          grouped[key].employees = companyFinancials.employees;
          grouped[key].executives = companyFinancials.executives;
        }
      });

      return Object.values(grouped);
    } else if (comparisonType === 'executives-in-company') {
      return filteredExecutives.map((exec) => ({
        name: exec.name.split(' ')[0],
        displayName: `${exec.name.split(' ')[0]}\n${exec.year}`,
        position: exec.position,
        year: exec.year,
        ...Object.fromEntries(selectedMetrics.map((m) => [m, exec[m as keyof typeof exec]])),
      }));
    } else if (comparisonType === 'position-across-company') {
      const grouped: Record<string, any> = {};
      
      filteredExecutives.forEach((exec) => {
        const key = `${exec.company}_${exec.year}`;
        if (!grouped[key]) {
          grouped[key] = { 
            name: exec.company, 
            displayName: `${exec.company}\n${exec.year}`,
            year: exec.year,
            ...Object.fromEntries(selectedMetrics.map((m) => [m, 0])) 
          };
        }
        selectedMetrics.forEach((metric) => {
          if (metric === 'growth') {
            grouped[key].growth = calculateFinancialGrowth(exec.company, selectedYears);
          } else {
            grouped[key][metric] = exec[metric as keyof typeof exec] as number;
          }
        });
      });
      
      return Object.values(grouped);
    } else {
      // Tier comparison
      const grouped: Record<string, any> = {};
      
      filteredExecutives.forEach((exec) => {
        const key = `${exec.tier}_${exec.year}`;
        if (!grouped[key]) {
          grouped[key] = {
            name: exec.tier,
            displayName: `${exec.tier}\n${exec.year}`,
            year: exec.year,
            executives: [],
            ...Object.fromEntries(selectedMetrics.map((m) => [m, []])),
          };
        }
        grouped[key].executives.push(exec);
        selectedMetrics.forEach((metric) => {
          if (metric === 'growth') {
            if (!grouped[key].growthValues) grouped[key].growthValues = [];
            grouped[key].growthValues.push(calculateFinancialGrowth(exec.company, selectedYears));
          } else {
            grouped[key][metric].push(exec[metric as keyof typeof exec] as number);
          }
        });
      });

      return Object.entries(grouped).map(([key, data]: any) => {
        const result: any = { name: data.name, displayName: data.displayName, year: data.year };
        selectedMetrics.forEach((metric) => {
          if (metric === 'growth') {
            const growthValues = data.growthValues || [];
            result[metric] = growthValues.length > 0 ? growthValues.reduce((a: number, b: number) => a + b, 0) / growthValues.length : 0;
          } else {
            const values = data[metric];
            const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
            const min = Math.min(...values);
            const max = Math.max(...values);
            result[metric] = avg;
            result[`${metric}_min`] = min;
            result[`${metric}_max`] = max;
            result[`${metric}_range`] = `${min.toFixed(0)} - ${max.toFixed(0)}`;
          }
        });
        result.executiveCount = data.executives.length;
        return result;
      });
    }
  }, [filteredExecutives, comparisonType, selectedCompensationMetrics, selectedFinancialMetrics, selectedOperationalMetrics, selectedYears]);

  const selectedMetrics = [...selectedCompensationMetrics, ...selectedFinancialMetrics, ...selectedOperationalMetrics];

  const getComparisonTitle = () => {
    const yearRange = selectedYears.length > 1 ? ` (${Math.min(...selectedYears)} - ${Math.max(...selectedYears)})` : ` (${selectedYears[0]})`;
    switch (comparisonType) {
      case 'company-vs-company':
        return `${selectedCompanies.join(' vs ')}${yearRange}`;
      case 'executives-in-company':
        return `Executives in ${selectedCompanyForExecs}${yearRange}`;
      case 'position-across-company':
        return `${selectedPosition} Role Across Companies${yearRange}`;
      case 'tier-comparison':
        return `Tier Comparison ${selectedTiers.length > 0 ? `(${selectedTiers.join(', ')})` : '(All Tiers)'}${yearRange}`;
      default:
        return '';
    }
  };

  // Determine which columns to show in the table based on comparison type
  const getTableColumns = () => {
    if (comparisonType === 'company-vs-company') {
      return ['name', 'year', 'employees', 'executives', ...selectedMetrics];
    } else if (comparisonType === 'executives-in-company') {
      return ['name', 'year', 'position', ...selectedMetrics];
    } else if (comparisonType === 'position-across-company') {
      return ['name', 'year', ...selectedMetrics];
    } else {
      return ['name', 'year', 'executiveCount', ...selectedMetrics, ...selectedMetrics.filter((m) => compensationMetrics.some((c) => c.id === m)).map((m) => `${m}_range`)];
    }
  };

  const columns = getTableColumns();

  const getColumnLabel = (col: string) => {
    if (col === 'name') return comparisonType === 'company-vs-company' ? 'Company' : comparisonType === 'executives-in-company' ? 'Executive' : comparisonType === 'position-across-company' ? 'Company' : 'Tier';
    if (col === 'year') return 'Year';
    if (col === 'employees') return 'Employees';
    if (col === 'executives') return 'Executives';
    if (col === 'position') return 'Position';
    if (col === 'executiveCount') return 'Executive Count';
    if (col.endsWith('_range')) {
      const metricId = col.replace('_range', '');
      return `${allMetrics.find((m) => m.id === metricId)?.label} Range`;
    }
    const metric = allMetrics.find((m) => m.id === col);
    return metric?.label || col;
  };

  const getCellValue = (row: any, col: string) => {
    if (col === 'name') return row.name;
    if (col === 'year') return row.year;
    if (col === 'employees') return row.employees || '-';
    if (col === 'executives') return row.executives || '-';
    if (col === 'position') return row.position || '-';
    if (col === 'executiveCount') return row.executiveCount || '-';
    if (col.endsWith('_range')) return row[col] || '-';
    const value = row[col];
    if (typeof value === 'number') {
      if (col === 'growth') {
        return `${value.toFixed(2)}%`;
      }
      if (['revenue', 'ebitda', 'ebit', 'debt'].includes(col)) {
        return `US $${value.toFixed(0)}M`;
      }
      return `US $${value.toFixed(0)}`;
    }
    return value || '-';
  };

  const handleYearToggle = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year].sort((a, b) => b - a)
    );
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* LEFT SIDEBAR: Configuration */}
      <div className="w-96 bg-white border-r border-gray-300 p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Comparison Configuration</h2>

        {/* Comparison Type Selection */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Comparison Type</h3>
          <div className="space-y-3">
            {comparisonTypes.map((type) => (
              <label
                key={type.value}
                className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  comparisonType === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="comparison-type"
                  value={type.value}
                  checked={comparisonType === type.value}
                  onChange={(e) => setComparisonType(e.target.value as ComparisonType)}
                  className="w-4 h-4 mt-0.5"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{type.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Year Selection - Show for all comparison types */}
        {true && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Years</h3>
            <div className="space-y-2">
              {years.map((year) => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedYears.includes(year)}
                    onChange={() => handleYearToggle(year)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{year}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Type-Specific Filters */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>

          {comparisonType === 'company-vs-company' && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Select Companies to Compare</label>
              <div className="space-y-2">
                {companies.map((company) => (
                  <label key={company} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() => {
                        setSelectedCompanies((prev) =>
                          prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{company}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {comparisonType === 'executives-in-company' && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Select Company</label>
              <select
                value={selectedCompanyForExecs}
                onChange={(e) => setSelectedCompanyForExecs(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          )}

          {comparisonType === 'position-across-company' && (
            <>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-2">Select Position</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Filter by Tier (optional)</label>
                <div className="space-y-2">
                  {tiers.map((tier) => (
                    <label key={tier} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPositionTiers.includes(tier)}
                        onChange={() => {
                          setSelectedPositionTiers((prev) =>
                            prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
                          );
                        }}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {comparisonType === 'tier-comparison' && (
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Select Tiers (or leave empty for all)</label>
              <div className="space-y-2">
                {tiers.map((tier) => (
                  <label key={tier} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTiers.includes(tier)}
                      onChange={() => {
                        setSelectedTiers((prev) =>
                          prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{tier}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Compensation Metrics */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Compensation Metrics</h3>
          <div className="space-y-2">
            {compensationMetrics.map((metric) => (
              <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCompensationMetrics.includes(metric.id)}
                  onChange={() => {
                    setSelectedCompensationMetrics((prev) =>
                      prev.includes(metric.id) ? prev.filter((m) => m !== metric.id) : [...prev, metric.id]
                    );
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: metric.color }}></div>
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Financial Metrics</h3>
          <div className="space-y-2">
            {financialMetrics.map((metric) => (
              <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFinancialMetrics.includes(metric.id)}
                  onChange={() => {
                    setSelectedFinancialMetrics((prev) =>
                      prev.includes(metric.id) ? prev.filter((m) => m !== metric.id) : [...prev, metric.id]
                    );
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: metric.color }}></div>
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Operational Metrics */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Operational Metrics</h3>
          <p className="text-xs text-gray-500 mb-2">Growth is calculated across all financial metrics</p>
          <div className="space-y-2">
            {operationalMetrics.map((metric) => (
              <label key={metric.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedOperationalMetrics.includes(metric.id)}
                  onChange={() => {
                    setSelectedOperationalMetrics((prev) =>
                      prev.includes(metric.id) ? prev.filter((m) => m !== metric.id) : [...prev, metric.id]
                    );
                  }}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: metric.color }}></div>
                  <span className="text-sm text-gray-700">{metric.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedCompanies([companies[0], companies[1]]);
            setSelectedCompanyForExecs(companies[0]);
            setSelectedPosition(positions[0]);
            setSelectedPositionTiers([]);
            setSelectedTiers([]);
            setSelectedYears([2024, 2023]);
            setSelectedCompensationMetrics(['basePay', 'bonus']);
            setSelectedFinancialMetrics([]);
            setSelectedOperationalMetrics([]);
          }}
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* RIGHT CONTENT: Comparison Results */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{getComparisonTitle()}</h1>
          <p className="text-gray-600">
            {filteredExecutives.length} record{filteredExecutives.length !== 1 ? 's' : ''} • {selectedMetrics.length} metric{selectedMetrics.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredExecutives.length === 0 || selectedMetrics.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-gray-300">
            <p className="text-gray-500 text-lg">
              {filteredExecutives.length === 0 ? 'No data available for this comparison' : 'Select at least one metric to display'}
            </p>
          </div>
        ) : (
          <>
            {/* Chart Visualization */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6 border border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Comparison Chart</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={aggregatedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="displayName" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: any) => {
                      if (typeof value === 'number') {
                        return value.toFixed(2);
                      }
                      return value;
                    }}
                  />
                  <Legend />
                  {selectedMetrics.map((metric) => {
                    const metricColor = allMetrics.find((m) => m.id === metric)?.color || '#000';
                    return <Bar key={metric} dataKey={metric} fill={metricColor} />;
                  })}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col}
                          className={`px-4 py-3 text-sm font-semibold text-gray-700 ${
                            ['name', 'position'].includes(col) ? 'text-left' : 'text-right'
                          }`}
                        >
                          {getColumnLabel(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {aggregatedData.map((row, idx) => (
                      <tr key={idx} className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        {columns.map((col) => (
                          <td
                            key={col}
                            className={`px-4 py-3 text-sm text-gray-700 ${
                              ['name', 'position'].includes(col) ? 'text-left font-medium' : 'text-right'
                            }`}
                          >
                            {getCellValue(row, col)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Stats */}
            {selectedMetrics.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {selectedMetrics.map((metric) => {
                  const metricInfo = allMetrics.find((m) => m.id === metric);
                  const values = aggregatedData.map((row) => row[metric] || 0).filter((v) => v > 0);
                  if (values.length === 0) return null;

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
                            {metric === 'growth' ? `${average.toFixed(2)}%` : ['revenue', 'ebitda', 'ebit', 'debt'].includes(metric) ? `US $${average.toFixed(0)}M` : `US $${average.toFixed(0)}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Max</p>
                          <p className="text-sm font-medium text-green-600">
                            {metric === 'growth' ? `${max.toFixed(2)}%` : ['revenue', 'ebitda', 'ebit', 'debt'].includes(metric) ? `US $${max.toLocaleString()}M` : `US $${max.toLocaleString()}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Min</p>
                          <p className="text-sm font-medium text-orange-600">
                            {metric === 'growth' ? `${min.toFixed(2)}%` : ['revenue', 'ebitda', 'ebit', 'debt'].includes(metric) ? `US $${min.toLocaleString()}M` : `US $${min.toLocaleString()}`}
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
