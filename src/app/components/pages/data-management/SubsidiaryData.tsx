import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { DataManagementTemplate, type ColumnDefinition, type DataRow } from './DataManagementTemplate';
import { Upload } from 'lucide-react';

interface SubsidiaryDataProps {
  currentRole: UserRole;
}

export function SubsidiaryData({ currentRole }: SubsidiaryDataProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [strategicImportanceFilter, setStrategicImportanceFilter] = useState('all');

  const columns: ColumnDefinition[] = [
    { key: 'subsidiaryName', label: 'Subsidiary Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'establishedYear', label: 'Established Year' },
    { key: 'headcount', label: 'Headcount' },
    { key: 'strategicImportance', label: 'Strategic Importance' },
    { key: 'strategicScore', label: 'Strategic Score' },
    { key: 'benchmarkTeamValue', label: 'Benchmark Team Value' },
    { key: 'longStrategy', label: 'Long Strategy' },
  ];

  const allSubsidiaryDataRows: DataRow[] = [
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
    {
      subsidiaryName: 'Subsidiary D',
      industry: 'Retail',
      establishedYear: '2018',
      headcount: '250',
      strategicImportance: 'Low',
      strategicScore: '45',
      benchmarkTeamValue: '$15M',
      longStrategy: 'Divestment',
    },
    {
      subsidiaryName: 'Subsidiary E',
      industry: 'Healthcare',
      establishedYear: '2020',
      headcount: '400',
      strategicImportance: 'Medium',
      strategicScore: '65',
      benchmarkTeamValue: '$40M',
      longStrategy: 'Growth',
    },
  ];

  // Filter data based on selected filters
  const filteredData = allSubsidiaryDataRows.filter((row) => {
    const industryMatch = industryFilter === 'all' || row.industry === industryFilter;
    const importanceMatch = strategicImportanceFilter === 'all' || row.strategicImportance === strategicImportanceFilter;
    return industryMatch && importanceMatch;
  });

  // Get unique industries and strategic importance values
  const industries = ['all', ...new Set(allSubsidiaryDataRows.map((row) => row.industry as string))];
  const strategicImportances = ['all', ...new Set(allSubsidiaryDataRows.map((row) => row.strategicImportance as string))];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Subsidiary Data</h1>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer"
          >
            <option>Company A</option>
            <option>Company B</option>
            <option>Company C</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer"
          >
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Subsidiary Data</h2>
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer"
            >
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Strategic Importance</label>
            <select
              value={strategicImportanceFilter}
              onChange={(e) => setStrategicImportanceFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer"
            >
              {strategicImportances.map((importance) => (
                <option key={importance} value={importance}>
                  {importance === 'all' ? 'All Importance Levels' : importance}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {allSubsidiaryDataRows.length} subsidiaries
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded border border-gray-200 overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-500 text-white">
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 text-left font-semibold">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-gray-900">
                    {row[column.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File Upload Section */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
          <div className="flex items-center">
            <input
              type="file"
              id="file-input"
              onChange={handleFileSelect}
              className="hidden"
              accept=".xlsx,.xls,.csv,.pdf"
            />
            <label
              htmlFor="file-input"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-gray-700 cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              {selectedFile ? selectedFile.name : 'Attach File Here...'}
            </label>
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="px-6 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="mt-8 text-sm text-gray-400">
        Data Management → Subsidiary Data
      </div>
    </div>
  );
}
