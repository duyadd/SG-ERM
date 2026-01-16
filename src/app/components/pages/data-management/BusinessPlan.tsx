import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { DataManagementTemplate, type ColumnDefinition, type DataRow } from './DataManagementTemplate';
import { Upload } from 'lucide-react';

interface BusinessPlanProps {
  currentRole: UserRole;
}

export function BusinessPlan({ currentRole }: BusinessPlanProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const columns: ColumnDefinition[] = [
    { key: 'department', label: 'Department' },
    { key: 'netProfit', label: 'Net Profit' },
    { key: 'ebit', label: 'EBIT' },
    { key: 'ebitda', label: 'EBITDA' },
    { key: 'asset', label: 'Asset' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'debt', label: 'Debt' },
  ];

  const allBusinessPlanRows: DataRow[] = [
    {
      department: 'Department A',
      netProfit: '$40M',
      ebit: '$60M',
      ebitda: '$70M',
      asset: '$400M',
      revenue: '$180M',
      debt: '$120M',
    },
    {
      department: 'Department B',
      netProfit: '$32M',
      ebit: '$50M',
      ebitda: '$58M',
      asset: '$320M',
      revenue: '$150M',
      debt: '$90M',
    },
    {
      department: 'Department C',
      netProfit: '$45M',
      ebit: '$70M',
      ebitda: '$80M',
      asset: '$450M',
      revenue: '$200M',
      debt: '$140M',
    },
    {
      department: 'Department D',
      netProfit: '$28M',
      ebit: '$42M',
      ebitda: '$50M',
      asset: '$280M',
      revenue: '$120M',
      debt: '$70M',
    },
    {
      department: 'Department E',
      netProfit: '$38M',
      ebit: '$58M',
      ebitda: '$68M',
      asset: '$380M',
      revenue: '$170M',
      debt: '$110M',
    },
  ];

  const filteredData = departmentFilter === 'all' 
    ? allBusinessPlanRows 
    : allBusinessPlanRows.filter((row) => row.department === departmentFilter);

  const departments = ['all', ...new Set(allBusinessPlanRows.map((row) => row.department as string))];

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
      <h1 className="text-2xl font-bold mb-6">Business Plan</h1>

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
        <h2 className="text-lg font-semibold mb-4">Filter Business Plan</h2>
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer"
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === 'all' ? 'All Departments' : department}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredData.length} of {allBusinessPlanRows.length} departments
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
        Data Management → Business Plan
      </div>
    </div>
  );
}
