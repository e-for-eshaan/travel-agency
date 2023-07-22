import axios from 'axios'
import React, { useRef, useState } from 'react'

import "../index.scss"

const Calculator = () => {
    const [calculatedPrice, setCalculatedPrice] = useState(0)
    const [loading, setLoading] = useState(false)

    const distanceInput = useRef()
    const timeInput = useRef()
    const waitingTimeInput = useRef()

    const getPrice = async () => {
        setLoading(true)
        const requestData = {
            Dn: distanceInput?.current?.value ?? 0,
            Tn: timeInput?.current?.value ?? 0,
            waiting_time: waitingTimeInput?.current?.value ?? 0
        }
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/calculate-price/", requestData)
            console.log(res)
            setCalculatedPrice(res.data.Price)
        }
        catch (err) {
            console.error(err)
        }
        setLoading(false)
    }
    return (
        <div style={{ width: "90%", padding: "0 0 20px 0" }}>
            <table className='mytable'>
                <tr>
                    <td>
                        <h4>Enter Time</h4>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <input
                            ref={timeInput}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Enter Distance</h4>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <input ref={distanceInput} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>Enter Waiting Time</h4>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        <input ref={waitingTimeInput} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <h4>
                            Total Price
                        </h4>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                        {calculatedPrice && ("Rs." + (calculatedPrice.toFixed(2)))}
                    </td>
                </tr>
            </table>
            <br />
            {loading ? "Loading..." :
                <button onClick={getPrice}>Get Price</button>}

        </div>

    )
}

export default Calculator