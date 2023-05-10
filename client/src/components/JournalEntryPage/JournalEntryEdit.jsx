import React, { useState } from "react";
import { validateNote } from "../../utility/validation";

function JournalEntryEdit({ entry, notes, setNotes }) {
  const [notesError, setNotesError] = useState("");

    // Validation for notes field
    const handleNotesBlur = (event) => {
        setNotesError(validateNote(event.target.value));
    };

    return (
        <div className="bg-white py-5">
            <form className="ml-5 pl-5" action="">
                <h1>Journal Entry Details</h1>
                <h3 className="mb-5">{entry.workout_date.slice(0,10)}</h3>
                <div className="form-group">
                    <h6>Split Option:</h6>
                    <p>{entry.split_option}</p>
                </div>
                <div className="form-group">
                    <h6>Rep Range Option:</h6>
                    <p>{entry.rep_range_option}</p>
                </div>
                <div className="form-group">
                    <h6>Exercise 1:</h6>
                    <p>{entry.exercise1_name}</p>
                </div>
                <div className="form-group">
                    <h6>Exercise 2:</h6>
                    <p>{entry.exercise2_name}</p>
                </div>
                <div className="form-group">
                    <h6>Exercise 3:</h6>
                    <p>{entry.exercise3_name}</p>
                </div>
                <div className="form-group">
                    <h6>Exercise 4:</h6>
                    <p>{entry.exercise4_name}</p>
                </div>
                <div className="form-group">
                    <h6>Exercise 5:</h6>
                    <p>{entry.exercise5_name}</p>
                </div>
                <div className="form-group">
                    <h6>Additional Notes:</h6>
                    <textarea onChange={(e) => setNotes(e.target.value)} onBlur={handleNotesBlur} style={{ height: 100, width: 600 }} value={notes}></textarea>
                    {notesError && <p className="text-danger">{notesError}</p>}
                </div>
            </form>
        </div>
    )
}

export default JournalEntryEdit;
