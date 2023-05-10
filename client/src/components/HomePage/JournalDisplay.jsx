import React, { useEffect, useContext } from "react";
import JournalEntry from "./JournalEntry";
import { JournalContext } from "../../context/JournalContext"

function JournalDisplay() {
    const { journal, getJournal } = useContext(JournalContext);

    useEffect(() => {
        getJournal();
    },[]);

    return (
        <table className="table table-striped text-white">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Split</th>
                <th scope="col">Rep Range</th>
                <th scope="col">Exercise 1</th>
                <th scope="col">Exercise 2</th>
                <th scope="col">Exercise 3</th>
                <th scope="col">Exercise 4</th>
                <th scope="col">Exercise 5</th>
                <th scope="col">Full Page</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {journal.map(entry => (
                    <JournalEntry key={entry.id} entry={entry} />
                ))}
            </tbody>
        </table>
    )
}

export default JournalDisplay;
