import React from "react";

function Exercise ({ exercise, repRange, row }) {
    repRange = repRange === 'High' ? '3 Sets of 10 Reps' : '5 Sets of 5 Reps';
    
    return (
        <tr>
            <th scope="row">{row}</th>
            <td className="text-danger">{exercise.name}</td>
            <td className="text-danger">{exercise.name === 'Exercise ' + row ? '' : repRange}</td>
        </tr>
    )
}

export default Exercise;
