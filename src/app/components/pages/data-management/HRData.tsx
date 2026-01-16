import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { type ColumnDefinition, type DataRow } from './DataManagementTemplate';

interface HRDataProps {
  currentRole: UserRole;
}

export function HRData({ currentRole }: HRDataProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');
  const [dataType, setDataType] = useState('currentPay'); // currentPay, historicalPay, bscAchievements

  // Current Pay columns
  const currentPayColumns: ColumnDefinition[] = [
    { key: 'executive', label: 'Executive' },
    { key: 'position', label: 'Position' },
    { key: 'pay', label: 'Base Pay' },
    { key: 'variable', label: 'Variable Pay' },
    { key: 'benefits', label: 'Benefits' },
    { key: 'totalCompensation', label: 'Total Compensation' },
  ];

  // Historical Pay columns
  const historicalPayColumns: ColumnDefinition[] = [
    { key: 'executive', label: 'Executive' },
    { key: 'position', label: 'Position' },
    { key: 'year', label: 'Year' },
    { key: 'basePay', label: 'Base Pay' },
    { key: 'variablePay', label: 'Variable Pay' },
    { key: 'totalCompensation', label: 'Total Compensation' },
    { key: 'percentChange', label: '% Change' },
  ];

  // BSC Achievements columns
  const bscColumns: ColumnDefinition[] = [
    { key: 'executive', label: 'Executive' },
    { key: 'position', label: 'Position' },
    { key: 'kpiObjective', label: 'KPI Objective' },
    { key: 'target', label: 'Target' },
    { key: 'actual', label: 'Actual' },
    { key: 'achievement', label: 'Achievement %' },
    { key: 'status', label: 'Status' },
  ];

  const currentPayData: DataRow[] = [
    {
      executive: 'Executive A',
      position: 'CEO',
      pay: '$500,000',
      variable: '$200,000',
      benefits: '$50,000',
      totalCompensation: '$750,000',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      pay: '$400,000',
      variable: '$150,000',
      benefits: '$40,000',
      totalCompensation: '$590,000',
    },
    {
      executive: 'Executive C',
      position: 'CMO',
      pay: '$350,000',
      variable: '$100,000',
      benefits: '$35,000',
      totalCompensation: '$485,000',
    },
    {
      executive: 'Executive D',
      position: 'COO',
      pay: '$380,000',
      variable: '$120,000',
      benefits: '$38,000',
      totalCompensation: '$538,000',
    },
    {
      executive: 'Executive E',
      position: 'CTO',
      pay: '$420,000',
      variable: '$130,000',
      benefits: '$42,000',
      totalCompensation: '$592,000',
    },
  ];

  const historicalPayData: DataRow[] = [
    {
      executive: 'Executive A',
      position: 'CEO',
      year: '2023',
      basePay: '$480,000',
      variablePay: '$180,000',
      totalCompensation: '$660,000',
      percentChange: '+13.6%',
    },
    {
      executive: 'Executive A',
      position: 'CEO',
      year: '2024',
      basePay: '$500,000',
      variablePay: '$200,000',
      totalCompensation: '$700,000',
      percentChange: '+6.1%',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      year: '2023',
      basePay: '$380,000',
      variablePay: '$140,000',
      totalCompensation: '$520,000',
      percentChange: '+13.5%',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      year: '2024',
      basePay: '$400,000',
      variablePay: '$150,000',
      totalCompensation: '$550,000',
      percentChange: '+7.3%',
    },
    {
      executive: 'Executive C',
      position: 'CMO',
      year: '2023',
      basePay: '$330,000',
      variablePay: '$90,000',
      totalCompensation: '$420,000',
      percentChange: '+15.5%',
    },
  ];

  const bscAchievementsData: DataRow[] = [
    {
      executive: 'Executive A',
      position: 'CEO',
      kpiObjective: 'Revenue Growth',
      target: '$100M',
      actual: '$105M',
      achievement: '105%',
      status: 'Exceeded',
    },
    {
      executive: 'Executive A',
      position: 'CEO',
      kpiObjective: 'Cost Reduction',
      target: '5%',
      actual: '6%',
      achievement: '120%',
      status: 'Exceeded',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      kpiObjective: 'Financial Accuracy',
      target: '99.5%',
      actual: '99.8%',
      achievement: '100%',
      status: 'Met',
    },
    {
      executive: 'Executive C',
      position: 'CMO',
      kpiObjective: 'Brand Awareness',
      target: '60%',
      actual: '65%',
      achievement: '108%',
      status: 'Exceeded',
    },
    {
      executive: 'Executive D',
      position: 'COO',
      kpiObjective: 'Operational Efficiency',
      target: '92%',
      actual: '90%',
      achievement: '98%',
      status: 'Met',
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

  const renderTable = (columns: ColumnDefinition[], data: DataRow[]) => (
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
          {data.map((row, index) => (
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
  );

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">HR Data - Pay Information</h1>

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

      {/* Data Type Filter */}
      <div className="bg-white rounded border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Data Type</h2>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dataType"
              value="currentPay"
              checked={dataType === 'currentPay'}
              onChange={(e) => setDataType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">Current Pay</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dataType"
              value="historicalPay"
              checked={dataType === 'historicalPay'}
              onChange={(e) => setDataType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">Historical Pay Data</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="dataType"
              value="bscAchievements"
              checked={dataType === 'bscAchievements'}
              onChange={(e) => setDataType(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-gray-700">BSC Achievements</span>
          </label>
        </div>
      </div>

      {/* Data Tables */}
      {dataType === 'currentPay' && (
        <>
          <h3 className="text-lg font-semibold mb-4">Current Pay Information</h3>
          {renderTable(currentPayColumns, currentPayData)}
        </>
      )}

      {dataType === 'historicalPay' && (
        <>
          <h3 className="text-lg font-semibold mb-4">Historical Pay Data</h3>
          {renderTable(historicalPayColumns, historicalPayData)}
        </>
      )}

      {dataType === 'bscAchievements' && (
        <>
          <h3 className="text-lg font-semibold mb-4">BSC (Balanced Scorecard) Achievements</h3>
          {renderTable(bscColumns, bscAchievementsData)}
        </>
      )}

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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
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
        Data Management → HR Data
      </div>
    </div>
  );
}
