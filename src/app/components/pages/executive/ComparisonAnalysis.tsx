import React, { useState } from 'react';
import { ConfigurationPanel } from '../../ConfigurationPanel';
import { type UserRole } from '../../Header';

interface ComparisonAnalysisProps {
  currentRole: UserRole;
}

const companies = ['Company A', 'Company B', 'Company C', 'Company D'];
const metrics = ['Net Profit', 'Growth Rate'];

export function ComparisonAnalysis({ currentRole }: ComparisonAnalysisProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('Net Profit');

  const handleCompanySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCompanies(selected);
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(e.target.value);
  };

  return (
    <div className="flex h-full bg-gray-50">

      {/* CENTER: Comparison Section */}
      <div className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-6">Comparison Analysis</h2>
        
        <label htmlFor="company-select" className="block text-lg font-medium mb-2">
          Select Companies
        </label>
        <select
          id="company-select"
          multiple
          className="border p-2 rounded w-full mb-6"
          onChange={handleCompanySelection}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <label htmlFor="metric-select" className="block text-lg font-medium mb-2">
          Select Metric
        </label>
        <select
          id="metric-select"
          className="border p-2 rounded w-full mb-6"
          onChange={handleMetricChange}
        >
          {metrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>

        {/* Comparison Results */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Comparison for Metric: {selectedMetric}</h3>
          {selectedCompanies.length > 0 ? (
            <ul className="space-y-4">
              {selectedCompanies.map((company) => (
                <li key={company} className="text-gray-800">
                  {company}: {Math.random() * 1000} {/* Randomized for demo */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Select companies to compare</p>
          )}
        </div>
      </div>
    </div>
  );
}
