import React from 'react';

export default function Simulate(props) {

    const compare = (a,b) => {
        if(a.burst < b.burst) {
            return -1;
        } 
        if(a.burst > b.burst) {
            return 1;
        }
        return 0;
    }

    const firstComeFirstServed = (data) => {
        let numberCompletedProcess = 0
        let arrived = []
        let result = []
        for(let time = 0; time < 250; time++) {
            if(arrived.length > 0 && arrived[0].burst === 0) {
                numberCompletedProcess += 1;
                arrived.shift();
            }
            for(let p in data.processInfo) {
                if(parseInt(data.processInfo[p].arrival) === time) {
                    arrived.push(data.processInfo[p])
                }
            }
            if(arrived.length > 0){
                result.push(<td>{arrived[0].name}</td>)
                arrived[0].burst -= 1;
            }
            else{
                result.push(<td>-</td>)
            }
            if(numberCompletedProcess === parseInt(data.numberProcesses)){
                break;
            }
        }

        return <table><tr>{result}</tr></table>
    }

    const shortestJobFirst = (data) => {
        let numberCompletedProcess = 0
        let arrived = []
        let result = []
        for(let time = 0; time < 250; time++) {
            for(let p in data.processInfo) {
                if(parseInt(data.processInfo[p].arrival) === time) {
                    arrived.push(data.processInfo[p])
                }
            }
            if(arrived.length > 0 && arrived[0].burst === 0) {
                numberCompletedProcess += 1;
                arrived.shift();
                arrived.sort(compare)
            }
            if(arrived.length > 0){
                result.push(<td>{arrived[0].name}</td>)
                arrived[0].burst -= 1;
            }
            else{
                result.push(<td>-</td>)
            }
            if(numberCompletedProcess === parseInt(data.numberProcesses)){
                break;
            }
        }
        return <table><tr>{result}</tr></table>
    }

    const roundRobin = (data) => {
        let numberCompletedProcess = 0
        let arrived = []
        let result = []
        let pointer = 0;
        let quantumCounter = 0;
        for(let time = 0; time < 10; time++) {
            for (let a in arrived) {
                if (parseInt(arrived[a].burst) === 0) {
                    numberCompletedProcess += 1;
                    arrived.splice(a,1);
                }
            }
            for(let p in data.processInfo) {
                if(parseInt(data.processInfo[p].arrival) === time) {
                    arrived.push(data.processInfo[p])
                }
            }
            if(arrived.length > 0){
                result.push(<td>{arrived[pointer].name}</td>)
                arrived[pointer].burst -= 1;
                quantumCounter += 1;
            }
            else{
                result.push(<td>-</td>)
            }
            if(numberCompletedProcess === parseInt(data.numberProcesses)){
                break;
            }
            if(quantumCounter === parseInt(data.quantum)) {
                pointer = (pointer + 1) % parseInt(data.numberProcesses);
                quantumCounter = 0;
            }
        }

        return <table><tr>{result}</tr></table>
    }
    
    let result;
    if(props.schedulingAlgorithm === "FCFS") {
        result = firstComeFirstServed(props);
    }
    else if(props.schedulingAlgorithm === "SJF") {
        let data = props;
        data.processInfo.sort(compare);
        result = shortestJobFirst(props);
    }
    else if(props.schedulingAlgorithm === "RR") {
        let data = props;
        result = roundRobin(data);
    }

    return result
}