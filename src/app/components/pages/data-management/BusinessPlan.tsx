import React from 'react';
import { type UserRole } from '../../Header';
import { DataManagementTemplate } from './DataManagementTemplate';

interface BusinessPlanProps {
  currentRole: UserRole;
}

export function BusinessPlan({ currentRole }: BusinessPlanProps) {
  const businessPlanRows = [
    { name: 'Department A', role: 'Strategic Planning', lastUploadedDate: '', missingData: '' },
    { name: 'Department B', role: 'Budget Planning', lastUploadedDate: '', missingData: '' },
    { name: 'Department C', role: 'Growth Planning', lastUploadedDate: '', missingData: '' },
    { name: 'Department D', role: 'Risk Management', lastUploadedDate: '', missingData: '' },
    { name: 'Department E', role: 'Project Planning', lastUploadedDate: '', missingData: '' },
  ];

  return (
    <div>
      <DataManagementTemplate
        title="Business Plan"
        pageTitle="Business Plan"
        dataRows={businessPlanRows}
        currentRole={currentRole}
      />

      {/* Breadcrumb */}
      <div className="mt-8 text-sm text-gray-400">
        Data Management → Business Plan
      </div>
    </div>
  );
}
