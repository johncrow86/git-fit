import React, { Fragment } from "react";

function ActionBar ({ populateWorkoutList, split, repRange, workoutList, toggleJournalDisplay, showJournal, getJournal }) {

    // Create a journal Entry
    async function saveToJournal() {
        const body = {
            splitOption: split,
            repRangeOption: repRange,
            exercises: [
                workoutList[0].id,
                workoutList[1].id,
                workoutList[2].id,
                workoutList[3].id,
                workoutList[4].id,
            ]
        }
        const journalEntry = await fetch("http://localhost:5000/journal", {
            method: "POST",
            headers: { "Content-TYpe": "application/json" },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => jsonResponse);
        
        getJournal();
    }

    // Return the bottom action bar
    return (
        <Fragment>
        {/* Setting classname=col on the top div but not the bottom div floats the bottom div right */}
        <div className="col">
            <div className="btn-group my-3 ml-2" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={() => populateWorkoutList(split)}>Shuffle</button>
            </div>
        </div>

        <div>
            <div className="btn-group my-3 mr-5" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary" onClick={toggleJournalDisplay}>{showJournal ? 'Hide Journal' : 'Show Journal'}</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={saveToJournal}>Save to Journal</button>
            </div>
        </div>
        </Fragment>
    )
}

export default ActionBar;
