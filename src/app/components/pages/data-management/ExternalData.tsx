import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { type ColumnDefinition, type DataRow } from './DataManagementTemplate';
import { Upload } from 'lucide-react';

interface ExternalDataProps {
  currentRole: UserRole;
}

export function ExternalData({ currentRole }: ExternalDataProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');

  const columns: ColumnDefinition[] = [
    { key: 'industry', label: 'Industry' },
    { key: 'avgSalary', label: 'Average Salary' },
    { key: 'standardDeviation', label: 'Standard Deviation' },
    { key: 'sampleSize', label: 'Sample Size' },
    { key: 'lastUpdated', label: 'Last Updated' },
  ];

  const allExternalDataRows: DataRow[] = [
    {
      industry: 'Technology',
      avgSalary: '$120,000',
      standardDeviation: '$35,000',
      sampleSize: '5,420',
      lastUpdated: 'Jan 15, 2025',
    },
    {
      industry: 'Finance',
      avgSalary: '$115,000',
      standardDeviation: '$40,000',
      sampleSize: '3,250',
      lastUpdated: 'Dec 20, 2024',
    },
    {
      industry: 'Manufacturing',
      avgSalary: '$95,000',
      standardDeviation: '$28,000',
      sampleSize: '2,890',
      lastUpdated: 'Jan 10, 2025',
    },
    {
      industry: 'Healthcare',
      avgSalary: '$105,000',
      standardDeviation: '$32,000',
      sampleSize: '1,850',
      lastUpdated: 'Dec 31, 2024',
    },
    {
      industry: 'Retail',
      avgSalary: '$52,000',
      standardDeviation: '$18,000',
      sampleSize: '4,245',
      lastUpdated: 'Jan 08, 2025',
    },
  ];

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
      <h1 className="text-2xl font-bold mb-6">External Data</h1>

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
            {allExternalDataRows.map((row, index) => (
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
        Data Management → External Data
      </div>
    </div>
  );
}
