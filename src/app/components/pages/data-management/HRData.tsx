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

  // Combined Pay + BSC columns
  const payBscColumns: ColumnDefinition[] = [
    { key: 'executive', label: 'Executive' },
    { key: 'position', label: 'Position' },
    { key: 'basePay', label: 'Base Pay' },
    { key: 'variablePay', label: 'Variable Pay' },
    { key: 'totalCompensation', label: 'Total Compensation' },
    { key: 'achievement', label: 'Achievement %' },
  ];

  const combinedData: DataRow[] = [
    {
      executive: 'Executive A',
      position: 'CEO',
      basePay: '$500,000',
      variablePay: '$200,000',
      totalCompensation: '$750,000',
      kpiObjective: 'Revenue Growth',
      achievement: '105%',
    },
    {
      executive: 'Executive A',
      position: 'CEO',
      basePay: '$500,000',
      variablePay: '$200,000',
      totalCompensation: '$750,000',
      kpiObjective: 'Cost Reduction',
      achievement: '120%',
    },
    {
      executive: 'Executive B',
      position: 'CFO',
      basePay: '$400,000',
      variablePay: '$150,000',
      totalCompensation: '$590,000',
      kpiObjective: 'Financial Accuracy',
      achievement: '100%',
    },
    {
      executive: 'Executive C',
      position: 'CMO',
      basePay: '$350,000',
      variablePay: '$100,000',
      totalCompensation: '$485,000',
      kpiObjective: 'Brand Awareness',
      achievement: '108%',
    },
    {
      executive: 'Executive D',
      position: 'COO',
      basePay: '$380,000',
      variablePay: '$120,000',
      totalCompensation: '$538,000',
      kpiObjective: 'Operational Efficiency',
      achievement: '98%',
    },
    {
      executive: 'Executive E',
      position: 'CTO',
      basePay: '$420,000',
      variablePay: '$130,000',
      totalCompensation: '$592,000',
      kpiObjective: 'Technology Innovation',
      achievement: '112%',
    },
  ];

  // Historical Pay data with year filter
  const historicalPayByYear: { [key: string]: DataRow[] } = {
    '2023': [
      {
        executive: 'Executive A',
        position: 'CEO',
        basePay: '$480,000',
        variablePay: '$180,000',
        totalCompensation: '$660,000',
        kpiObjective: 'Revenue Growth',
        achievement: '98%',
      },
      {
        executive: 'Executive A',
        position: 'CEO',
        basePay: '$480,000',
        variablePay: '$180,000',
        totalCompensation: '$660,000',
        kpiObjective: 'Cost Reduction',
        achievement: '115%',
      },
      {
        executive: 'Executive B',
        position: 'CFO',
        basePay: '$380,000',
        variablePay: '$140,000',
        totalCompensation: '$520,000',
        kpiObjective: 'Financial Accuracy',
        achievement: '95%',
      },
      {
        executive: 'Executive C',
        position: 'CMO',
        basePay: '$330,000',
        variablePay: '$90,000',
        totalCompensation: '$420,000',
        kpiObjective: 'Brand Awareness',
        achievement: '102%',
      },
    ],
    '2024': [
      {
        executive: 'Executive A',
        position: 'CEO',
        basePay: '$500,000',
        variablePay: '$200,000',
        totalCompensation: '$700,000',
        kpiObjective: 'Revenue Growth',
        achievement: '103%',
      },
      {
        executive: 'Executive A',
        position: 'CEO',
        basePay: '$500,000',
        variablePay: '$200,000',
        totalCompensation: '$700,000',
        kpiObjective: 'Cost Reduction',
        achievement: '118%',
      },
      {
        executive: 'Executive B',
        position: 'CFO',
        basePay: '$400,000',
        variablePay: '$150,000',
        totalCompensation: '$550,000',
        kpiObjective: 'Financial Accuracy',
        achievement: '99%',
      },
      {
        executive: 'Executive C',
        position: 'CMO',
        basePay: '$350,000',
        variablePay: '$100,000',
        totalCompensation: '$450,000',
        kpiObjective: 'Brand Awareness',
        achievement: '106%',
      },
    ],
    '2025': combinedData,
  };

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

  const getDisplayData = () => {
    return historicalPayByYear[year] || combinedData;
  };

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

      {/* Pay Information + BSC Achievements */}
      <h3 className="text-lg font-semibold mb-4">Pay Information & BSC Achievements</h3>
      {renderTable(payBscColumns, getDisplayData())}

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
