import React from 'react'

interface NumRollsSelectorProps {
    numRolls: number
    setNumRolls: (value: number) => void
}


const NumRollsSelector: React.FC<NumRollsSelectorProps> = ({numRolls, setNumRolls}) => {
    return(
        <div>
          <label>
            Num rolls:
            <div style={{ display: "flex", flexDirection: "column" }}>
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
        </div>
    )
}

export default NumRollsSelector;