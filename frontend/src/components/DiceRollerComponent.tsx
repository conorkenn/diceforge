import React, {useState} from "react";
import { rollDice } from "../api/diceApi";
import RollHistoryComponent from "./RollHistoryComponent";
import { RollHistory } from "../types";

const DiceRoller: React.FC = () => {
    const [difficulty, setDifficulty] = useState(20)
    const [error, setError] = useState<string | null>(null)
    const [history, setHistory] = useState<RollHistory[]>([]); 
    const [numRolls, setNumRolls] = useState<number>(1)


    const handleRoll = async () => {
        try{
            const rollPromises = Array.from({length: numRolls}, async () => {
                const rollResult = await rollDice({difficulty})
                return rollResult
            })
            const results = await Promise.all(rollPromises)
            setHistory(results)
        }  catch (err){
            setError("failed to roll")
        }
    };

    const calculateChance = (difficulty: number) => {
        if (difficulty > 20) return 5;
        const chance = ((21 - difficulty) / 20) * 100;
        return chance.toFixed(2);
    }

    
    return(
        <div>
            <div>
                <p>{calculateChance(difficulty)}%</p>
                <label>
                    Difficulty:
                    <input type="number"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    min="2"
                    />
                </label>
                <label>
                    Num rolls:
                    <select value={numRolls} onChange={(e) => setNumRolls(Number(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={10}>10</option>
                        <option value={100}>100</option>
                        <option value={1000}>1000</option>
                    </select>
                </label>
                <button onClick={handleRoll}>Roll Dice</button>
            </div>
            <RollHistoryComponent history ={history}/>
        </div>
    );
}

export default DiceRoller;