import React, { useState } from 'react';
import { ConfigurationPanel } from '../../ConfigurationPanel';
import { type UserRole } from '../../Header';
import { PAGE_PATHS } from '../../../constants/pagePaths';
import { PAGE, TYPOGRAPHY, SPACING, INPUT, MARGIN_BOTTOM, COLORS, CARD, PADDING } from '../../../constants/styles';

interface ClusterAnalysisProps {
  currentRole: UserRole;
  selectedTier: string;
  onSelectTier: (tier: string) => void;
}

const tiers = [
  {
    name: 'Tier 1',
    companies: ['Shunkhlai', 'APU'],
  },
  {
    name: 'Tier 2',
    companies: ['Skytel', 'GSB', 'DC', 'APU Dairy'],
  },
  {
    name: 'Tier 3',
    companies: ['ZeroTech', 'Suntrans', 'SD Service', 'S-systems'],
  },
  {
    name: 'Tier 4',
    companies: ['Media Group', 'SD and DSG', 'Boost', 'UB cinema', 'MMGC'],
  },
  {
    name: 'Tier 5',
    companies: ['GSB Mining', 'Orange Air', 'PowerUnit', 'SGIS'],
  },
];

const initialTierRanges = [
  { tier: 'Tier 1', min: 100, max: 200 },
  { tier: 'Tier 2', min: 80, max: 100 },
  { tier: 'Tier 3a', min: 50, max: 80 },
  { tier: 'Tier 3b', min: 50, max: 80 },
  { tier: 'Tier 4', min: 10, max: 50 },
];

export function ClusterAnalysis({
  currentRole,
  selectedTier,
  onSelectTier,
}: ClusterAnalysisProps) {
  const [tierRanges, setTierRanges] = useState(initialTierRanges);
  const [optimalCluster, setOptimalCluster] = useState(3); // Default optimal cluster value
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Handler to show popup when "Run Analysis" is clicked
  const handleRunAnalysis = () => {
    setPopupVisible(true);
  };

  // Save all tier ranges at once (only one save button)
  const handleSaveRange = () => {
    console.log('Saved tier ranges:', tierRanges);
    // Add your save logic here
    // Example: API call to save data
    // await saveTierRanges(tierRanges);
  };

  // Handler to close popup
  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  // Handler to continue with analysis
  const handlePopupContinue = () => {
    console.log('Continuing with optimal cluster:', optimalCluster);
    setPopupVisible(false);
    // Add your continue logic here
    // Example: Run the actual analysis with the optimal cluster value
    // await runClusterAnalysis(optimalCluster);
  };

  // Handler to edit cluster value
  const handleClusterEdit = (newClusterValue: number) => {
    setOptimalCluster(newClusterValue);
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* LEFT: Configuration */}
      <ConfigurationPanel
        currentRole={currentRole}
        onRunAnalysis={handleRunAnalysis}
        variant={PAGE_PATHS.CLUSTER_ANALYSIS}
        currentPage={PAGE_PATHS.CLUSTER_ANALYSIS}
      />

      {/* CENTER: Tier blocks */}
      <div className={`flex-1 ${SPACING.lg} p-8`}>
        <div className={`space-y-6`}>
          {tiers.map((tier, index) => {
            const isActive = tier.name === selectedTier;

            return (
              <div key={tier.name} className="flex items-stretch gap-4">
                {/* Tier label (CLICKABLE) */}
                <div className="w-28 flex-shrink-0">
                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full h-full text-white text-center font-semibold rounded transition ${
                      isActive
                        ? 'bg-orange-600'
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    {tier.name}
                  </button>
                </div>

                {/* Companies */}
                <div className={`flex-1 bg-orange-50 border border-orange-300 rounded ${PADDING.md} flex items-center`}>
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-16 text-gray-800 w-full">
                    {tier.companies.map((company) => (
                      <li key={company} className="flex items-center gap-2">
                        <span className="text-lg leading-none">•</span>
                        <span className={TYPOGRAPHY.body}>{company}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tier Range - inline with each tier */}
                <div className="w-100 flex-shrink-0 bg-white border border-gray-300 rounded p-4 flex flex-col justify-center">
                  <div className="text-xs text-gray-500 mb-2">Tier Range</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500">Min</div>
                      <input
                        type="number"
                        value={tierRanges[index].min}
                        onChange={(e) =>
                          setTierRanges((prevRanges) => {
                            const updatedRanges = [...prevRanges];
                            updatedRanges[index] = { ...updatedRanges[index], min: Number(e.target.value) };
                            return updatedRanges;
                          })
                        }
                        className="text-xl font-bold text-gray-800 w-24"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Max</div>
                      <input
                        type="number"
                        value={tierRanges[index].max}
                        onChange={(e) =>
                          setTierRanges((prevRanges) => {
                            const updatedRanges = [...prevRanges];
                            updatedRanges[index] = { ...updatedRanges[index], max: Number(e.target.value) };
                            return updatedRanges;
                          })
                        }
                        className="text-xl font-bold text-gray-800 w-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button - styled to match design system */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSaveRange}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-8 py-3 transition-colors shadow-sm"
          >
            Save Tier Ranges
          </button>
        </div>

        {/* Analysis Result Image */}
        <div className="mt-8">
          <img
            src="/output.png"  // Path to your uploaded image
            alt="Analysis Result"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Popup for optimal cluster edit */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}  // Apply rgba(0, 0, 0, 0.5) for 50% opacity
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">Optimal Cluster Number</h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Edit optimal cluster number:
              </label>
              <input
                type="number"
                value={optimalCluster}
                onChange={(e) => handleClusterEdit(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-800 text-lg"
                min="1"
                max="10"
              />
              <p className="mt-3 text-sm text-gray-500">
                Enter the desired number of clusters for analysis (typically between 2-6)
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
              <button
                onClick={handlePopupClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupContinue}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors shadow-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
