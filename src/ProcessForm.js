import React from "react";

export default function ProcessForm(props) {
    return(
        <>
            <h5>{'Process ' + props.name}</h5>
            <label>Arrival Time
                <input id={props.id} type="number" name="arrival" value={props.arrival} min={0} max={50} onChange={props.arrivalChange}/>
            </label>
            <label>Burst Time
                <input id={props.id} type="number" name="burst" value={props.burst} min={0} max={50} onChange={props.burstChange}/>
            </label>
        </>
    )
}