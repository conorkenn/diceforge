import React from 'react'
import './NumRollsSelector.css';

interface NumRollsSelectorProps {
    numRolls: number
    setNumRolls: (value: number) => void
}


const NumRollsSelector: React.FC<NumRollsSelectorProps> = ({numRolls, setNumRolls}) => {
    return(
        <div>
          <label>
            Num rolls:
            <div className='radio-group'>
              <label className={`radio-label ${numRolls === 1 ? 'active': ''}`}>
                <input
                  type="radio"
                  value={1}
                  checked={numRolls === 1}
                  onChange={() => setNumRolls(1)}
                />
                1
              </label>
              <label className={`radio-label ${numRolls === 10 ? 'active': ''}`}>
                <input
                  type="radio"
                  value={10}
                  checked={numRolls === 10}
                  onChange={() => setNumRolls(10)}
                />
                10
              </label>
              <label className={`radio-label ${numRolls === 100 ? 'active': ''}`}>
                <input
                  type="radio"
                  value={100}
                  checked={numRolls === 100}
                  onChange={() => setNumRolls(100)}
                />
                100
              </label>
              <label className={`radio-label ${numRolls === 1000 ? 'active': ''}`}>
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