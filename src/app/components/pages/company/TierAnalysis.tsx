import { type UserRole } from '../../Header';
import { ConfigurationPanel } from '../../ConfigurationPanel';
import { DataTable } from '../../DataTable';
import { PAGE_PATHS } from '../../../constants/pagePaths';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface TierAnalysisProps {
  currentRole: UserRole;
  selectedTier: string;
}

export function TierAnalysis({ currentRole, selectedTier: initialTier }: TierAnalysisProps) {
  const [selectedTier, setSelectedTier] = useState(initialTier);
  const [selectedPosition, setSelectedPosition] = useState('CEO');
  
  const canEdit = currentRole === 'Super User' || currentRole === 'User Manager';

  const handleRunAnalysis = () => {
    // Analysis logic
    console.log('Running analysis for:', { selectedTier, selectedPosition });
  };

  return (
    <div className="flex-1 flex">
      <ConfigurationPanel
        currentRole={currentRole}
        onRunAnalysis={handleRunAnalysis}
        variant={PAGE_PATHS.TIER_ANALYSIS}
        selectedTier={selectedTier}
        onTierChange={(tier) => {
          setSelectedTier(tier);
          console.log('Tier changed to:', tier);
        }}
        currentPage={PAGE_PATHS.TIER_ANALYSIS}
      />

      <div className="flex-1 flex flex-col">
        {/* Filter Section */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              {/* Tier Selection */}
              <div className="relative w-48">
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  disabled={!canEdit}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option>Tier 1</option>
                  <option>Tier 2</option>
                  <option>Tier 3</option>
                  <option>Tier 4</option>
                  <option>Tier 5</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>

              {/* Position Selection */}
              <div className="relative w-48">
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  disabled={!canEdit}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="CEO">Position: CEO</option>
                  <option value="CFO">Position: CFO</option>
                  <option value="CTO">Position: CTO</option>
                  <option value="COO">Position: COO</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>

            <div className="flex gap-6 items-center">
              {/* Tier Average Base */}
              <div className="text-base">
                Tier Average Base: <span className="font-semibold underline">$480</span>
              </div>

              {/* Tolerance Selection */}
              <div className="relative w-48">
                <select
                  disabled={!canEdit}
                  className="w-full px-4 py-2 border border-gray-300 rounded bg-white appearance-none pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option>Tolerance: 10%</option>
                  <option>Tolerance: 15%</option>
                  <option>Tolerance: 20%</option>
                  <option>Tolerance: 25%</option>
                  <option>Tolerance: 30%</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable currentRole={currentRole} />
      </div>
    </div>
  );
}