import React from "react";
import { calculateModifierTotal } from "../utils/diceUtils";

interface ModifierTotalDisplayProps {
  modifiers: string[];
}

const displayModifierTotal = (
  minTotal: number,
  maxTotal: number
): JSX.Element => {
  const displayMin = Math.min(minTotal, maxTotal);
  const displayMax = Math.max(minTotal, maxTotal);

  return (
    <div>
      <p>
        Modifier Range: {displayMin} - {displayMax}
      </p>
    </div>
  );
};

const ModifierTotalDisplay: React.FC<ModifierTotalDisplayProps> = ({
  modifiers,
}) => {
  const { minTotal, maxTotal } = calculateModifierTotal(modifiers);

  return displayModifierTotal(minTotal, maxTotal);
};

export default ModifierTotalDisplay;
