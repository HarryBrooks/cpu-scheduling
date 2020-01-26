import React, { useState } from 'react';
import ProcessForm from './ProcessForm';

export default function OptionForm(props) {
    const [schedulingAlgorithm, setSchedulingAlgorithm] = useState("FCFS");
    const [quantum, setQuantum] = useState(1);
    const [numberProcesses, setNumberProcesses] = useState(1);
    const [processInfo, setProcessInfo] = useState([{id:0,name:"A",arrival:0,burst:0}])
    
    const processNames = ["A","B","C","D","E"];

    const handleSubmit = (e) => {
        e.preventDefault();
        props.formSubmission({schedulingAlgorithm,quantum,numberProcesses,processInfo});
    }

    const schedulingChange = (e) => {
        setSchedulingAlgorithm(e.target.value);
    }

    const quantumChange = (e) => {
        setQuantum(e.target.value)
    }

    const numberProcessesChange = (e) => {
        if(e.target.value < processInfo.length) {
            let tempValues = processInfo
            tempValues.pop();
            setProcessInfo(tempValues)
        }
        else {
            setProcessInfo([...processInfo,{id:processInfo.length,name:processNames[processInfo.length],arrival:processInfo[processInfo.length-1].arrival,burst:0}])
        }
        setNumberProcesses(e.target.value)
    }

    const onArrivalChange = (e) => {
        setProcessInfo([...processInfo],processInfo[e.target.id].arrival=e.target.value)
    }

    const onBurstChange = (e) => {
        setProcessInfo([...processInfo],processInfo[e.target.id].burst=e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Algorithm
                <select onChange={schedulingChange} value={schedulingAlgorithm}>
                    <option value="FCFS">FCFS</option>
                    <option value="SJF">SJF</option>
                    <option value="RR">RR</option>
                </select>
            </label>
            {schedulingAlgorithm === "RR" && (
                <label>
                    Quantum
                    <input type="number" name="quantum" value={quantum} min={1} max={10} onChange={quantumChange}/>
                </label>
            )}
            <label>
                Number of Processes
                <input type="number" name="numberProcesses" value={numberProcesses} min={1} max={5} onChange={numberProcessesChange}/>
            </label>
            {1 <= numberProcesses && <ProcessForm {...processInfo[0]} arrivalChange={onArrivalChange} burstChange={onBurstChange}/>}
            {2 <= numberProcesses && <ProcessForm {...processInfo[1]} arrivalChange={onArrivalChange} burstChange={onBurstChange}/>}
            {3 <= numberProcesses && <ProcessForm {...processInfo[2]} arrivalChange={onArrivalChange} burstChange={onBurstChange}/>}
            {4 <= numberProcesses && <ProcessForm {...processInfo[3]} arrivalChange={onArrivalChange} burstChange={onBurstChange}/>}
            {5 <= numberProcesses && <ProcessForm {...processInfo[4]} arrivalChange={onArrivalChange} burstChange={onBurstChange}/>}
            <input type="submit" value="Submit" />
        </form>
    )
}