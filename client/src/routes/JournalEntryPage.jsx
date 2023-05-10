import React, { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import JournalEntryView from "../components/JournalEntryPage/JournalEntryView";
import JournalEntryEdit from "../components/JournalEntryPage/JournalEntryEdit";
import { validateNote } from "../utility/validation";

function JournalEntryPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ display, setDisplay ] = useState('View');
    const [ notes, setNotes ] = useState('');
    // Setting the workout_date fixes an error that splice throws below. Entry will get reset on load.
    const [ entry, setEntry ] = useState({workout_date: ''});

    // Load the journal entry on page load
    useEffect(() => {
        async function populateData() {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/journal/${id}`);
                const jsonData = await response.json();
                const entry = jsonData.data.journal;
                setEntry(entry);
                setNotes(entry.notes);
            } catch (err) {
                console.error(err);
            }
        }
        populateData();
    },[])

    // Toggles the screen from View mode to Edit mode.
    function toggleEdit() {
        if (display === 'View') setDisplay('Edit');
        else setDisplay('View');
    }

    // Update the journal entry with the note and save it to the database.
    async function handleSave(e) {
        e.preventDefault();
        // Check validation for note
        if (validateNote(notes) != '') return;
        // Update the note if it passes validation
        try {
            const body = { notes };
            const result = await fetch(`http://localhost:5000/api/v1/journal/${entry.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const jsonData = await result.json();
            const updatedEntry = jsonData.data.journal;
        } catch (err) {
            console.error(err);
        }

        toggleEdit();
    }

    // Clear the note and revert the display back to View mode.
    function handleCancel() {
        toggleEdit();
        setNotes(entry.notes);
    }

    // Navigate home.
    function handleBack() {
        navigate('/');
    }

    return (
        <Fragment>
            <div id="top-space" style={{ height: "200px" }}></div>
            <div style={{ border: '3px solid black'}}>
            {display === 'View' && <JournalEntryView entry={entry} notes={notes} />}
            {display === 'Edit' && <JournalEntryEdit entry={entry} notes={notes} setNotes={setNotes} />}
            </div>
            {display === 'View' && <button type="button" className="btn btn-warning" onClick={toggleEdit}>Modify Note</button>}
            {display === 'View' && <button type="button" className="btn btn-primary ml-2" onClick={handleBack}>Back</button>}
            {display === 'Edit' && <button type="button" className="btn btn-warning" onClick={(e) => handleSave(e)}>Save Note</button>}
            {display === 'Edit' && <button type="button" className="btn btn-primary ml-2" onClick={handleCancel}>Cancel</button>}
        </Fragment>
    )
}

export default JournalEntryPage;
