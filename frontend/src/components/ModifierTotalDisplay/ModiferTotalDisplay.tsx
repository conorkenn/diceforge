import React from "react";
import { calculateModifierTotal } from "../../utils/diceUtils";
import "./ModiferTotalDisplay.css"

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
      Modifier Total
      <p>
        
        {displayMin === displayMax ? (
          <span className={displayMax > 0 ? 'positive' : displayMax < 0 ? 'negative' : 'zero'}>No Modifiers</span>
        ) : (
          <>
            <span className={displayMin > 0 ? 'positive' : displayMin < 0 ? 'negative' : 'zero'}>{displayMin}</span>
            {" - "}
            <span className={displayMax > 0 ? 'positive' : displayMax < 0 ? 'negative' : 'zero'}>{displayMax}</span>
          </>
        )}
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
