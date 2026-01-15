import React from 'react';
import { type UserRole } from '../../Header';

interface BenefitsAllowancesProps {
  currentRole: UserRole;
}

export function BenefitsAllowances({ currentRole }: BenefitsAllowancesProps) {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <h1 className="mb-4">Benefits & Allowances</h1>
      <p className="text-gray-600">Benefits and allowances management</p>
    </div>
  );
}
