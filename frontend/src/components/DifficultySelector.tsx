import React from "react";

interface DifficultySelectorProps {
  difficulty: number;
  setDifficulty: (value: number) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty,
}) => {
  return (
    <div>
      <h2>Difficulty Class</h2>
      <label>
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          min="2"
          style={{ width: "35px" }}
        />
      </label>
    </div>
  );
};

export default DifficultySelector;
