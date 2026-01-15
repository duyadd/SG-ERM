import React from 'react';
import { type UserRole } from '../../Header';
import { DataManagementTemplate } from './DataManagementTemplate';

interface FinanceDataProps {
  currentRole: UserRole;
}

export function FinanceData({ currentRole }: FinanceDataProps) {
  const financeDataRows = [
    { name: 'Finance Team A', role: 'Accounting Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Finance Team B', role: 'Treasury Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Finance Team C', role: 'Audit Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Finance Team D', role: 'Cost Analysis Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Finance Team E', role: 'Financial Planning Manager', lastUploadedDate: '', missingData: '' },
  ];

  return (
    <DataManagementTemplate
      title="Finance Data"
      pageTitle="Finance Data"
      dataRows={financeDataRows}
      currentRole={currentRole}
    />
  );
}
