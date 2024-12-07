import React, {useState} from "react";
import { rollDice, RollResponse } from "../api/diceApi";
import RollHistory from "./RollHistory";

const DiceRoller: React.FC = () => {
    const [difficulty, setDifficulty] = useState(20)
    const [result, setResult] = useState<RollResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [history, setHistory] = useState<number[]>([]); 


    const handleRoll = async () => {
        try{
            const rollResult = await rollDice({difficulty})
            setResult(rollResult)
            setHistory(prevHistory => [...prevHistory, rollResult.result]);
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
            <h3>dice</h3>
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
            </div>
            <button onClick={handleRoll}>Roll Dice</button>

            {error && <p style={{color: 'red'}}>{error}</p>}
            {result && (
                <div>
                    <h2>result</h2>
                    <p>{result.message}</p>
                    <p>{result.result}</p>
                    <p>{result.succeeded.toString()}</p>
                </div>
            )}

            <RollHistory history ={history}/>
        </div>
    );
}

export default DiceRoller;