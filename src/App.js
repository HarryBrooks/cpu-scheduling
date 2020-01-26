import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import Simulate from './Simulate';

function App() {

  const [simData, updateSimData] = useState(false)

  const formSubmission = (data) => {
    updateSimData(data);
  }

  return (
      <div className="App">
        <h1>CPU Schduling Simulator</h1>
        <Form formSubmission={formSubmission}/>
        {simData && <Simulate {...simData} />}
      </div>

  );
}

export default App;
