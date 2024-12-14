import React, { useState } from "react";
import { rollDice } from "../api/diceApi";
import RollHistoryComponent from "./RollHistoryComponent";
import { RollHistory } from "../types";
import NumRollsSelector from "./NumRollsSelector/NumRollsSelector";
import RollTypeSelector from "./RollTypeSelector/RollTypeSelector";
import DifficultySelector from "./DifficultySelector";
import ModifierModal from "./ModiferModal/ModifierModal";
import { calculateChance } from "../utils/diceUtils";
import ModifierTotalDisplay from "./ModifierTotalDisplay/ModiferTotalDisplay";

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

  const clearModifers = () =>{
    setModifiers([])
  }

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
    <div style={{ display: "flex", justifyContent: "center", width: "100%"  }}>
      <div style={{ textAlign: "center" }}>
        <h1>{calculateChance(difficulty, rollType, modifiers)}%</h1>
        <DifficultySelector
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
        </div>
        <button onClick={handleRoll}>Roll Dice</button>
        <RollTypeSelector rollType={rollType} setRollType={setRollType} />
        <NumRollsSelector numRolls={numRolls} setNumRolls={setNumRolls} />
        <button onClick={openModal}>Add Modifiers</button>
        <button onClick={clearModifers}>Clear Modifiers</button>
        {isModalOpen && (
          <ModifierModal
            modifiers={modifiers}
            setModifiers={setModifiers}
            closeModal={closeModal}
          />
        )}
        <ModifierTotalDisplay modifiers={modifiers} />
      </div>
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <RollHistoryComponent history={history} />
        <button onClick={handleReset}>Reset Rolls</button>
      </div>
    </div>
  );
};

export default DiceRoller;
