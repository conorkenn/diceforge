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
            setHistory((prevHistory) => [...prevHistory, ...results]);
        }  catch (err){
            setError("failed to roll")
        }
    };

    const handleReset = () => {
        setHistory([])
    }

    const calculateChance = (difficulty: number) => {
        if (difficulty > 20) return 5;
        const chance = ((21 - difficulty) / 20) * 100;
        return chance.toFixed(2);
    }

    
    return(
       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
            <h1>{calculateChance(difficulty)}%</h1>
            <h2>Difficulty Class</h2>
                <label>
                    <input type="number"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    min="2"
                    style={{ width: '35px' }} // Resize the input
                    />
                </label>
                <label>
                Num rolls:
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label>
                        <input
                            type="radio"
                            value={1}
                            checked={numRolls === 1}
                            onChange={() => setNumRolls(1)}
                        />
                        1
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={10}
                            checked={numRolls === 10}
                            onChange={() => setNumRolls(10)}
                        />
                        10
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={100}
                            checked={numRolls === 100}
                            onChange={() => setNumRolls(100)}
                        />
                        100
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={1000}
                            checked={numRolls === 1000}
                            onChange={() => setNumRolls(1000)}
                        />
                        1000
                    </label>
                </div>
                </label>
                <button onClick={handleRoll}>Roll Dice</button>
                <button onClick={handleReset}>Reset</button>
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
            <RollHistoryComponent history ={history}/>
        </div>
            
        </div>

       
    );
}

export default DiceRoller;