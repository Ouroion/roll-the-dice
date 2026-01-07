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
            .then(response => {
                if (!response.ok){
                    throw new Error('Network failed');
                }
                return response.text();
            })
            .then(data => {
                setBetSuccess(data);
            })
            .catch(error => {
                setError(error.message);
            })
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
                            <h3> You Rolled: {rollValue}</h3>
                        </div>
                    )}
                </div>
            </div>
            <div style={{
                padding: '20px',
                border: '1px solid',
                borderRadius: 10}}>

                <div><h1>Test your Luck!</h1></div>

                <form onSubmit={Bet}>
                    <input
                        type={'text'}
                        value={betInput}
                        onChange={(e) => setBetInput(e.target.value)}
                        placeholder='bet on a number from 1-6.'
                        style={{
                            margin: '0px 10px'
                        }}
                    />

                    <button onClick={Bet}>
                        BET
                    </button>
                </form>

                {betSuccess && (
                    <div>
                        <h3> You Bet: {betInput} | Bet Success: {betSuccess}</h3>
                    </div>
                )}
            </div>
        </>
    )

}

export default RollDice;

