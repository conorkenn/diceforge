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
        +1
      </label>
      <label>
        <input
          type="checkbox"
          value="2"
          checked={modifiers.includes("2")}
          onChange={() => handleToggle("2")}
        />
        +2
      </label>
      <label>
        <input
          type="checkbox"
          value="3"
          checked={modifiers.includes("3")}
          onChange={() => handleToggle("3")}
        />
        +3
      </label>
      <label>
        <input
          type="checkbox"
          value="4"
          checked={modifiers.includes("4")}
          onChange={() => handleToggle("4")}
        />
        +4
      </label>
      <label>
        <input
          type="checkbox"
          value="5"
          checked={modifiers.includes("5")}
          onChange={() => handleToggle("5")}
        />
        +5
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
          value="-2"
          checked={modifiers.includes("-2")}
          onChange={() => handleToggle("-2")}
        />
        -2
      </label>
      <label>
        <input
          type="checkbox"
          value="-3"
          checked={modifiers.includes("-3")}
          onChange={() => handleToggle("-3")}
        />
        -3
      </label>
      <label>
        <input
          type="checkbox"
          value="-4"
          checked={modifiers.includes("-4")}
          onChange={() => handleToggle("-4")}
        />
        -4
      </label>
      <label>
        <input
          type="checkbox"
          value="-5"
          checked={modifiers.includes("-5")}
          onChange={() => handleToggle("-5")}
        />
        -5
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
          value="1d6"
          checked={modifiers.includes("1d6")}
          onChange={() => handleToggle("1d6")}
        />
        1d6
      </label>
      <label>
        <input
          type="checkbox"
          value="1d8"
          checked={modifiers.includes("1d8")}
          onChange={() => handleToggle("1d8")}
        />
        1d8
      </label>
      <label>
        <input
          type="checkbox"
          value="1d10"
          checked={modifiers.includes("1d10")}
          onChange={() => handleToggle("1d10")}
        />
        1d10
      </label>
      <label>
        <input
          type="checkbox"
          value="1d12"
          checked={modifiers.includes("1d12")}
          onChange={() => handleToggle("1d12")}
        />
        1d12
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
      <label>
        <input
          type="checkbox"
          value="-1d6"
          checked={modifiers.includes("-1d6")}
          onChange={() => handleToggle("-1d6")}
        />
        -1d6
      </label>
      <label>
        <input
          type="checkbox"
          value="-1d8"
          checked={modifiers.includes("-1d8")}
          onChange={() => handleToggle("-1d8")}
        />
        -1d8
      </label>
      <label>
        <input
          type="checkbox"
          value="-1d10"
          checked={modifiers.includes("-1d10")}
          onChange={() => handleToggle("-1d10")}
        />
        -1d10
      </label>
      <label>
        <input
          type="checkbox"
          value="-1d12"
          checked={modifiers.includes("-1d12")}
          onChange={() => handleToggle("-1d12")}
        />
        -1d12
      </label>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ModifierModal;
