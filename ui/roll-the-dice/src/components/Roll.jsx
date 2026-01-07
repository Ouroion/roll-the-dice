import React, {useState} from 'react';

const RollDice = () => {
    const [rollValue, setRollValue] = useState(null);
    const [error, setError] = useState(null);
    const [betInput, setBetInput] = useState(null);
    const [betSuccess, setBetSuccess] = useState(null);
    const [rollBetValue, setRollBetValue] = useState(null);

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

    const Bet = async (e) => {
        e.preventDefault();
        const response = fetch(`http://localhost:8080/roll/bet?value=${betInput}`, { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data.success);
                console.log(data.rolled);

                setBetSuccess(data.success);
                setRollBetValue(data.rolled);
            })
    }

    return (
        <>
            <div style={{
                width: '300px',
                padding: '20px',
                border: '1px solid',
                borderRadius: 10}}>

                <div>
                    <h1>Roll the Dice!</h1>
                    <p style={{textAlign: 'left'}}>Roll a six-sided die and get a number between 1 and 6.</p>
                </div>

                <div>
                    <button onClick={Roll}>ROLL</button>

                    {rollValue && (
                        <div>
                            <h3> You Rolled: {rollValue}</h3>
                        </div>
                    )}
                </div>
            </div>
            <div style={{
                width: '300px',
                padding: '20px',
                border: '1px solid',
                borderRadius: 10}}>

                <div>
                    <h1>Test your Luck!</h1>
                    <p style={{textAlign: 'left'}}>Bet on a value between 1 and 6 and see if you roll it.</p>
                </div>

                <form onSubmit={Bet}>
                    <input
                        type={'text'}
                        value={betInput}
                        onChange={(e) => setBetInput(e.target.value)}
                        placeholder='1-6'
                        style={{
                            margin: '0px 10px',
                            width: '50px',
                            textAlign: 'center'
                        }}
                    />

                    <button onClick={Bet}>
                        BET
                    </button>
                </form>

                {(betSuccess !== null && rollBetValue !== null) && (
                    <div>
                        <h3>You Bet: {betInput} | Rolled: {rollBetValue}</h3>
                        <p>{betSuccess ? "You Won!" : "You Lost!"}</p>
                    </div>
                )}
            </div>
        </>
    )

}

export default RollDice;

