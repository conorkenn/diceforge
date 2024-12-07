import React from "react"
import { RollHistory } from "../types";

interface RollHistoryProps {
    history: RollHistory[];
}

const calculatePercentages = (history: RollHistory[]) => {
    const totalRolls = history.length

    const successes = history.filter(roll => roll.succeeded).length
    const failures = totalRolls - successes

    const successPercentage = (successes / totalRolls) * 100
    const failurePercentage = (failures / totalRolls) * 100

    return {successPercentage, failurePercentage}
}
const RollHistoryComponent: React.FC<RollHistoryProps> = ({history}) =>{

    const { successPercentage, failurePercentage } = calculatePercentages(history);

    return (
        <div>
            <h4>Success Rate: {successPercentage.toFixed(2)}%</h4>
            <h4>Failure Rate: {failurePercentage.toFixed(2)}%</h4>
            <div>history</div>
            {history.length > 0 ? (
                <ul>
                    {history.map((roll) => (
                        <li>{roll.result} : {roll.succeeded.toString()}</li>
                    ))}
                </ul>
            ) : (
             <p></p>   
            )}
        </div>
    );
};

export default RollHistoryComponent