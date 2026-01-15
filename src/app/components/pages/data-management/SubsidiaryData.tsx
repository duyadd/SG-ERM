import React from 'react';
import { type UserRole } from '../../Header';
import { DataManagementTemplate } from './DataManagementTemplate';

interface SubsidiaryDataProps {
  currentRole: UserRole;
}

export function SubsidiaryData({ currentRole }: SubsidiaryDataProps) {
  const subsidiaryDataRows = [
    { name: 'Subsidiary A', role: 'Finance Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Subsidiary B', role: 'Operations Lead', lastUploadedDate: '', missingData: '' },
    { name: 'Subsidiary C', role: 'HR Manager', lastUploadedDate: '', missingData: '' },
    { name: 'Subsidiary D', role: 'Regional Head', lastUploadedDate: '', missingData: '' },
    { name: 'Subsidiary E', role: 'Compliance Officer', lastUploadedDate: '', missingData: '' },
  ];

  return (
    <DataManagementTemplate
      title="Subsidiary Data"
      pageTitle="Subsidiary Data"
      dataRows={subsidiaryDataRows}
      currentRole={currentRole}
    />
  );
}
