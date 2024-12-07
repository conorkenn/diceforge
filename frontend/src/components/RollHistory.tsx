import React from "react"

interface RollHistoryProps {
    history: number[];
}

const RollHistory: React.FC<RollHistoryProps> = ({history}) =>{
    return (
        <div>
            <div>history</div>
            {history.length > 0 ? (
                <ul>
                    {history.map((roll) => (
                        <li>{roll}</li>
                    ))}
                </ul>
            ) : (
             <p>no rolls</p>   
            )};
        </div>
    );
};

export default RollHistory