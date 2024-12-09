import React from "react";
import "./RollTypeSelector.css";

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
      <div className="advantage-radio-group">
        <label
          className={`advantage-label ${
            rollType === "advantage" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="rollType"
            value="advantage"
            checked={rollType === "advantage"}
            onChange={() => setRollType("advantage")}
          />
          <span className="triangle-up"></span>
        </label>
        <label
          className={`no-advantage-label ${
            rollType === "none" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="rollType"
            value="none"
            checked={rollType === "none"}
            onChange={() => setRollType("none")}
          />
          <span className="square"></span>
        </label>
        <label
          className={`disadvantage-label ${
            rollType === "disadvantage" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="rollType"
            value="disadvantage"
            checked={rollType === "disadvantage"}
            onChange={() => setRollType("disadvantage")}
          />
          <span className="triangle-down"></span>
        </label>
      </div>
      {rollType === "none" ? "no advantage" : rollType }
    </div>
  );
};

export default RollTypeSelector;
