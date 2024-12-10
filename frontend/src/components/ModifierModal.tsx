import React, { useState } from "react";

interface ModiferModalProps {
  modifiers: string[];
  setModifiers: (value: string[]) => void;
  closeModal: () => void;
}

const ModifierModal: React.FC<ModiferModalProps> = ({
  modifiers,
  setModifiers,
  closeModal,
}) => {

  const handleToggle = (modifier: string) => {
    const isAlreadySelected = modifiers.includes(modifier);

    if (isAlreadySelected) {
      setModifiers(modifiers.filter((mod) => mod !== modifier)); 
    } else {
      setModifiers([...modifiers, modifier]); 
    }
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="1"
          checked={modifiers.includes("1")}
          onChange={() => handleToggle("1")}
        />
        1
      </label>
      <label>
        <input
          type="checkbox"
          value="-1"
          checked={modifiers.includes("-1")}
          onChange={() => handleToggle("-1")}
        />
        -1
      </label>
      <label>
        <input
          type="checkbox"
          value="1d4"
          checked={modifiers.includes("1d4")}
          onChange={() => handleToggle("1d4")}
        />
        1d4
      </label>
      <label>
        <input
          type="checkbox"
          value="1d4"
          checked={modifiers.includes("-1d4")}
          onChange={() => handleToggle("-1d4")}
        />
        -1d4
      </label>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ModifierModal;
