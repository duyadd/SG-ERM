export const PAGE_PATHS = {
  // Main
  MAIN: 'main' as const,

  // Company
  CLUSTER_ANALYSIS: 'cluster-analysis' as const,
  TIER_ANALYSIS: 'tier-analysis' as const,
  ANNUAL_BONUS_FORECAST: 'annual-bonus-forecast' as const,

  // Executive
  TOTAL_REWARD_ANALYSIS: 'total-reward-analysis' as const,
  SUGGEST_BASE_PAY: 'suggest-base-pay' as const,
  SUGGEST_VARIABLE_PAY: 'suggest-variable-pay' as const,
  BENEFITS_ALLOWANCES: 'benefits-allowances' as const,
  COMPARISON_ANALYSIS: 'comparison-analysis' as const,

  // Data Management
  HR_DATA: 'hr-data' as const,
  SUBSIDIARY_DATA: 'subsidiary-data' as const,
  BUSINESS_PLAN: 'business-plan' as const,
  FINANCE_DATA: 'finance-data' as const,
  EXTERNAL_DATA: 'external-data' as const,

  // Settings
  USER_ACCESS_MANAGEMENT: 'user-access-management' as const,
  FRAMEWORK_ADJUSTMENT: 'framework-adjustment' as const,
  MASTER_DATA: 'master-data' as const,
} as const;

export type PagePath = typeof PAGE_PATHS[keyof typeof PAGE_PATHS];

// All page paths as an array
export const ALL_PAGE_PATHS: PagePath[] = [
  PAGE_PATHS.MAIN,
  PAGE_PATHS.CLUSTER_ANALYSIS,
  PAGE_PATHS.TIER_ANALYSIS,
  PAGE_PATHS.ANNUAL_BONUS_FORECAST,
  PAGE_PATHS.TOTAL_REWARD_ANALYSIS,
  PAGE_PATHS.SUGGEST_BASE_PAY,
  PAGE_PATHS.SUGGEST_VARIABLE_PAY,
  PAGE_PATHS.BENEFITS_ALLOWANCES,
  PAGE_PATHS.COMPARISON_ANALYSIS,
  PAGE_PATHS.HR_DATA,
  PAGE_PATHS.SUBSIDIARY_DATA,
  PAGE_PATHS.BUSINESS_PLAN,
  PAGE_PATHS.FINANCE_DATA,
  PAGE_PATHS.EXTERNAL_DATA,
  PAGE_PATHS.USER_ACCESS_MANAGEMENT,
  PAGE_PATHS.FRAMEWORK_ADJUSTMENT,
  PAGE_PATHS.MASTER_DATA,
];

// Page groups for navigation
export const PAGE_GROUPS = {
  COMPANY: [
    PAGE_PATHS.CLUSTER_ANALYSIS,
    PAGE_PATHS.TIER_ANALYSIS,
    PAGE_PATHS.ANNUAL_BONUS_FORECAST,
  ],
  EXECUTIVE: [
    PAGE_PATHS.TOTAL_REWARD_ANALYSIS,
    PAGE_PATHS.SUGGEST_BASE_PAY,
    PAGE_PATHS.SUGGEST_VARIABLE_PAY,
    PAGE_PATHS.BENEFITS_ALLOWANCES,
    PAGE_PATHS.COMPARISON_ANALYSIS,
  ],
  DATA_MANAGEMENT: [
    PAGE_PATHS.HR_DATA,
    PAGE_PATHS.SUBSIDIARY_DATA,
    PAGE_PATHS.BUSINESS_PLAN,
    PAGE_PATHS.FINANCE_DATA,
    PAGE_PATHS.EXTERNAL_DATA,
  ],
  SETTINGS: [
    PAGE_PATHS.USER_ACCESS_MANAGEMENT,
    PAGE_PATHS.FRAMEWORK_ADJUSTMENT,
    PAGE_PATHS.MASTER_DATA,
  ],
} as const;
