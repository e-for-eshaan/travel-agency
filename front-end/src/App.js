import { useEffect, useState } from 'react';
import axios from 'axios';

import Card from './components/Card';

import './App.scss';
import CreatConfig from './components/CreatConfig';
import Calculator from './components/Calculator';

function App() {
  const [allConfigs, setAllConfigs] = useState([])
  const [createConfig, setCreateConfig] = useState(false)

  const getAllConfigs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-config/")
      const data = response.data.data
      setAllConfigs(data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllConfigs()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <CreatConfig getAllConfigs={getAllConfigs} show={createConfig} onClose={() => { setCreateConfig(false) }} />
      <div className="grid" >
        <div style={{
          display: createConfig ? "none" : "flex",
          flexDirection: 'column',
          alignItems: 'center',
          border: "2px solid blue",
          borderRadius: '8px',
          padding: 20,
          background: "white",
          gap: 20,

        }}>
          <div
            onClick={() => setCreateConfig(prev => !prev)}
            style={{
              display: createConfig ? "none" : "flex",
              flexDirection: 'column',
              alignItems: 'center',
              border: "2px solid blue",
              borderRadius: '8px',
              cursor: "pointer",
              width: "100%"
            }}>
            <h1>Create Config</h1>
            <h1>
              +
            </h1>
          </div>
          <div
            style={{
              display: createConfig ? "none" : "flex",
              flexDirection: 'column',
              alignItems: 'center',
              border: "2px solid blue",
              borderRadius: '8px',
              width: '100%',
            }}>
            <h1>Calculate Price</h1>
            <Calculator />
          </div>
        </div>

        {allConfigs.sort((b, a) => a.IsLive - b.IsLive).map((item, index) => {
          return <Card getAllConfigs={getAllConfigs} createConfig key={index} data={item} />
        })}
      </div>
    </div>


  );
}


export default App;

// const x = {
//   label: 'Sales',
//   data: data ?? [],
//   borderColor: 'rgba(75, 192, 192, 1)',
//   backgroundColor: 'rgba(75, 192, 192, 0.2)',
//   fill: true,
// }

