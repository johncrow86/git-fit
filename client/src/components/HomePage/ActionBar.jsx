import React, { Fragment, useContext } from "react";
import { JournalContext } from "../../context/JournalContext"

function ActionBar ({ populateWorkoutList, split, repRange, workoutList, toggleJournalDisplay, showJournal }) {
    const { getJournal } = useContext(JournalContext);

    // Create a journal Entry
    async function handleSave() {
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
        try {
            const result = await fetch("http://localhost:5000/api/v1/journal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include'
            })
            const jsonData = await result.json();
            const newEntry = jsonData.data.journal;
            getJournal();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
        {/* Setting classname=col on the top div but not the bottom div floats the bottom div right */}
        <div className="col">
            <div className="btn-group my-3 ml-2" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => populateWorkoutList(split)}>Shuffle</button>
            </div>
        </div>

        <div>
            <div className="btn-group my-3 mr-5" role="group">
            <button type="button" className="btn btn-secondary" onClick={toggleJournalDisplay}>{showJournal ? 'Hide Journal' : 'Show Journal'}</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={handleSave} disabled={!workoutList[0].id}>Save to Journal</button>
            </div>
        </div>
        </Fragment>
    )
}

export default ActionBar;
