import React, { useState } from "react";
import { rollDice } from "../api/diceApi";
import RollHistoryComponent from "./RollHistoryComponent";
import { RollHistory } from "../types";
import NumRollsSelector from "./NumRollsSelector/NumRollsSelector";
import RollTypeSelector from "./RollTypeSelector/RollTypeSelector";
import DifficultySelector from "./DifficultySelector";
import ModifierModal from "./ModifierModal";

const DiceRoller: React.FC = () => {
  const [difficulty, setDifficulty] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<RollHistory[]>([]);
  const [numRolls, setNumRolls] = useState<number>(1);
  const [rollType, setRollType] = useState<string>("none");
  const [modifiers, setModifiers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRoll = async () => {
    try {
      const advantage = rollType === "advantage";
      const disadvantage = rollType === "disadvantage";
      const rollPromises = Array.from({ length: numRolls }, async () => {
        const rollResult = await rollDice({
          difficulty,
          advantage,
          disadvantage,
          modifiers,
        });
        return rollResult;
      });
      const results = await Promise.all(rollPromises);
      setHistory((prevHistory) => [...prevHistory, ...results]);
    } catch (err) {
      setError("failed to roll");
    }
  };

  const handleReset = () => {
    setHistory([]);
  };

  const calculateChance = (
    difficulty: number,
    rollType: string,
    modifiers: string[]
  ) => {
    const { minTotal, maxTotal } = calculateModifierTotal(modifiers);

    if (difficulty > 20) difficulty = 20;

    const minDifficulty = Math.max(1, difficulty - maxTotal);
    const maxDifficulty = Math.max(1, difficulty - minTotal);

    const baseChanceMin = (21 - minDifficulty) / 20;
    const baseChanceMax = (21 - maxDifficulty) / 20;

    let resultChanceMin, resultChanceMax;

    if (rollType === "advantage") {
      const advantageChanceMin = 1 - Math.pow((minDifficulty - 1) / 20, 2);
      const advantageChanceMax = 1 - Math.pow((maxDifficulty - 1) / 20, 2);
      resultChanceMin = advantageChanceMin;
      resultChanceMax = advantageChanceMax;
    } else if (rollType === "disadvantage") {
      const disadvantageChanceMin = Math.pow((21 - minDifficulty) / 20, 2);
      const disadvantageChanceMax = Math.pow((21 - maxDifficulty) / 20, 2);
      resultChanceMin = disadvantageChanceMin;
      resultChanceMax = disadvantageChanceMax;
    } else {
      resultChanceMin = baseChanceMin;
      resultChanceMax = baseChanceMax;
    }

    return ((resultChanceMin + resultChanceMax) / 2) * 100;
  };

  const calculateModifierTotal = (modifiers: string[]) => {
    let staticModifier = 0;
    let minRollModifier = 0;
    let maxRollModifier = 0;
    modifiers.forEach((mod) => {
      if (mod.includes("d")) {
        const parts = mod.split("d");
        const diceCount = Math.abs(Number(parts[0]));
        const diceSides = Number(parts[1]);
        const isNegative = mod.startsWith("-");

        const diceMin = isNegative ? -1 : 1;
        const diceMax = isNegative
          ? -diceCount * diceSides
          : diceCount * diceSides;

        minRollModifier += diceMin;
        maxRollModifier += diceMax;
      } else {
        staticModifier += Number(mod);
      }
    });

    const minTotal = staticModifier + minRollModifier;
    const maxTotal = staticModifier + maxRollModifier;

    return { minTotal, maxTotal };
  };

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

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h1>{calculateChance(difficulty, rollType, modifiers)}%</h1>
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <NumRollsSelector numRolls={numRolls} setNumRolls={setNumRolls} />
        <RollTypeSelector rollType={rollType} setRollType={setRollType} />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRoll}>Roll Dice</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <button onClick={openModal}>Modifiers</button>
        {isModalOpen && (
          <ModifierModal
            modifiers={modifiers}
            setModifiers={setModifiers}
            closeModal={closeModal}
          />
        )}
        {(() => {
          const { minTotal, maxTotal } = calculateModifierTotal(modifiers);

          return displayModifierTotal(minTotal, maxTotal);
        })()}
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <RollHistoryComponent history={history} />
      </div>
    </div>
  );
};

export default DiceRoller;
