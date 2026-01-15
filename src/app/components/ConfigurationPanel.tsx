import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { type UserRole } from './Header';
import { PAGE_PATHS } from '../constants/pagePaths';
import React from 'react';

type ConfigurationVariant = typeof PAGE_PATHS.TIER_ANALYSIS | typeof PAGE_PATHS.CLUSTER_ANALYSIS;

interface ConfigurationPanelProps {
  currentRole: UserRole;
  onRunAnalysis: () => void;
  variant?: ConfigurationVariant;
  selectedTier?: string;
  onTierChange?: (tier: string) => void;
  currentPage?: string;
}

// Default weights
const DEFAULT_WEIGHTS = {
  Asset: 0.2,
  Netprofit: 0.4,
  StrategicImportance: 0.4,
  StrategicImportanceSub: {
    StrategicScore: 0.1,
    Synergy: 0.1,
    DigitalTransformation: 0.05,
    LongTermValue: 0.05,
  },
};

// Breadcrumb path mapping
const PAGE_BREADCRUMBS: Record<string, string> = {
  [PAGE_PATHS.CLUSTER_ANALYSIS]: 'Company → Cluster Analysis',
  [PAGE_PATHS.TIER_ANALYSIS]: 'Company → Cluster Analysis → Tier Analysis',
  [PAGE_PATHS.ANNUAL_BONUS_FORECAST]: 'Company → Annual Bonus Forecast',
  [PAGE_PATHS.TOTAL_REWARD_ANALYSIS]: 'Executive → Total Reward Analysis',
  [PAGE_PATHS.SUGGEST_BASE_PAY]: 'Executive → Total Reward Analysis → Suggest Base Pay',
  [PAGE_PATHS.SUGGEST_VARIABLE_PAY]: 'Executive → Total Reward Analysis → Suggest Variable Pay',
  [PAGE_PATHS.BENEFITS_ALLOWANCES]: 'Executive → Total Reward Analysis → Benefits & Allowances',
  [PAGE_PATHS.COMPARISON_ANALYSIS]: 'Executive → Comparison Analysis',
  [PAGE_PATHS.HR_DATA]: 'Data Management → HR Data',
  [PAGE_PATHS.SUBSIDIARY_DATA]: 'Data Management → Subsidiary Data',
  [PAGE_PATHS.BUSINESS_PLAN]: 'Data Management → Business Plan',
  [PAGE_PATHS.FINANCE_DATA]: 'Data Management → Finance Data',
  [PAGE_PATHS.EXTERNAL_DATA]: 'Data Management → External Data',
  [PAGE_PATHS.USER_ACCESS_MANAGEMENT]: 'Settings → User Access Management',
  [PAGE_PATHS.FRAMEWORK_ADJUSTMENT]: 'Settings → Framework Adjustment',
};

export function ConfigurationPanel({
  currentRole,
  onRunAnalysis,
  variant = PAGE_PATHS.TIER_ANALYSIS,
  selectedTier = 'Tier 1',
  onTierChange,
  currentPage,
}: ConfigurationPanelProps) {
  const canEdit = currentRole === 'Super User' || currentRole === 'User Manager';
  const canRunAnalysis = currentRole !== 'Data Analyst';

  // Get breadcrumb for current page
  const breadcrumb = currentPage ? PAGE_BREADCRUMBS[currentPage] : PAGE_BREADCRUMBS[variant];

  // State for managing weights
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // Handle resetting weights to default
  const resetToDefault = () => setWeights(DEFAULT_WEIGHTS);

  // Handle change in strategic importance sub-item weights and ensure they sum up to the main weight
  const handleSubWeightChange = (label: string, value: number) => {
    const newSubWeights = { ...weights.StrategicImportanceSub, [label]: value };
    // Calculate Complexity (Headcount + Budget Responsibility)
    const complexitySum = newSubWeights.StrategicScore + newSubWeights.Synergy;
    // Calculate Experience (Managerial + Industry + International)
    const experienceSum = newSubWeights.DigitalTransformation + newSubWeights.LongTermValue;
    const total = complexitySum + experienceSum;
    setWeights({
      ...weights,
      StrategicImportance: total,
      StrategicImportanceSub: newSubWeights,
    });
  };

  // Handle change in Asset, Netprofit, and StrategicImportance
  const handleWeightChange = (label: string, value: number) => {
    if (label === 'Strategic Importance' || label === 'Complexity') {
      // For StrategicImportance/Complexity, just update the value directly
      setWeights({
        ...weights,
        StrategicImportance: value,
      });
    } else if (label === 'Asset' || label === 'Revenue') {
      setWeights({
        ...weights,
        Asset: value,
      });
    } else if (label === 'Netprofit' || label === 'Equity') {
      setWeights({
        ...weights,
        Netprofit: value,
      });
    }
  };

  /* =========================
     CLUSTER ANALYSIS
     ========================= */
  if (variant === PAGE_PATHS.CLUSTER_ANALYSIS) {
    return (
      <div className="w-80 bg-white px-6 py-8 border-r">
        <div className="text-center font-semibold mb-4">
          Variable Weight Adjustment
        </div>

        <div className="border-t-2 border-green-500 mb-6" />

        <div className="space-y-6 text-gray-900">
          <Row
            label="Asset"
            value={weights.Asset.toString()}
            onChange={(value) => handleWeightChange('Asset', value)}
            canEdit={canEdit}
          />
          <Row
            label="Netprofit"
            value={weights.Netprofit.toString()}
            onChange={(value) => handleWeightChange('Netprofit', value)}
            canEdit={canEdit}
          />
          <Row
            label="Strategic Importance"
            value={(weights.StrategicImportanceSub.StrategicScore + weights.StrategicImportanceSub.Synergy + weights.StrategicImportanceSub.DigitalTransformation + weights.StrategicImportanceSub.LongTermValue).toString()}
            canEdit={false}
          />
        </div>

        <div className="mt-6 space-y-4 text-gray-600 text-sm">
          <SubRow
            label="Strategic Score"
            value={weights.StrategicImportanceSub.StrategicScore.toString()}
            onChange={(value) => handleSubWeightChange('StrategicScore', value)}
          />
          <SubRow
            label="Synergy"
            value={weights.StrategicImportanceSub.Synergy.toString()}
            onChange={(value) => handleSubWeightChange('Synergy', value)}
          />
          <SubRow
            label="Digital Transformation"
            value={weights.StrategicImportanceSub.DigitalTransformation.toString()}
            onChange={(value) => handleSubWeightChange('DigitalTransformation', value)}
          />
          <SubRow
            label="Long Term Value"
            value={weights.StrategicImportanceSub.LongTermValue.toString()}
            onChange={(value) => handleSubWeightChange('LongTermValue', value)}
          />
        </div>

        <div className="border-t-2 border-green-500 mt-8 mb-6" />

        {/* Reset to Default Button */}
        <button
          onClick={resetToDefault}
          disabled={!canEdit}
          className="w-full py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-medium
                     hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          Reset to Default
        </button>

        <button
          onClick={onRunAnalysis}
          disabled={!canRunAnalysis}
          className="w-full py-3 rounded-xl border-2 border-green-500 bg-green-100 text-gray-900 font-medium
                     hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Run Analysis
        </button>

        {!canRunAnalysis && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Data Analysts cannot run analysis
          </p>
        )}

        <div className="mt-8 pt-4 border-t text-xs text-gray-500">
          {breadcrumb}
        </div>
      </div>
    );
  }

  /* =========================
     TIER ANALYSIS
     ========================= */
  return (
    <div className="w-80 bg-white px-6 py-8 border-r">
      <div className="text-center font-semibold mb-4">
        Variable Weight Adjustment
      </div>

      <div className="border-t-2 border-green-500 mb-6" />

      {/* Variable Weight Section */}
      <div className="space-y-6 text-gray-900">
        <Row
          label="Revenue"
          value={weights.Asset.toString()}
          onChange={(value) => handleWeightChange('Revenue', value)}
          canEdit={canEdit}
        />
        <Row
          label="Equity"
          value={weights.Netprofit.toString()}
          onChange={(value) => handleWeightChange('Equity', value)}
          canEdit={canEdit}
        />
        <Row
          label="Complexity"
          value={(weights.StrategicImportanceSub.StrategicScore + weights.StrategicImportanceSub.Synergy).toString()}
          canEdit={false}
        />
      </div>

      <div className="mt-6 space-y-4 text-gray-600 text-sm">
        <SubRow
          label="Headcount"
          value={weights.StrategicImportanceSub.StrategicScore.toString()}
          onChange={(value) => handleSubWeightChange('StrategicScore', value)}
        />
        <SubRow
          label="Budget Responsibility"
          value={weights.StrategicImportanceSub.Synergy.toString()}
          onChange={(value) => handleSubWeightChange('Synergy', value)}
        />
      </div>

      <div className="mt-6 space-y-6 text-gray-900">
        <Row
          label="Experience"
          value={(weights.StrategicImportanceSub.DigitalTransformation + weights.StrategicImportanceSub.LongTermValue).toString()}
          canEdit={false}
        />
      </div>

      <div className="mt-6 space-y-4 text-gray-600 text-sm">
        <SubRow
          label="Managerial"
          value={weights.StrategicImportanceSub.DigitalTransformation.toString()}
          onChange={(value) => handleSubWeightChange('DigitalTransformation', value)}
        />
        <SubRow
          label="Industry"
          value={(weights.StrategicImportanceSub.LongTermValue / 2).toString()}
          onChange={(value) => {
            const currentInternational = weights.StrategicImportanceSub.LongTermValue / 2;
            handleSubWeightChange('LongTermValue', value + currentInternational);
          }}
        />
        <SubRow
          label="International"
          value={(weights.StrategicImportanceSub.LongTermValue / 2).toString()}
          onChange={(value) => {
            const currentIndustry = weights.StrategicImportanceSub.LongTermValue / 2;
            handleSubWeightChange('LongTermValue', currentIndustry + value);
          }}
        />
      </div>

      <div className="border-t-2 border-green-500 mt-8 mb-6" />

      {/* Reset to Default Button */}
      <button
        onClick={resetToDefault}
        disabled={!canEdit}
        className="w-full py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-medium
                   hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        Reset to Default
      </button>

      <button
        onClick={onRunAnalysis}
        disabled={!canRunAnalysis}
        className="w-full py-3 rounded-xl border-2 border-green-500 bg-green-100 text-gray-900 font-medium
                   hover:bg-green-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Run Analysis
      </button>

      {!canRunAnalysis && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Data Analysts cannot run analysis
        </p>
      )}

      <div className="mt-8 pt-4 border-t text-xs text-gray-500">
        {breadcrumb}
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Row({ label, value, onChange, canEdit, bold = false }: { label: string; value: string; onChange?: (value: number) => void; canEdit: boolean; bold?: boolean; }) {
  const numValue = parseFloat(value);
  
  return (
    <div className="flex justify-between items-center text-base">
      <span className={bold ? 'font-semibold' : ''}>{label}</span>
      {canEdit && onChange ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(Math.max(0, numValue - 0.1))}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50"
          >
            -
          </button>
          <input
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-20 px-2 py-1 text-center border border-gray-300 rounded bg-white"
          />
          <button
            onClick={() => onChange(numValue + 0.1)}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50"
          >
            +
          </button>
        </div>
      ) : (
        <input
          type="number"
          value={value}
          disabled
          className="w-20 px-2 py-1 text-center border border-gray-300 rounded bg-gray-100"
        />
      )}
    </div>
  );
}

function SubRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: number) => void;
}) {
  const numValue = parseFloat(value);
  
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, numValue - 0.1))}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50 text-sm"
        >
          -
        </button>
        <input
          type="number"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-20 px-2 py-1 text-center border border-gray-300 rounded bg-white"
        />
        <button
          onClick={() => onChange(numValue + 0.1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white hover:bg-gray-50 text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}