import React, { useState } from 'react';
import { type UserRole } from '../../Header';
import { PAGE, TYPOGRAPHY, SPACING, INPUT, MARGIN_BOTTOM, COLORS, CARD, BUTTON } from '../../../constants/styles';

interface ExternalDataProps {
  currentRole: UserRole;
}

export function ExternalData({ currentRole }: ExternalDataProps) {
  const [company, setCompany] = useState('Company A');
  const [year, setYear] = useState('2025');

  return (
    <div className={PAGE.container}>
      {/* Header */}
      <div className={`${PAGE.header} ${MARGIN_BOTTOM.lg}`}>
        <h1 className={TYPOGRAPHY.pageTitle}>External Data</h1>
        <div className={`flex ${SPACING.md}`}>
          <div className="flex flex-col">
            <label className={INPUT.label}>Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={`${INPUT.select} w-48`}
            >
              <option>Company A</option>
              <option>Company B</option>
              <option>Company C</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className={INPUT.label}>Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={`${INPUT.select} w-48`}
            >
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* External Data Sources */}
      <div className={CARD.full}>
        <h2 className={`${TYPOGRAPHY.sectionTitle} ${MARGIN_BOTTOM.md}`}>Market Data Sources</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className={`px-4 py-3 text-left ${TYPOGRAPHY.label}`}>Data Source</th>
              <th className={`px-4 py-3 text-left ${TYPOGRAPHY.label}`}>Last Updated</th>
              <th className={`px-4 py-3 text-left ${TYPOGRAPHY.label}`}>Status</th>
              <th className={`px-4 py-3 text-left ${TYPOGRAPHY.label}`}>Records</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Market Salary Database</td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Jan 15, 2025</td>
              <td className={`px-4 py-3`}><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span></td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>15,420</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Industry Benchmarks</td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Dec 20, 2024</td>
              <td className={`px-4 py-3`}><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span></td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>3,250</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Economic Indicators</td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Jan 10, 2025</td>
              <td className={`px-4 py-3`}><span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span></td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>850</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Competitor Analysis</td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>Dec 31, 2024</td>
              <td className={`px-4 py-3`}><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span></td>
              <td className={`px-4 py-3 ${TYPOGRAPHY.body}`}>245</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Breadcrumb */}
      <div className="mt-8 text-sm text-gray-400">
        Data Management → External Data
      </div>
    </div>
  );
}
