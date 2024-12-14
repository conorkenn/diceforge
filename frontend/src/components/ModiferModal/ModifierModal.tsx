import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import "./ModifierModal.css";

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
  const modifierList = [
    { value: "1", label: "+1" },
    { value: "2", label: "+2" },
    { value: "3", label: "+3" },
    { value: "4", label: "+4" },
    { value: "5", label: "+5" },
    { value: "-1", label: "-1" },
    { value: "-2", label: "-2" },
    { value: "-3", label: "-3" },
    { value: "-4", label: "-4" },
    { value: "-5", label: "-5" },
    { value: "1d4", label: "1d4" },
    { value: "1d6", label: "1d6" },
    { value: "1d8", label: "1d8" },
    { value: "1d10", label: "1d10" },
    { value: "1d12", label: "1d12" },
    { value: "-1d4", label: "-1d4" },
    { value: "-1d6", label: "-1d6" },
    { value: "-1d8", label: "-1d8" },
    { value: "-1d10", label: "-1d10" },
    { value: "-1d12", label: "-1d12" },
    { value: "1d20", label: "1d20" },
    { value: "-1d20", label: "-1d20" },
  ];

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


  const handleToggle = (modifier: string) => {
    const isAlreadySelected = modifiers.includes(modifier);

    if (isAlreadySelected) {
      setModifiers(modifiers.filter((mod) => mod !== modifier));
    } else {
      setModifiers([...modifiers, modifier]);
    }
  };

  return (
    <Modal
      isOpen={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="modifier-selection">
        {modifierList.map((modifier) => (
          <button
            key={modifier.value}
            className={`modifier-button ${
              modifiers.includes(modifier.value) ? "selected" : ""
            } ${modifier.value.includes("-") ? "negative" : "positive"}`}
            onClick={() => handleToggle(modifier.value)}
          >
            {modifier.label}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ModifierModal;
