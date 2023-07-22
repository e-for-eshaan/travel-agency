import React, { useState } from 'react'
import DayBasePricing from './LineChart'
import "../App.scss"
import axios from 'axios'

const Card = ({ data, getAllConfigs }) => {
    console.log(data.id)

    let set1 = []
    let set2 = []

    for (let i of data.DBP) {
        set1.push(i.preBreakPointPrice)
        set2.push(i.postBreakPointPrice)
    }

    const [expandDatails, setExpandDatails] = useState(false)
    const [loading, setLoading] = useState(false)

    const setLive = async () => {
        if (!data.IsLive) {
            setLoading(true)
            const requestData = {
                id: data.id,
            };
            axios.post("http://127.0.0.1:8000/api/set-live/", requestData)
                .then((response) => {
                    getAllConfigs().then((response) => setLoading(false)).catch(e => console.error(e))
                    console.log(response.data);
                })
                .catch((error) => {
                    setLoading(false)
                    console.error('Error:', error);
                });
        }
    }
    return (
        <div
            style={{
                background: "white",
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                border: "2px solid blue",
                borderRadius: '8px',
                padding: "10px",
                position: 'relative',
                cursor: loading && 'not-allowed',
                opacity: loading && '0.3'
            }}>
            <h3 style={
                {
                    position: "absolute",
                    left: 20,
                    top: 0,
                    background: data.IsLive ? "red" : "grey",
                    cursor: "pointer",
                    opacity: data.IsLive ? "1" : "0.3",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: 8,
                    overflow: "hidden"
                }
            }
                onClick={setLive}
            >
                <span style={
                    {
                        color: "white",
                        marginRight: 8,
                        fontSize: 30,
                        lineHeight: 0,
                        position: "relative",
                    }
                }>•</span>
                Live</h3>
            <h2>Config ID: {data.id}</h2>
            {
                expandDatails && <div style={{ width: "100%" }}>
                    <DayBasePricing id={data.id} key={data.id} data={[{
                        label: 'Before break-up point',
                        data: set1 ?? [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Post break-up point',
                        data: set2 ?? [],
                        borderColor: 'rgba(20, 42, 129, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }]} />
                </div>
            }
            <table
                className='mytable' onClick={() => {
                    setExpandDatails(!expandDatails)
                }}
                style={{
                    cursor: "pointer",
                }}
            >
                <tr>
                    <td ><h4>DBP</h4></td>
                    <td>
                        <table  >
                            {
                                data.DBP.map((item, index) => <tr style={{ borderTop: index && "1px solid black" }}>
                                    <td>
                                        <h4>{item.day}</h4>
                                    </td>
                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <h4>Before {item.breakPoint}</h4>
                                                </td>
                                                <td>
                                                    <p>
                                                        {item.preBreakPointPrice}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h4>After {item.breakPoint}</h4>
                                                </td>
                                                <td>
                                                    <p>
                                                        {item.postBreakPointPrice}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>)
                            }
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><h4>DAP</h4></td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <h4>Before {data.DAP.breakPoint}</h4>
                                </td>
                                <td>
                                    <p>
                                        {data.DAP.preBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>After {data.DAP.breakPoint}</h4>
                                </td>
                                <td>
                                    <p>
                                        {data.DAP.postBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><h4>WC</h4></td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <h4>Before {data.WC.breakPoint}</h4>
                                </td>
                                <td>
                                    <p>
                                        {data.WC.preBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>After {data.WC.breakPoint}</h4>
                                </td>
                                <td>
                                    <p>
                                        {data.WC.postBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><h4>TMF</h4></td>
                    <td>
                        <table >
                            <tr>
                                <td>
                                    <h4>Before {data.TMF.breakPoint1}</h4>
                                </td>
                                <td>
                                    <p>
                                        {data.TMF.preBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>Between {data.TMF.breakPoint1} and {data.TMF.breakPoint2} </h4>
                                </td>
                                <td>
                                    <p>
                                        {data.TMF.midBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h4>After {data.TMF.breakPoint2} </h4>
                                </td>
                                <td>
                                    <p>
                                        {data.TMF.endBreakPointPrice}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default Card