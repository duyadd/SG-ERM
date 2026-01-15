import { useState } from 'react';
import { Upload } from 'lucide-react';
import { type UserRole } from '../../Header';
import React from 'react';

interface DataRow {
  name: string;
  role: string;
  lastUploadedDate: string;
  missingData: string;
}

interface DataManagementTemplateProps {
  title: string;
  pageTitle: string;
  dataRows: DataRow[];
  currentRole: UserRole;
}

export function DataManagementTemplate({
  title,
  pageTitle,
  dataRows,
  currentRole,
}: DataManagementTemplateProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');

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
      <h1 className="text-2xl font-bold mb-2">{title}</h1>

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
              <th className="px-6 py-4 text-left font-semibold">Executive</th>
              <th className="px-6 py-4 text-left font-semibold">Role</th>
              <th className="px-6 py-4 text-left font-semibold">Last Uploaded Date</th>
              <th className="px-6 py-4 text-left font-semibold">Missing Data</th>
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900">{row.name}</td>
                <td className="px-6 py-4 text-gray-900">{row.role}</td>
                <td className="px-6 py-4 text-gray-600">{row.lastUploadedDate || '-'}</td>
                <td className="px-6 py-4 text-gray-600">{row.missingData || '-'}</td>
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
    </div>
  );
}