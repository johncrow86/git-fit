import React from "react";
import Exercise from "./Exercise";

function WorkoutDisplay ({ workoutList, repRange }) {
    return (
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Exercise</th>
                    <th scope="col">Sets / Reps</th>
                </tr>
            </thead>
            <tbody>
                {workoutList.map((exercise, i) => (
                    <Exercise exercise={exercise} repRange={repRange} row={i+1} key={i} />
                ))}
            </tbody>
        </table>
    )
}

export default WorkoutDisplay;
