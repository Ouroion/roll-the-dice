import React, {useState} from 'react';

const RollDice = () => {
    const [rollValue, setRollValue] = useState(null);

    const Roll = () =>{
            fetch('http://localhost:8080/roll/random-number', { method: 'GET'})
                .then(data => data.json())
                .then(json => alert (JSON.stringify(json)))
    }

    return (
        <>
            <div>
                <h1>Roll the Dice!</h1>
            </div>

            <div>
                <form onSubmit={Roll}>
                    <button type="submit">ROLL</button>
                </form>

                {rollValue && (
                    <div>
                        <h3> You Got: </h3>
                        <p><strong>{rollValue}</strong></p>
                    </div>
                )}
            </div>
        </>
    )

}

export default RollDice;

