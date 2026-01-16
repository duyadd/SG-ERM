import React, { useState } from 'react';
import { type UserRole } from '../../Header';

export interface ColumnDefinition {
  key: string;
  label: string;
}

export interface DataRow {
  [key: string]: string | number | undefined;
}

interface MasterDataProps {
  currentRole: UserRole;
}

export function MasterData({ currentRole }: MasterDataProps) {
  const [filterType, setFilterType] = useState('all'); // all, hrData, subsidiaryData

  // HR Master Data columns
  const hrColumns: ColumnDefinition[] = [
    { key: 'executive', label: 'Executive' },
    { key: 'position', label: 'Position' },
    { key: 'company', label: 'Company' },
    { key: 'experience', label: 'Experience' },
    { key: 'budgetResponsibility', label: 'Budget Responsibility' },
    { key: 'tenure', label: 'Tenure' },
    { key: 'location', label: 'Location' },
    { key: 'successionReadiness', label: 'Succession Readiness' },
    { key: 'education', label: 'Education' },
  ];

  // Subsidiary Master Data columns
  const subsidiaryColumns: ColumnDefinition[] = [
    { key: 'subsidiaryName', label: 'Subsidiary Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'establishedYear', label: 'Established Year' },
    { key: 'headcount', label: 'Headcount' },
    { key: 'strategicImportance', label: 'Strategic Importance' },
    { key: 'strategicScore', label: 'Strategic Score' },
    { key: 'benchmarkTeamValue', label: 'Benchmark Team Value' },
    { key: 'longStrategy', label: 'Long Strategy' },
  ];

  const hrDataRows: DataRow[] = [
    {
      executive: 'Executive A',
      position: 'CEO',
      company: 'Company A',
      experience: '15 years',
      budgetResponsibility: '$10M',
      tenure: '5 years',
      location: 'New York',
      successionReadiness: 'High',
      education: 'MBA',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      company: 'Company A',
      experience: '12 years',
      budgetResponsibility: '$8M',
      tenure: '4 years',
      location: 'New York',
      successionReadiness: 'Medium',
      education: 'CPA',
    },
    {
      executive: 'Executive C',
      position: 'CMO',
      company: 'Company A',
      experience: '10 years',
      budgetResponsibility: '$5M',
      tenure: '3 years',
      location: 'San Francisco',
      successionReadiness: 'High',
      education: 'MBA',
    },
  ];

  const subsidiaryDataRows: DataRow[] = [
    {
      subsidiaryName: 'Subsidiary A',
      industry: 'Technology',
      establishedYear: '2010',
      headcount: '500',
      strategicImportance: 'High',
      strategicScore: '85',
      benchmarkTeamValue: '$50M',
      longStrategy: 'Expansion',
    },
    {
      subsidiaryName: 'Subsidiary B',
      industry: 'Finance',
      establishedYear: '2015',
      headcount: '300',
      strategicImportance: 'Medium',
      strategicScore: '70',
      benchmarkTeamValue: '$30M',
      longStrategy: 'Consolidation',
    },
    {
      subsidiaryName: 'Subsidiary C',
      industry: 'Manufacturing',
      establishedYear: '2012',
      headcount: '800',
      strategicImportance: 'High',
      strategicScore: '80',
      benchmarkTeamValue: '$60M',
      longStrategy: 'Optimization',
    },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Master Data</h1>

      {/* Filter Controls */}
      <div className="bg-white rounded border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter by Type</h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filterType"
              value="all"
              checked={filterType === 'all'}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">All Master Data</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filterType"
              value="hrData"
              checked={filterType === 'hrData'}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">HR Master Data</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="filterType"
              value="subsidiaryData"
              checked={filterType === 'subsidiaryData'}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">Subsidiary Master Data</span>
          </label>
        </div>
      </div>

      {/* HR Master Data Section */}
      {(filterType === 'all' || filterType === 'hrData') && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">HR Master Data</h2>
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-500 text-white">
                  {hrColumns.map((column) => (
                    <th key={column.key} className="px-6 py-4 text-left font-semibold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hrDataRows.map((row, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    {hrColumns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-gray-900">
                        {row[column.key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subsidiary Master Data Section */}
      {(filterType === 'all' || filterType === 'subsidiaryData') && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Subsidiary Master Data</h2>
          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {subsidiaryColumns.map((column) => (
                    <th key={column.key} className="px-6 py-4 text-left font-semibold">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subsidiaryDataRows.map((row, index) => (
                  <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                    {subsidiaryColumns.map((column) => (
                      <td key={column.key} className="px-6 py-4 text-gray-900">
                        {row[column.key] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mt-8 text-sm text-gray-400">
        Settings → Master Data
      </div>
    </div>
  );
}
