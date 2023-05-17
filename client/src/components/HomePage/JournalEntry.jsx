import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { JournalContext } from "../../context/JournalContext"

function JournalEntry({ entry }) {
    const { getJournal } = useContext(JournalContext);
    const navigate = useNavigate();

    function handleView(id) {
        navigate(`/journal/${id}`);
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/journal/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            getJournal();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <tr>
            <td>{entry.workout_date.slice(0,10)}</td>
            <td>{entry.split_option}</td>
            <td>{entry.rep_range_option}</td>
            <td>{entry.exercise1_id}</td>
            <td>{entry.exercise2_id}</td>
            <td>{entry.exercise3_id}</td>
            <td>{entry.exercise4_id}</td>
            <td>{entry.exercise5_id}</td>
            <td><button type="button" className="btn btn-primary" onClick={() => handleView(entry.id)}>View</button></td>
            <td><button type="button" className="btn btn-danger" onClick={() => handleDelete(entry.id)}>Delete</button></td>
        </tr>
    )
}

export default JournalEntry;
