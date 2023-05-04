import React from "react";
import JournalEntry from "./JournalEntry";

function JournalDisplay({ journal, getJournal }) {
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {journal.map(entry => (
                    <JournalEntry key={entry.id} entry={entry} getJournal={getJournal} />
                ))}
            </tbody>
        </table>
    )
}

export default JournalDisplay;
