import React, { useState } from 'react';
import { ConfigurationPanel } from '../../ConfigurationPanel';
import { type UserRole } from '../../Header';
import { PAGE, TYPOGRAPHY, SPACING, INPUT, MARGIN_BOTTOM, COLORS, CARD, BUTTON } from '../../../constants/styles';

interface FrameworkAdjustmentProps {
  currentRole: UserRole;
}

export function FrameworkAdjustment({ currentRole }: FrameworkAdjustmentProps) {
  const [selectedVariables, setSelectedVariables] = useState<string[]>(['Base Pay', 'Variable Pay']);
  const [newVariable, setNewVariable] = useState<string>('');

  const handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVariable(e.target.value);
  };

  const addVariable = () => {
    if (newVariable.trim()) {
      setSelectedVariables([...selectedVariables, newVariable]);
      setNewVariable('');
    }
  };

  return (
    <div className={PAGE.container}>
      <div className={`${PAGE.header} ${MARGIN_BOTTOM.lg}`}>
        <h1 className={TYPOGRAPHY.pageTitle}>Framework Adjustment</h1>
      </div>

      <div className={CARD.full}>
        <h2 className={`${TYPOGRAPHY.sectionTitle} ${MARGIN_BOTTOM.md}`}>Compensation Framework Variables</h2>

        <div className={`${MARGIN_BOTTOM.lg}`}>
          <h3 className={`${TYPOGRAPHY.subsectionTitle} ${MARGIN_BOTTOM.md}`}>Current Variables</h3>
          <ul className="list-disc pl-6 space-y-2">
            {selectedVariables.map((variable, index) => (
              <li key={index} className={TYPOGRAPHY.body}>{variable}</li>
            ))}
          </ul>
        </div>

        <div className={`border-t pt-6`}>
          <h3 className={`${TYPOGRAPHY.subsectionTitle} ${MARGIN_BOTTOM.md}`}>Add New Variable</h3>
          <div className={`flex ${SPACING.md} items-end`}>
            <div className="flex-1">
              <label className={INPUT.label}>Variable Name</label>
              <input
                type="text"
                value={newVariable}
                onChange={handleVariableChange}
                className={INPUT.base}
                placeholder="Enter variable name"
              />
            </div>
            <button
              onClick={addVariable}
              className={BUTTON.primary}
            >
              Add Variable
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mt-8 text-sm text-gray-400">
        Settings → Framework Adjustment
      </div>
    </div>
  );
}
