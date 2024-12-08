import React, { useState } from "react";
import { rollDice } from "../api/diceApi";
import RollHistoryComponent from "./RollHistoryComponent";
import { RollHistory } from "../types";
import NumRollsSelector from "./NumRollsSelector/NumRollsSelector";
import RollTypeSelector from "./RollTypeSelector/RollTypeSelector";
import DifficultySelector from "./DifficultySelector";

const DiceRoller: React.FC = () => {
  const [difficulty, setDifficulty] = useState(12);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<RollHistory[]>([]);
  const [numRolls, setNumRolls] = useState<number>(1);
  const [rollType, setRollType] = useState<string>("none");

  const handleRoll = async () => {
    try {
      const advantage = rollType === "advantage";
      const disadvantage = rollType === "disadvantage";
      const rollPromises = Array.from({ length: numRolls }, async () => {
        const rollResult = await rollDice({
          difficulty,
          advantage,
          disadvantage,
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

  const calculateChance = (difficulty: number, rollType: string) => {
    if (difficulty > 20) difficulty = 20;

    const baseChance = (21 - difficulty) / 20;

    if (rollType === "advantage") {
      const advantageChance = 1 - Math.pow((difficulty - 1) / 20, 2);
      return (advantageChance * 100).toFixed(2);
    } else if (rollType === "disadvantage") {
      const disadvantageChance = Math.pow((21 - difficulty) / 20, 2);
      return (disadvantageChance * 100).toFixed(2);
    }

    return (baseChance * 100).toFixed(2);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h1>{calculateChance(difficulty, rollType)}%</h1>
        <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty}/>
        <NumRollsSelector numRolls={numRolls} setNumRolls={setNumRolls} />
        <RollTypeSelector rollType={rollType} setRollType={setRollType} />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRoll}>Roll Dice</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <RollHistoryComponent history={history} />
      </div>
    </div>
  );
};

export default DiceRoller;
