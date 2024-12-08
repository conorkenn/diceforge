import React from "react";

interface RollTypeSelectorProps {
  rollType: string;
  setRollType: (value: string) => void;
}

const RollTypeSelector: React.FC<RollTypeSelectorProps> = ({
  rollType,
  setRollType,
}) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="rollType"
          value="advantage"
          checked={rollType === "advantage"}
          onChange={() => setRollType("advantage")}
        />
        Advantage
      </label>
      <label>
        <input
          type="radio"
          name="rollType"
          value="none"
          checked={rollType === "none"}
          onChange={() => setRollType("none")}
        />
        Neither
      </label>
      <label>
        <input
          type="radio"
          name="rollType"
          value="disadvantage"
          checked={rollType === "disadvantage"}
          onChange={() => setRollType("disadvantage")}
        />
        Disadvantage
      </label>
    </div>
  );
};

export default RollTypeSelector;
