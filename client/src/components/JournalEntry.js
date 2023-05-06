import React, { Fragment, useEffect, useState } from "react"

function JournalEntry({ entry, getJournal }) {
    const [ entryNotes, setEntryNotes ] = useState(entry.notes);

    // Update the entryNotes state when the entry is updated
    useEffect(() => {
        setEntryNotes(entry.notes);
      }, [entry]);

    async function updateNotes(e) {
        e.preventDefault()
        const body = { notes: entryNotes }
        
        const updatedEntry = await fetch(`http://localhost:5000/api/v1/journal/${entry.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => jsonResponse)

        getJournal();
    }

    async function deleteEntry(id) {
        const deletedEntry = await fetch(`http://localhost:5000/api/v1/journal/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) return response.json();
            else throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => jsonResponse)

        getJournal();
    }

    return (
        <Fragment>
        <tr>
            <td>{entry.workout_date.slice(0,10)}</td>
            <td>{entry.split_option}</td>
            <td>{entry.rep_range_option}</td>
            <td>{entry.exercise1_id}</td>
            <td>{entry.exercise2_id}</td>
            <td>{entry.exercise3_id}</td>
            <td>{entry.exercise4_id}</td>
            <td>{entry.exercise5_id}</td>
            <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${entry.id}`}>{entry.notes ? "View Note" : "Add Note"}</button></td>
            <td><button type="button" className='btn btn-danger' onClick={() => deleteEntry(entry.id)}>Delete</button></td>
        </tr>


        <div className="modal fade text-dark" id={`id${entry.id}`} onClick={() => setEntryNotes(entry.notes)}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h5 className="modal-title">Edit Note</h5>
                </div>

                <div className="modal-body">
                    <textarea type="text" value={entryNotes || ''} style={{ width: "100%", height: "200px" }} onChange={e => setEntryNotes(e.target.value)}></textarea>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={updateNotes}>Save changes</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setEntryNotes(entry.notes)}>Close</button>
                </div>

                </div>
            </div>
        </div>
        </Fragment>
    )
}

export default JournalEntry;
