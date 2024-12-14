import React from "react";
import { RollHistory } from "../types";

interface RollHistoryProps {
  history: RollHistory[];
}

const calculatePercentages = (history: RollHistory[]) => {
  const totalRolls = history.length;

  const successes = history.filter((roll) => roll.succeeded).length;
  const failures = totalRolls - successes;

  const successPercentage = (successes / totalRolls) * 100;
  const failurePercentage = (failures / totalRolls) * 100;

  return { successes, failures, successPercentage, failurePercentage };
};

const RollHistoryComponent: React.FC<RollHistoryProps> = ({ history }) => {
  const { successes, failures, successPercentage, failurePercentage } =
    calculatePercentages(history);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Rolls</h3>
      <p style={{ textAlign: "center" }}>{history.length}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h4>Succeeded</h4>
          <p>{successes}</p>
          {isNaN(successPercentage) ? null : (
            <p>{successPercentage.toFixed(2)}%</p>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>Failed</h4>
          <p>{failures}</p>
          {isNaN(failurePercentage) ? null : (
            <p>{failurePercentage.toFixed(2)}%</p>
          )}
        </div>
      </div>
      {history.length > 0 ? (
        <ul>
          {history.map((roll) => (
            <li>
              {roll.result} : {roll.succeeded.toString()}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default RollHistoryComponent;
