import React, { useState } from 'react';

import { Header, type UserRole, type PageType } from './components/Header';
import { PAGE_PATHS } from './constants/pagePaths';

import { Main } from './components/pages/main/Main';
import { ClusterAnalysis } from './components/pages/company/ClusterAnalysis';
import { TierAnalysis } from './components/pages/company/TierAnalysis';
import { AnnualBonusForecast } from './components/pages/company/AnnualBonusForecast';

import { TotalRewardAnalysis } from './components/pages/executive/TotalRewardAnalysis';
import { SuggestBasePay } from './components/pages/executive/SuggestBasePay';
import { SuggestVariablePay } from './components/pages/executive/SuggestVariablePay';
import { BenefitsAllowances } from './components/pages/executive/BenefitsAllowances';
import { ComparisonAnalysis } from './components/pages/executive/ComparisonAnalysis';

import { HRData } from './components/pages/data-management/HRData';
import { SubsidiaryData } from './components/pages/data-management/SubsidiaryData';
import { BusinessPlan } from './components/pages/data-management/BusinessPlan';
import { FinanceData } from './components/pages/data-management/FinanceData';
import { ExternalData } from './components/pages/data-management/ExternalData';

import { UserAccessManagement } from './components/pages/settings/UserAccessManagement';
import { FrameworkAdjustment } from './components/pages/settings/FrameworkAdjustment';
import { MasterData } from './components/pages/settings/MasterData';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('Super User');
  const [currentPage, setCurrentPage] = useState<PageType>(PAGE_PATHS.MAIN);

  // ✅ simple back support (one-step)
  const [previousPage, setPreviousPage] = useState<PageType | null>(null);

  // ✅ shared tier state
  const [selectedTier, setSelectedTier] = useState<string>('Tier 1');

  // ✅ centralized navigation
  const navigateTo = (page: PageType) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case PAGE_PATHS.MAIN:
        return <Main />;

      case PAGE_PATHS.CLUSTER_ANALYSIS:
        return (
          <ClusterAnalysis
            currentRole={currentRole}
            selectedTier={selectedTier}
            onSelectTier={(tier) => {
              setSelectedTier(tier);
              navigateTo(PAGE_PATHS.TIER_ANALYSIS);
            }}
          />
        );

      case PAGE_PATHS.TIER_ANALYSIS:
        return (
          <TierAnalysis
            currentRole={currentRole}
            selectedTier={selectedTier}
          />
        );

      case PAGE_PATHS.ANNUAL_BONUS_FORECAST:
        return <AnnualBonusForecast currentRole={currentRole} />;

      case PAGE_PATHS.TOTAL_REWARD_ANALYSIS:
          return <TotalRewardAnalysis currentRole={currentRole} onNavigate={navigateTo} />;

      case PAGE_PATHS.SUGGEST_BASE_PAY:
        return <SuggestBasePay currentRole={currentRole} />;

      case PAGE_PATHS.SUGGEST_VARIABLE_PAY:
        return <SuggestVariablePay currentRole={currentRole} />;

      case PAGE_PATHS.BENEFITS_ALLOWANCES:
        return <BenefitsAllowances currentRole={currentRole} />;

      case PAGE_PATHS.COMPARISON_ANALYSIS:
        return <ComparisonAnalysis currentRole={currentRole} />;

      case PAGE_PATHS.HR_DATA:
        return <HRData currentRole={currentRole} />;

      case PAGE_PATHS.SUBSIDIARY_DATA:
        return <SubsidiaryData currentRole={currentRole} />;

      case PAGE_PATHS.BUSINESS_PLAN:
        return <BusinessPlan currentRole={currentRole} />;

      case PAGE_PATHS.FINANCE_DATA:
        return <FinanceData currentRole={currentRole} />;

      case PAGE_PATHS.EXTERNAL_DATA:
        return <ExternalData currentRole={currentRole} />;

      case PAGE_PATHS.USER_ACCESS_MANAGEMENT:
        return <UserAccessManagement currentRole={currentRole} />;

      case PAGE_PATHS.FRAMEWORK_ADJUSTMENT:
        return <FrameworkAdjustment currentRole={currentRole} />;

      case PAGE_PATHS.MASTER_DATA:
        return <MasterData currentRole={currentRole} />;

      default:
        return <Main />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* HEADER */}
      <Header
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        currentPage={currentPage}
        onPageChange={navigateTo}
        onLogout={() => {
          // logout logic here
        }}
      />

      {/* BACK BUTTON */}
      {currentPage !== PAGE_PATHS.MAIN && previousPage && (
        <div className="px-6 py-3 border-b bg-gray-50">
          <button
            onClick={() => setCurrentPage(previousPage)}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
      )}

      {/* PAGE CONTENT */}
      {renderPage()}
    </div>
  );
}
