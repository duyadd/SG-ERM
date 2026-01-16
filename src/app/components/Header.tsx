import { Settings, User, ChevronDown } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { PAGE_PATHS, PAGE_GROUPS } from '../constants/pagePaths';

export type UserRole = 'Super User' | 'User Manager' | 'Data Analyst';

export type PageType = typeof PAGE_PATHS[keyof typeof PAGE_PATHS];

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentPage?: PageType;
  onPageChange?: (page: PageType) => void;
  onLogout: () => void;
}

export function Header({
  currentRole,
  onRoleChange,
  currentPage = PAGE_PATHS.MAIN,
  onPageChange,
  onLogout,
}: HeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    setOpenSubMenu(null);
  };

  const handleNavigate = (page: PageType) => {
    onPageChange?.(page);
    setOpenDropdown(null);
    setOpenSubMenu(null);
  };

  // Helper to check if a page is active
  const isPageActive = (page: PageType | PageType[] | readonly PageType[]) => {
    const pages = Array.isArray(page) ? page : [page];
    return pages.includes(currentPage);
  };

  // Helper to get active styles
  const getNavButtonClass = (isActive: boolean) => {
    return isActive
      ? 'text-orange-500 border-b-2 border-orange-500 pb-1'
      : 'text-gray-600 hover:text-gray-900';
  };

  const getMenuItemClass = (isActive: boolean) => {
    return `w-full px-4 py-2 text-left hover:bg-gray-50 ${isActive ? 'text-orange-500 font-medium' : 'text-gray-700'}`;
  };

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-6">
          {/* Main */}
          <button
            className={`${getNavButtonClass(currentPage === PAGE_PATHS.MAIN)}`}
            onClick={() => handleNavigate(PAGE_PATHS.MAIN)}
          >
            Main
          </button>

          {/* Company Dropdown */}
          <div className="relative">
            <button
              className={`${getNavButtonClass(isPageActive(PAGE_GROUPS.COMPANY))} flex items-center gap-1`}
              onClick={() => {
                toggleDropdown('company');
                if (!isPageActive(PAGE_GROUPS.COMPANY)) {
                  handleNavigate(PAGE_PATHS.CLUSTER_ANALYSIS);
                }
              }}
            >
              Company
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'company' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[200px] z-50">
                <div
                  className="relative"
                  onMouseEnter={() => setOpenSubMenu('cluster')}
                  onMouseLeave={() => setOpenSubMenu(null)}
                >
                  <button
                    className={`${getMenuItemClass(isPageActive([PAGE_PATHS.CLUSTER_ANALYSIS, PAGE_PATHS.TIER_ANALYSIS]))} flex items-center justify-between`}
                    onClick={() => handleNavigate(PAGE_PATHS.CLUSTER_ANALYSIS)}
                  >
                    Cluster Analysis
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === 'cluster' ? '-rotate-90' : ''}`} />
                  </button>

                  {openSubMenu === 'cluster' && (
                    <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded shadow-lg min-w-[180px]">
                      <button
                        className={getMenuItemClass(currentPage === PAGE_PATHS.TIER_ANALYSIS)}
                        onClick={() => handleNavigate(PAGE_PATHS.TIER_ANALYSIS)}
                      >
                        Tier Analysis
                      </button>
                    </div>
                  )}
                </div>

                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.ANNUAL_BONUS_FORECAST)}
                  onClick={() => handleNavigate(PAGE_PATHS.ANNUAL_BONUS_FORECAST)}
                >
                  Annual Bonus Forecast
                </button>
              </div>
            )}
          </div>

          {/* Executive Dropdown */}
          <div className="relative">
            <button
              className={`${getNavButtonClass(isPageActive(PAGE_GROUPS.EXECUTIVE))} flex items-center gap-1`}
              onClick={() => {
                toggleDropdown('executive');
                if (!isPageActive(PAGE_GROUPS.EXECUTIVE)) {
                  handleNavigate(PAGE_PATHS.TOTAL_REWARD_ANALYSIS);
                }
              }}
            >
              Executive
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'executive' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'executive' && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[200px] z-50">
                <div
                  className="relative"
                  onMouseEnter={() => setOpenSubMenu('total-reward')}
                  onMouseLeave={() => setOpenSubMenu(null)}
                >
                  <button
                    className={`${getMenuItemClass(isPageActive([PAGE_PATHS.TOTAL_REWARD_ANALYSIS, PAGE_PATHS.SUGGEST_BASE_PAY, PAGE_PATHS.SUGGEST_VARIABLE_PAY, PAGE_PATHS.BENEFITS_ALLOWANCES]))} flex items-center justify-between`}
                    onClick={() => handleNavigate(PAGE_PATHS.TOTAL_REWARD_ANALYSIS)}
                  >
                    Total Reward Analysis
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === 'total-reward' ? '-rotate-90' : ''}`} />
                  </button>

                  {openSubMenu === 'total-reward' && (
                    <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded shadow-lg min-w-[180px]">
                      <button
                        className={getMenuItemClass(currentPage === PAGE_PATHS.SUGGEST_BASE_PAY)}
                        onClick={() => handleNavigate(PAGE_PATHS.SUGGEST_BASE_PAY)}
                      >
                        Suggest Base Pay
                      </button>
                      <button
                        className={getMenuItemClass(currentPage === PAGE_PATHS.SUGGEST_VARIABLE_PAY)}
                        onClick={() => handleNavigate(PAGE_PATHS.SUGGEST_VARIABLE_PAY)}
                      >
                        Suggest Variable Pay
                      </button>
                      <button
                        className={getMenuItemClass(currentPage === PAGE_PATHS.BENEFITS_ALLOWANCES)}
                        onClick={() => handleNavigate(PAGE_PATHS.BENEFITS_ALLOWANCES)}
                      >
                        Benefits & Allowances
                      </button>
                    </div>
                  )}
                </div>

                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.COMPARISON_ANALYSIS)}
                  onClick={() => handleNavigate(PAGE_PATHS.COMPARISON_ANALYSIS)}
                >
                  Comparison Analysis
                </button>
              </div>
            )}
          </div>

          {/* Data Management Dropdown */}
          <div className="relative">
            <button
              className={`${getNavButtonClass(isPageActive(PAGE_GROUPS.DATA_MANAGEMENT))} flex items-center gap-1`}
              onClick={() => {
                toggleDropdown('data-management');
                if (!isPageActive(PAGE_GROUPS.DATA_MANAGEMENT)) {
                  handleNavigate(PAGE_PATHS.HR_DATA);
                }
              }}
            >
              Data Management
              <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'data-management' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'data-management' && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[200px] z-50">
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.HR_DATA)}
                  onClick={() => handleNavigate(PAGE_PATHS.HR_DATA)}
                >
                  HR Data
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.SUBSIDIARY_DATA)}
                  onClick={() => handleNavigate(PAGE_PATHS.SUBSIDIARY_DATA)}
                >
                  Subsidiary Data
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.BUSINESS_PLAN)}
                  onClick={() => handleNavigate(PAGE_PATHS.BUSINESS_PLAN)}
                >
                  Business Plan
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.FINANCE_DATA)}
                  onClick={() => handleNavigate(PAGE_PATHS.FINANCE_DATA)}
                >
                  Finance Data
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.EXTERNAL_DATA)}
                  onClick={() => handleNavigate(PAGE_PATHS.EXTERNAL_DATA)}
                >
                  External Data
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              className={`${getNavButtonClass(currentPage === PAGE_PATHS.USER_ACCESS_MANAGEMENT)} flex items-center gap-2`}
              onClick={() => toggleDropdown('settings')}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>

            {openDropdown === 'settings' && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg min-w-[200px] z-50">
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.MASTER_DATA)}
                  onClick={() => handleNavigate(PAGE_PATHS.MASTER_DATA)}
                >
                  Master Data
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.USER_ACCESS_MANAGEMENT)}
                  onClick={() => handleNavigate(PAGE_PATHS.USER_ACCESS_MANAGEMENT)}
                >
                  User Access Management
                </button>
                <button
                  className={getMenuItemClass(currentPage === PAGE_PATHS.FRAMEWORK_ADJUSTMENT)}
                  onClick={() => handleNavigate(PAGE_PATHS.FRAMEWORK_ADJUSTMENT)}
                >
                  Framework Adjustment
                </button>
              </div>
            )}
          </div>

          {/* User info */}
          <div className="relative">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm">Bilguun Sarantsetseg</div>
                <div className="text-xs text-gray-500">Super User</div>
              </div>
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="ml-4 px-4 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
