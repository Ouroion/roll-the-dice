import React, {useState} from 'react';

const RollDice = () => {
    const [rollValue, setRollValue] = useState(null);
    const [error, setError] = useState(null);

    const Roll = () =>{
        const response = fetch('http://localhost:8080/roll/random-number', { method: 'GET'})
            .then(response => {
                if (!response.ok){
                    throw new Error('Network failed');
                }
                return response.text();
            })
            .then(data => {
                setRollValue(data);
            })
            .catch(error => {
                setError(error.message);
            })

    }

    if (error) {
        <div> Error: {error} </div>;
    }

    return (
        <>
            <div style={{
                padding: '20px',
                border: '1px solid',
                borderRadius: 10}}>

                <div><h1>Roll the Dice!</h1></div>

                <div>
                    <button onClick={Roll}>ROLL</button>

                    {rollValue && (
                        <div>
                            <h3> You Got: </h3>
                            <p><strong>{rollValue}</strong></p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}

export default RollDice;

