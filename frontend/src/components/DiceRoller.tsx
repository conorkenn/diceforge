import React, {useState} from "react";
import { rollDice, RollResponse } from "../api/diceApi";

const DiceRoller: React.FC = () => {
    const [sides, setSides] = useState(6)
    const [result, setResult] = useState<RollResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleRoll = async () => {
        try{
            const rollResult = await rollDice({sides})
            setResult(rollResult)
        }  catch (err){
            setError("failed to roll")
        }
    };


    return(
        <div>
            <h3>dice</h3>
            <div>
                <label>
                    num sides:
                    <input type="number"
                    value={sides}
                    onChange={(e) => setSides(Number(e.target.value))}
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
                </div>
            )}
        </div>
    );
}

export default DiceRoller;