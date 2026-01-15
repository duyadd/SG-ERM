import { ChevronDown } from 'lucide-react';
import { type UserRole } from './Header';
import React from 'react';

interface DataTableProps {
  currentRole: UserRole;
}

interface CompanyData {
  name: string;
  score: number;
  industryAverage: string;
  internal: string;
  external: string;
  lowerBound: string;
  upperBound: string;
}

const companyData: CompanyData[] = [
  {
    name: 'Company A',
    score: 0.77,
    industryAverage: '$500',
    internal: '$500',
    external: '$500',
    lowerBound: '$500',
    upperBound: '$500',
  },
  {
    name: 'Company B',
    score: 0.34,
    industryAverage: '$550',
    internal: '$550',
    external: '$550',
    lowerBound: '$550',
    upperBound: '$550',
  },
  {
    name: 'Company C',
    score: -0.02,
    industryAverage: '$300',
    internal: '$300',
    external: '$300',
    lowerBound: '$300',
    upperBound: '$300',
  },
  {
    name: 'Company D',
    score: -0.56,
    industryAverage: '$670',
    internal: '$670',
    external: '$670',
    lowerBound: '$670',
    upperBound: '$670',
  },
];

export function DataTable({ currentRole }: DataTableProps) {
  const canViewSensitiveData = currentRole === 'Super User' || currentRole === 'Data Analyst';

  return (
    <div className="flex-1 p-6">


      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Score</th>
              <th className="px-4 py-3 text-left">Industry Average</th>
              <th className="px-4 py-3 text-left">Internal</th>
              <th className="px-4 py-3 text-left">External</th>
              <th className="px-4 py-3 text-left">Lower Bound</th>
              <th className="px-4 py-3 text-left">Upper Bound</th>
            </tr>
          </thead>
          <tbody>
            {companyData.map((company, index) => (
              <tr 
                key={company.name} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}
              >
                <td className="px-4 py-6 border-r border-orange-200">{company.name}</td>
                <td className="px-4 py-6 border-r border-orange-200">
                  {canViewSensitiveData ? company.score : '***'}
                </td>
                <td className="px-4 py-6 border-r border-orange-200">
                  {company.industryAverage}
                </td>
                <td className="px-4 py-6 border-r border-orange-200">
                  {canViewSensitiveData ? company.internal : '***'}
                </td>
                <td className="px-4 py-6 border-r border-orange-200">
                  {canViewSensitiveData ? company.external : '***'}
                </td>
                <td className="px-4 py-6 border-r border-orange-200">
                  {company.lowerBound}
                </td>
                <td className="px-4 py-6">{company.upperBound}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentRole === 'User Manager' && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>User Manager:</strong> You have limited access. Score, Internal, and External data are hidden.
          </p>
        </div>
      )}
    </div>
  );
}
