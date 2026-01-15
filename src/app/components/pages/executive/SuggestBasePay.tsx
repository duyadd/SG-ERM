import { ChevronDown } from 'lucide-react';
import { type UserRole } from '../../Header';
import React from 'react';

interface SuggestBasePayProps {
  currentRole: UserRole;
}

interface Variable {
  name: string;
  weight: string;
  value: string | number;
  weightedScore: number;
  isSubItem?: boolean;
  hasSubItems?: boolean;
}

const variables: Variable[] = [
  { name: 'Revenue', weight: '0.3', value: '$400', weightedScore: 0.45, hasSubItems: false },
  { name: 'Equity', weight: '0.1', value: '$300', weightedScore: 0.31, hasSubItems: false },
  { name: 'Complexity', weight: '0.3', value: '', weightedScore: 0.56, hasSubItems: true },
  { name: 'Headcount', weight: '0.2', value: 23, weightedScore: 0.32, isSubItem: true },
  { name: 'Budget Responsibility', weight: '0.1', value: '$5000', weightedScore: 0.48, isSubItem: true },
  { name: 'Experience', weight: '0.3', value: '', weightedScore: 0.25, hasSubItems: true },
  { name: 'Managerial', weight: '0.1', value: 5, weightedScore: 0.66, isSubItem: true },
  { name: 'Industry', weight: '0.1', value: 8, weightedScore: -0.06, isSubItem: true },
  { name: 'International', weight: '0.1', value: 2, weightedScore: -0.35, isSubItem: true },
];

export function SuggestBasePay({ currentRole }: SuggestBasePayProps) {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Suggest Base Pay</h1>
      
      <div className="flex gap-4 mb-6">
            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]">
                <option>Tier 1</option>
                <option>Tier 2</option>
                <option>Tier 3</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>

            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]">
                <option>Company A</option>
                <option>Company B</option>
                <option>Company C</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>

            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 min-w-[150px]">
                <option>Position</option>
                <option>CEO</option>
                <option>CFO</option>
                <option>CTO</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            </div>

            <div className="flex items-center gap-2 ml-8">
              <span>Industry:</span>
              <button className="underline">Beverage</button>
            </div>

            <div className="flex items-center gap-2 ml-8">
              <span>Executive Name:</span>
              <button className="underline">A. Bayar</button>
            </div>
          </div>
      <div className="flex gap-8">
        {/* Left Section */}
        <div className="flex-1">
          {/* Variables Table */}
          <div className="bg-white rounded border border-gray-300">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="px-4 py-3 text-left">Variable</th>
                  <th className="px-4 py-3 text-left">Weight</th>
                  <th className="px-4 py-3 text-left">Value</th>
                  <th className="px-4 py-3 text-left">Weighted Score</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((variable, index) => (
                  <tr 
                    key={variable.name + index}
                    className={`border-b border-gray-200 ${variable.isSubItem ? 'bg-gray-50' : ''}`}
                  >
                    <td className={`px-4 py-3 ${variable.isSubItem ? 'pl-12 text-gray-600' : variable.hasSubItems ? '' : ''}`}>
                      {variable.name}
                    </td>
                    <td className="px-4 py-3">{variable.weight}</td>
                    <td className="px-4 py-3">{variable.value}</td>
                    <td className="px-4 py-3">{variable.weightedScore !== 0 ? variable.weightedScore.toFixed(2) : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-gray-400 text-sm">
            Executive -&gt; Suggest Base Pay
          </div>
        </div>

        {/* Right Section - Score Cards */}
        <div className="w-64 space-y-4">
          <ScoreCard label="Total Score:" value="1.43" />
          <ScoreCard label="Tier Average:" value="$500" />
          <ScoreCard label="Industry Average:" value="$450" />
          <ScoreCard label="Lower Bound:" value="$420" />
          <ScoreCard label="Upper Bound:" value="$540" />
        </div>
      </div>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border-2 border-green-500 rounded-lg p-4 flex justify-between items-center">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
