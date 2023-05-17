import React, { useState, createContext } from "react";

export const JournalContext = createContext();

export function JournalContextProvider(props) {
    const [ journal, setJournal ] = useState([]);
    const [ showJournal, setShowJournal ] = useState(false);

    // Function to Get Journal
    async function getJournal() {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/journal`, {
                credentials: 'include'
            });
            const jsonData = await response.json();
            const journal = jsonData.data.journal;
            setJournal(journal);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <JournalContext.Provider value={{ journal, setJournal, getJournal, showJournal, setShowJournal }}>
            {props.children}
        </JournalContext.Provider>
    )
}
