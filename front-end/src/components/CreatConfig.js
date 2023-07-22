import React, { useState } from 'react'
import "../App.scss"
import axios from 'axios'

const CreatConfig = ({ show, onClose, getAllConfigs }) => {
    const [data, setData] = useState(json)

    const createConfig = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/create-config/", data)
            getAllConfigs();
            onClose();
        }
        catch (e) {
            console.error(e)
        }
    }

    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    function generateRandomData() {
        const data = {
            "DBP": {
                "Monday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Tuesday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Wednesday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Thursday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Friday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Saturday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
                "Sunday": {
                    "breakPoint": getRandomValue(0, 500),
                    "preBreakPointPrice": getRandomValue(0, 500),
                    "postBreakPointPrice": getRandomValue(0, 500),
                },
            },
            "DAP": {
                "breakPoint": getRandomValue(0, 500),
                "preBreakPointPrice": getRandomValue(0, 500),
                "postBreakPointPrice": getRandomValue(0, 500),
            },
            "TMF": {
                "breakPoint1": getRandomValue(0, 500),
                "breakPoint2": getRandomValue(0, 500),
                "preBreakPointPrice": getRandomValue(0, 500),
                "midBreakPointPrice": getRandomValue(0, 500),
                "endBreakPointPrice": getRandomValue(0, 500),
            },
            "WC": {
                "breakPoint": getRandomValue(0, 500),
                "preBreakPointPrice": getRandomValue(0, 500),
                "postBreakPointPrice": getRandomValue(0, 500),
            },
        };

        setData(data)
    }

    return (
        <div style={{
            marginBottom: 20,
            display: !show ? "none" : "flex",
            alignItems: 'center',
            border: "2px solid blue",
            borderRadius: '8px',
            height: "calc(100vh - 40px)",
            position: "relative",
            justifyContent: 'space-between',
            background: "white"
        }}>
            <div style={{ overflowY: "scroll", height: "90%", width: "50%", padding: 20 }}>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
            <div style={{
                width: "40%",
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                gap: 100
            }}>
                <button onClick={createConfig}>Submit</button>
                <button onClick={generateRandomData}>Random</button>
            </div>
        </div>
    )
}

export default CreatConfig

let json = {
    "DBP": {
        "Monday": {
            "breakPoint": 253.1,
            "preBreakPointPrice": 186.9,
            "postBreakPointPrice": 438.2
        },
        "Tuesday": {
            "breakPoint": 57.4,
            "preBreakPointPrice": 281.9,
            "postBreakPointPrice": 444.7
        },
        "Wednesday": {
            "breakPoint": 356.8,
            "preBreakPointPrice": 413.2,
            "postBreakPointPrice": 278.5
        },
        "Thursday": {
            "breakPoint": 173.9,
            "preBreakPointPrice": 472.4,
            "postBreakPointPrice": 89.7
        },
        "Friday": {
            "breakPoint": 69.2,
            "preBreakPointPrice": 291.8,
            "postBreakPointPrice": 224.3
        },
        "Saturday": {
            "breakPoint": 417.6,
            "preBreakPointPrice": 172.3,
            "postBreakPointPrice": 18.4
        },
        "Sunday": {
            "breakPoint": 288.7,
            "preBreakPointPrice": 484.2,
            "postBreakPointPrice": 126.6
        }
    },
    "DAP": {
        "breakPoint": 351.4,
        "preBreakPointPrice": 71.8,
        "postBreakPointPrice": 274.6
    },
    "TMF": {
        "breakPoint1": 76.2,
        "breakPoint2": 410.1,
        "preBreakPointPrice": 499.8,
        "midBreakPointPrice": 358.9,
        "endBreakPointPrice": 66.3
    },
    "WC": {
        "breakPoint": 109.7,
        "preBreakPointPrice": 203.5,
        "postBreakPointPrice": 434.9
    }
}

// <div style={{
//     marginBottom: 20,
//     display: !show ? "none" : "flex",
//     flexDirection: 'column',
//     alignItems: 'center',
//     border: "2px solid blue",
//     borderRadius: '8px',
//     height: "calc(100vh - 40px)",
//     position: "relative"
// }}>
//     <h1>Create Price Config</h1>
//     <h1 onClick={onClose} style={
//         {
//             transform: "rotate(45deg)",
//             position: "absolute",
//             right: 20,
//             top: -10,
//             cursor: "pointer"
//         }}>+</h1>
//     <div className='grid' style={{ width: "100%", gridTemplateColumns: "1fr 1fr 1fr 1fr" }} >

//         <div style={{ padding: 20 }}>
//             <h3>Day Based Pricing</h3>
//             <table className='createTable'>
//                 <tr>
//                     <td>
//                         <h4>Monday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Monday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Tuesday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Tuesday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Wednesday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Wednesday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Thursday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Thursday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Friday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Friday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Saturday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Saturday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Sunday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Sunday' />
//                     </td>
//                 </tr>
//             </table>
//         </div>

//         <div style={{ padding: 20 }}>
//             <h3>Distance Additional Pricing</h3>
//             <table className='createTable'>
//                 <tr>
//                     <td>
//                         <h4>Monday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Monday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Sunday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Sunday' />
//                     </td>
//                 </tr>
//             </table>
//         </div>

//         <div style={{ padding: 20 }}>
//             <h3>Time Multiplier Factor</h3>
//             <table className='createTable'>
//                 <tr>
//                     <td>
//                         <h4>Monday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Monday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Sunday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Sunday' />
//                     </td>
//                 </tr>
//             </table>
//         </div>

//         <div style={{ padding: 20 }}>
//             <h3>Waiting Charges</h3>
//             <table className='createTable'>

//                 <tr>
//                     <td>
//                         <h4>Break point (mins)</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Monday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Monday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Monday' />
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>
//                         <h4>Sunday</h4>
//                     </td>
//                     <td>
//                         <input type="number" placeholder='Sunday' />
//                     </td>
//                 </tr>
//             </table>
//         </div>
//     </div>
// </div>