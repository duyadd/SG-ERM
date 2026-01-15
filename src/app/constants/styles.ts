// Color Palette
export const colors = {
  // Primary
  primary: 'orange-500',
  primaryHover: 'orange-600',
  
  // Background
  background: 'white',
  backgroundAlt: 'gray-50',
  
  // Text
  textPrimary: 'gray-900',
  textSecondary: 'gray-700',
  textTertiary: 'gray-600',
  textDisabled: 'gray-400',
  
  // Borders
  border: 'gray-200',
  borderInput: 'gray-300',
  
  // States
  hover: 'gray-50',
  disabled: 'gray-300',
};

// Spacing
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
};

// Typography
export const typography = {
  headingLg: 'text-2xl font-bold',
  headingMd: 'text-lg font-semibold',
  headingSm: 'text-sm font-semibold',
  bodyLg: 'text-base font-normal',
  bodyMd: 'text-sm font-normal',
  bodySm: 'text-xs font-normal',
};

// Common component styles
export const components = {
  // Buttons
  buttonPrimary: 'px-6 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed',
  buttonSecondary: 'px-4 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 hover:bg-gray-50',
  
  // Inputs
  input: 'w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer',
  inputLabel: 'block text-sm font-medium text-gray-700 mb-2',
  
  // Tables
  tableContainer: 'bg-white rounded border border-gray-200 overflow-hidden',
  tableHeaderRow: 'bg-orange-500 text-white',
  tableHeaderCell: 'px-6 py-4 text-left font-semibold',
  tableBodyRow: 'border-t border-gray-200 hover:bg-gray-50',
  tableBodyCell: 'px-6 py-4 text-gray-900',
  tableBodyCellSecondary: 'px-6 py-4 text-gray-600',
  
  // Navigation
  navButton: 'text-gray-600 hover:text-gray-900',
  navButtonActive: 'text-orange-500 border-b-2 border-orange-500 pb-1',
  
  // Menu items
  menuItem: 'w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700',
  menuItemActive: 'w-full px-4 py-2 text-left hover:bg-gray-50 text-orange-500 font-medium',
  
  // Cards & Containers
  card: 'bg-white rounded border border-gray-200',
  container: 'flex-1 p-8 bg-gray-50',
};

// Layout
export const layout = {
  pageContainer: 'flex-1 p-8 bg-gray-50',
  headerHeight: '60px',
  sidebarWidth: '250px',
};

// ===== UPPERCASE EXPORTS FOR COMPONENT COMPATIBILITY =====

// PAGE constants
export const PAGE = {
  container: 'flex-1 p-8 bg-gray-50',
  header: 'mb-6',
};

// TYPOGRAPHY constants
export const TYPOGRAPHY = {
  pageTitle: 'text-2xl font-bold',
  sectionTitle: 'text-lg font-semibold',
  subsectionTitle: 'text-sm font-semibold',
  label: 'text-sm font-medium',
  body: 'text-sm text-gray-700',
};

// SPACING constants
export const SPACING = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

// MARGIN_BOTTOM constants
export const MARGIN_BOTTOM = {
  xs: 'mb-1',
  sm: 'mb-2',
  md: 'mb-4',
  lg: 'mb-6',
  xl: 'mb-8',
};

// PADDING constants
export const PADDING = {
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

// INPUT constants
export const INPUT = {
  label: 'block text-sm font-medium text-gray-700 mb-2',
  base: 'w-full px-4 py-2 border border-gray-300 rounded bg-white text-gray-700',
  select: 'px-3 py-2 border border-gray-300 rounded bg-white text-gray-700',
};

// COLORS constants
export const COLORS = {
  primary: {
    500: 'orange-500',
    600: 'orange-600',
    border: 'border-orange-300',
  },
  primaryHover: 'orange-600',
  background: 'white',
  backgroundAlt: 'gray-50',
  textPrimary: 'gray-900',
  textSecondary: 'gray-700',
  textTertiary: 'gray-600',
  border: 'border-gray-300',
  borderInput: 'gray-300',
};

// CARD constants
export const CARD = {
  full: 'bg-white rounded border border-gray-200 p-6',
  compact: 'bg-white rounded border border-gray-200 p-4',
};

// BUTTON constants
export const BUTTON = {
  primary: 'px-6 py-2 bg-orange-500 text-white rounded font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed',
  secondary: 'px-4 py-2 border border-gray-300 rounded text-sm bg-white text-gray-700 hover:bg-gray-50',
};

// TABLE constants
export const TABLE = {
  container: 'bg-white rounded border border-gray-200 overflow-hidden',
  headerRow: 'bg-orange-500 text-white',
  headerCell: 'px-6 py-4 text-left font-semibold',
  bodyRow: 'border-t border-gray-200 hover:bg-gray-50',
  bodyCell: 'px-6 py-4 text-gray-900',
  bodyCellSecondary: 'px-6 py-4 text-gray-600',
};

// BADGE constants
export const BADGE = {
  default: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
  primary: 'border-transparent bg-orange-500 text-white',
  secondary: 'border-transparent bg-gray-100 text-gray-900',
  outline: 'text-gray-900 border-gray-200',
};
